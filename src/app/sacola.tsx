import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import globalStyle from "@/styles/globalStyle";
import sacolaStyle from "@/styles/sacolaStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

import { IMAGEM } from "@/config/api";
import {
  ItemSacola,
  carregarSacola,
  alterarQuantidadeSacola,
  removerDaSacola,
} from "@/config/sacola";

export default function SacolaScreen() {
  const [itens, setItens] = useState<ItemSacola[]>([]);
  const [erro, setErro] = useState("");
  const [processando, setProcessando] = useState(false);

  const atualizarSacola = useCallback(async () => {
    try {
      setErro("");
      setItens(await carregarSacola());
    } catch (erro) {
      setErro(
        erro instanceof Error ? erro.message : "Erro ao carregar sacola.",
      );
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      atualizarSacola();
    }, [atualizarSacola]),
  );

  async function mudarQuantidade(idProduto: number, quantidade: number) {
    if (processando || quantidade < 1 || quantidade > 99) return;
    setProcessando(true);
    try {
      await alterarQuantidadeSacola(idProduto, quantidade);
      await atualizarSacola();
    } catch (erro) {
      setErro(
        erro instanceof Error ? erro.message : "Erro ao alterar quantidade.",
      );
    } finally {
      setProcessando(false);
    }
  }

  async function excluirItem(idProduto: number) {
    if (processando) return;
    setProcessando(true);
    try {
      await removerDaSacola(idProduto);
      await atualizarSacola();
    } catch (erro) {
      setErro(
        erro instanceof Error ? erro.message : "Erro ao remover produto.",
      );
    } finally {
      setProcessando(false);
    }
  }

  const subtotal = itens.reduce(
    (total, item) => total + item.valor_produto * item.quantidade,
    0,
  );
  const moeda = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/00_fundo.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <Pressable
            style={globalStyle.btnVoltar}
            onPress={() => router.back()}
          >
            <Image
              style={globalStyle.imgVoltar}
              source={require("@/assets/images/img/icones/voltar.png")}
            />
          </Pressable>
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={sacolaStyle.conteudo}>
              <View style={sacolaStyle.header}>
                <View style={sacolaStyle.conteudoHeader}>
                  <Text style={sacolaStyle.titulo}>Sacola</Text>
                  <Image
                    style={sacolaStyle.logo}
                    source={require("@/assets/images/img/logo/logo.png")}
                  />
                </View>
                <Text style={sacolaStyle.subtitulo}>
                  Revise seus itens antes de finalizar
                </Text>
              </View>

              <View style={sacolaStyle.main}>
                {erro ? <Text style={{ color: "#B00020" }}>{erro}</Text> : null}
                {itens.length === 0 ? (
                  <Text>Sua sacola está vazia.</Text>
                ) : (
                  itens.map((item) => (
                    <View style={sacolaStyle.itemSacola} key={item.id_produto}>
                      <Image
                        style={sacolaStyle.imgItem}
                        source={{
                          uri: item.foto_produto
                            ? `${IMAGEM}/${item.foto_produto}`
                            : `${IMAGEM}/produto/sem-imagem.png`,
                        }}
                        resizeMode="stretch"
                      />
                      <View style={sacolaStyle.centroItem}>
                        <Text style={sacolaStyle.tituloItem}>
                          {item.nome_produto}
                        </Text>
                        <Text style={sacolaStyle.descricaoItem}>
                          {item.descricao_produto}
                        </Text>
                        <View style={sacolaStyle.valoresItem}>
                          <Text style={sacolaStyle.valorUnitItem}>
                            {moeda(item.valor_produto)}
                          </Text>
                          <Text style={sacolaStyle.valorTotalItem}>
                            {moeda(item.valor_produto * item.quantidade)}
                          </Text>
                        </View>
                      </View>
                      <View style={sacolaStyle.direitaItem}>
                        <Pressable
                          style={sacolaStyle.btnExcluir}
                          disabled={processando}
                          onPress={() => excluirItem(item.id_produto)}
                        >
                          <Image
                            style={sacolaStyle.imgExcluir}
                            source={require("@/assets/images/img/icones/lixeira.png")}
                          />
                        </Pressable>
                        <View style={sacolaStyle.caixaQtde}>
                          <Pressable
                            style={sacolaStyle.btnQtde}
                            disabled={processando || item.quantidade <= 1}
                            onPress={() =>
                              mudarQuantidade(
                                item.id_produto,
                                item.quantidade - 1,
                              )
                            }
                          >
                            <Image
                              style={sacolaStyle.imgQtde}
                              source={require("@/assets/images/img/icones/retirar.png")}
                            />
                          </Pressable>
                          <Text style={sacolaStyle.quantidade}>
                            {item.quantidade}
                          </Text>
                          <Pressable
                            style={sacolaStyle.btnQtde}
                            disabled={processando || item.quantidade >= 99}
                            onPress={() =>
                              mudarQuantidade(
                                item.id_produto,
                                item.quantidade + 1,
                              )
                            }
                          >
                            <Image
                              style={sacolaStyle.imgQtde}
                              source={require("@/assets/images/img/icones/adicionar.png")}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  ))
                )}

                <View style={sacolaStyle.cupom}>
                  <View style={sacolaStyle.cupomEsquerdo}>
                    <Text style={sacolaStyle.tituloCupom}>
                      Cupom de Desconto
                    </Text>
                    <TextInput
                      style={sacolaStyle.txtCupom}
                      placeholder="Digite seu cupom"
                      placeholderTextColor={cores.cinza}
                    />
                  </View>
                  <Pressable>
                    <Text style={sacolaStyle.txtAplicar}>Aplicar {">"} </Text>
                  </Pressable>
                </View>
                {itens.length > 0 ? (
                  <>
                    <View style={sacolaStyle.subtotal}>                  
                      <View style={sacolaStyle.areaSubtotal}>
                        <Text style={sacolaStyle.txtSubtotal}>Subtotal</Text>
                        <Text style={sacolaStyle.valorSubtotal}>
                          {moeda(subtotal)}
                        </Text>
                      </View>  
                      <View style={sacolaStyle.areaDesconto}>
                        <Text style={sacolaStyle.txtDesconto}>Desconto</Text>
                        <Text style={sacolaStyle.cupomDesconto}>
                          
                        </Text>
                        <Text style={sacolaStyle.valorDesconto}>R$ 0,00</Text>
                      </View>
                      <View style={globalStyle.separador}></View>
                      <View style={sacolaStyle.areaTotal}>
                        <Text style={sacolaStyle.txtTotal}>Total</Text>
                        <Text style={sacolaStyle.valorTotal}>{moeda(subtotal)}</Text>
                      </View>
                    </View>
                    <Pressable
                      style={sacolaStyle.btnPagamento}
                      onPress={() => router.navigate("/pagamento")}
                    >
                      <Text style={sacolaStyle.txtPagamento}>
                        Continuar para pagamento
                      </Text>
                    </Pressable>
                  </>
                ) : null}
              </View>
            </View>
          </ScrollView>

          <FooterScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
