import { useState, useCallback } from "react";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Linking,
  Pressable,
  ScrollView,
} from "react-native";
import globalStyle from "@/styles/globalStyle";
import detalhePedidoStyle from "@/styles/detalhePedidoStyle";
import { cores } from "@/styles/variaveis";
import FooterScreen from "@/app/footer";
import { API, IMAGEM } from "@/config/api";

type ItemPedido = {
  id_item: number;
  qtde_item: number;
  valor_unit_item: number;
  produto: { nome_produto: string; foto_produto: string | null } | null;
};
type Pedido = {
  id_venda: number;
  data_venda: string;
  status_venda: string;
  status_descricao_venda: string;
  itens: ItemPedido[];
  subtotal_venda: number;
  valor_desconto_venda: number;
  valor_venda: number;
  forma_pagamento_venda: "PIX" | "CARTAO" | "DINHEIRO";
  entrega_venda: "SIM" | "NAO";
  data_entrega_venda: string | null;
  observacao_venda: string | null;
  endereco: { nome_endereco: string; endereco: string; numero: string } | null;
  cupom: { codigo_cupom: string } | null;
};

export default function DetalhePedidoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarPedido = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      if (!id || !/^\d+$/.test(id)) throw new Error("Pedido inválido.");
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Sessão expirada. Faça login novamente.");
      const resposta = await fetch(`${API}/pedidos/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await resposta.json();
      if (!resposta.ok || !json.success || !json.data) {
        throw new Error(json.message || "Não foi possível carregar o pedido.");
      }
      setPedido(json.data);
    } catch (e) {
      setPedido(null);
      setErro(e instanceof Error ? e.message : "Erro ao carregar pedido.");
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      carregarPedido();
    }, [carregarPedido]),
  );

  const moeda = (valor: number) =>
    Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  const dataBR = (valor?: string | null) => {
    if (!valor) return "Não informada";
    const data = new Date(valor);
    return Number.isNaN(data.getTime())
      ? "Não informada"
      : data.toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        });
  };
  const etapas = ["EM_PREPARO", "EM_ENTREGA", "ENTREGUE"];
  const indiceEtapa =
    pedido?.status_venda === "PRONTO"
      ? 0
      : pedido?.status_venda === "CONFIRMADO"
        ? -1
        : pedido?.status_venda === "PENDENTE"
          ? -1
          : etapas.indexOf(pedido?.status_venda ?? "");
  const statusFinal = pedido?.status_venda === "ENTREGUE";
  const statusCancelado = pedido?.status_venda === "CANCELADO";

  const estiloEtapa = (etapa: number) => {
    if (statusCancelado) return {};

    if (indiceEtapa > etapa) {
      return detalhePedidoStyle.etapaFinalizada;
    }

    if (indiceEtapa === etapa) {
      return detalhePedidoStyle.etapaEmAndamento;
    }

    return {};
  };

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
            <View style={detalhePedidoStyle.conteudo}>
              <View style={detalhePedidoStyle.header}>
                <View style={detalhePedidoStyle.conteudoHeader}>
                  <Text style={detalhePedidoStyle.titulo}>
                    Detalhes do pedido
                  </Text>
                  <Image
                    style={detalhePedidoStyle.logo}
                    source={require("@/assets/images/img/logo/logo.png")}
                  />
                </View>
                <Text style={detalhePedidoStyle.subtitulo}>
                  Acompanhe as informações do seu pedido
                </Text>
              </View>

              <View style={detalhePedidoStyle.main}>
                {carregando ? (
                  <Text>Carregando pedido...</Text>
                ) : erro ? (
                  <Text>{erro}</Text>
                ) : pedido ? (
                  <>
                    <View style={detalhePedidoStyle.areaPedido}>
                      <Image
                        style={detalhePedidoStyle.imgPedido}
                        source={require("@/assets/images/img/icones/pedido.png")}
                        resizeMode="stretch"
                      />
                      <View style={detalhePedidoStyle.resumoPedido}>
                        <Text style={detalhePedidoStyle.numeroPedido}>
                          Pedido #{pedido.id_venda}
                        </Text>
                        <Text style={detalhePedidoStyle.horarioPedido}>
                          {dataBR(pedido.data_venda)}
                        </Text>
                      </View>
                      <View style={detalhePedidoStyle.statusPedido}>
                        <Image
                          style={detalhePedidoStyle.imgStatus}
                          source={require("@/assets/images/img/icones/delivery-laranja.png")}
                          resizeMode="stretch"
                        />
                        <Text style={detalhePedidoStyle.txtStatus}>
                          {pedido.status_descricao_venda}
                        </Text>
                      </View>
                    </View>

                    <View style={detalhePedidoStyle.areaAcompanhar}>
                      <View style={detalhePedidoStyle.acompanharPedido}>
                        {/* ETAPA 1 - EM PREPARO */}
                        <View
                          style={[
                            detalhePedidoStyle.areaIconeEtapa,
                            estiloEtapa(0),
                          ]}
                        >
                          <Image
                            style={[
                              detalhePedidoStyle.iconeEtapa,
                              {
                                tintColor:
                                  indiceEtapa > 0
                                    ? cores.verde
                                    : indiceEtapa === 0
                                      ? cores.laranja
                                      : cores.cinza,
                              },
                            ]}
                            source={require("@/assets/images/img/icones/preparando-verde.png")}
                          />
                        </View>

                        {/* LINHA ENTRE ETAPA 1 E 2 */}
                        <View
                          style={[
                            detalhePedidoStyle.linha,
                            !statusCancelado && indiceEtapa > 0
                              ? detalhePedidoStyle.linhaFinalizada
                              : {},
                          ]}
                        />

                        {/* ETAPA 2 - ENTREGA OU RETIRADA */}
                        <View
                          style={[
                            detalhePedidoStyle.areaIconeEtapa,
                            estiloEtapa(1),
                          ]}
                        >
                          <Image
                            style={[
                              detalhePedidoStyle.iconeEtapa,
                              {
                                tintColor:
                                  indiceEtapa > 0
                                    ? cores.verde
                                    : indiceEtapa === 0
                                      ? cores.laranja
                                      : cores.cinza,
                              },
                            ]}
                            source={require("@/assets/images/img/icones/delivery-laranja.png")}
                          />
                        </View>

                        {/* LINHA ENTRE ETAPA 2 E 3 */}
                        <View
                          style={[
                            detalhePedidoStyle.linha,
                            !statusCancelado && indiceEtapa > 1
                              ? detalhePedidoStyle.linhaFinalizada
                              : {},
                          ]}
                        />

                        {/* ETAPA 3 - PEDIDO CONCLUÍDO */}
                        <View
                          style={[
                            detalhePedidoStyle.areaIconeEtapa,
                            estiloEtapa(2),
                          ]}
                        >
                          <Image
                            style={[
                              detalhePedidoStyle.iconeEtapa,
                              {
                                tintColor:
                                  indiceEtapa > 0
                                    ? cores.verde
                                    : indiceEtapa === 0
                                      ? cores.laranja
                                      : cores.cinza,
                              },
                            ]}
                            source={require("@/assets/images/img/icones/entregue-cinza.png")}
                          />
                        </View>
                      </View>

                      <View style={detalhePedidoStyle.textoAcompanhar}>
                        <Text style={detalhePedidoStyle.textoPedido}>
                          Em preparo
                        </Text>

                        <Text style={detalhePedidoStyle.textoPedido}>
                          {pedido.entrega_venda === "SIM"
                            ? "Saiu para entrega"
                            : "Pronto para retirada"}
                        </Text>

                        <Text style={detalhePedidoStyle.textoPedido}>
                          {pedido.entrega_venda === "SIM"
                            ? "Entrega realizada"
                            : "Retirada concluída"}
                        </Text>
                      </View>

                      <View style={detalhePedidoStyle.statusAcompanhar}>
                        <Image
                          style={detalhePedidoStyle.imgStatusAcompanhar}
                          source={require("@/assets/images/img/icones/previsao.png")}
                          resizeMode="stretch"
                        />
                        <Text style={detalhePedidoStyle.txtStatusAcompanhar}>
                          Data desejada:
                        </Text>
                        <Text style={detalhePedidoStyle.txtStatusTempo}>
                          {dataBR(pedido.data_entrega_venda)}
                        </Text>
                      </View>
                    </View>

                    <View style={detalhePedidoStyle.subtotal}>
                      <View style={detalhePedidoStyle.topoSubtotal}>
                        <Image
                          style={detalhePedidoStyle.imgSubtotal}
                          source={require("@/assets/images/img/icones/pedido.png")}
                          resizeMode="stretch"
                        />
                        <View style={detalhePedidoStyle.areaResumoPedido}>
                          <Text style={detalhePedidoStyle.tituloSubtotal}>
                            Resumo do pedido
                          </Text>
                          <View style={detalhePedidoStyle.resumo}>
                            {pedido.itens.map((item) => (
                              <View
                                style={detalhePedidoStyle.itemResumo}
                                key={item.id_item}
                              >
                                <Image
                                  style={detalhePedidoStyle.imgProduto}
                                  source={{
                                    uri: item.produto?.foto_produto
                                      ? `${IMAGEM}/${item.produto.foto_produto}`
                                      : `${IMAGEM}/produto/sem-imagem.png`,
                                  }}
                                  resizeMode="stretch"
                                />
                                <Text style={detalhePedidoStyle.nomeProduto}>
                                  {item.qtde_item}x{" "}
                                  {item.produto?.nome_produto ?? "Produto"}
                                </Text>
                                <Text style={detalhePedidoStyle.valorProduto}>
                                  {moeda(
                                    Number(item.valor_unit_item) *
                                      Number(item.qtde_item),
                                  )}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>

                      <View style={globalStyle.separador}></View>
                      <View style={detalhePedidoStyle.areaSubtotal}>
                        <Text style={detalhePedidoStyle.txtSubtotal}>
                          Subtotal
                        </Text>
                        <Text style={detalhePedidoStyle.valorSubtotal}>
                          {moeda(pedido.subtotal_venda)}
                        </Text>
                      </View>
                      <View style={detalhePedidoStyle.areaDesconto}>
                        <Text style={detalhePedidoStyle.txtDesconto}>
                          Desconto
                        </Text>
                        <Text style={detalhePedidoStyle.cupomDesconto}>
                          {pedido.cupom?.codigo_cupom ?? "Sem cupom"}
                        </Text>
                        <Text style={detalhePedidoStyle.valorDesconto}>
                          {moeda(pedido.valor_desconto_venda)}
                        </Text>
                      </View>
                      <View style={globalStyle.separador}></View>
                      <View style={detalhePedidoStyle.areaTotal}>
                        <Text style={detalhePedidoStyle.txtTotal}>Total</Text>
                        <Text style={detalhePedidoStyle.valorTotal}>
                          {moeda(pedido.valor_venda)}
                        </Text>
                      </View>
                    </View>

                    <View style={detalhePedidoStyle.areaPagamento}>
                      <View style={detalhePedidoStyle.tituloPagamento}>
                        <Image
                          style={detalhePedidoStyle.imgTituloPagamento}
                          source={require("@/assets/images/img/icones/carteira.png")}
                          resizeMode="stretch"
                        />
                        <Text style={detalhePedidoStyle.textoTituloPagamento}>
                          Forma de Pagamento
                        </Text>
                      </View>
                      <View style={detalhePedidoStyle.formaPagamento}>
                        <Image
                          style={detalhePedidoStyle.imgForma}
                          source={require("@/assets/images/img/icones/pix.png")}
                          resizeMode="stretch"
                        />
                        <Text style={detalhePedidoStyle.textoForma}>
                          {pedido.forma_pagamento_venda === "PIX"
                            ? "Pix"
                            : pedido.forma_pagamento_venda === "CARTAO"
                              ? "Cartão"
                              : "Dinheiro"}
                        </Text>
                      </View>
                    </View>

                    <View style={detalhePedidoStyle.areaObservacao}>
                      <Image
                        style={detalhePedidoStyle.imgObservacao}
                        source={require("@/assets/images/img/icones/mensagem.png")}
                        resizeMode="stretch"
                      />
                      <View style={detalhePedidoStyle.observacao}>
                        <Text style={detalhePedidoStyle.tituloObservacao}>
                          Observação
                        </Text>
                        <Text style={detalhePedidoStyle.txtObservacao}>
                          {pedido.observacao_venda?.trim() ||
                            "Nenhuma observação para seu pedido"}
                        </Text>
                      </View>
                    </View>

                    <View style={detalhePedidoStyle.botoesDetalhes}>
                      <Pressable
                        style={detalhePedidoStyle.btnDetalhes}
                        onPress={() =>
                          Linking.openURL(
                            `https://wa.me/5511964440092?text=Gostaria de tirar uma dúvida!`,
                          )
                        }
                      >
                        <Image
                          style={detalhePedidoStyle.imgDetalhes}
                          source={require("@/assets/images/img/icones/mensagem.png")}
                        />
                        <Text style={detalhePedidoStyle.txtDetalhes}>
                          Falar com a loja
                        </Text>
                      </Pressable>
                      <Pressable
                        style={detalhePedidoStyle.btnDetalhes}
                        onPress={() => router.navigate("/pagamento")}
                      >
                        <Image
                          style={detalhePedidoStyle.imgDetalhes}
                          source={require("@/assets/images/img/icones/repetir.png")}
                        />
                        <Text style={detalhePedidoStyle.txtDetalhes}>
                          Pedir novamente
                        </Text>
                      </Pressable>
                    </View>
                  </>
                ) : (
                  <Text>Pedido não encontrado.</Text>
                )}
              </View>
            </View>
          </ScrollView>

          <FooterScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
