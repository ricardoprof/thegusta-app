import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Linking
} from "react-native";
import globalStyle from "@/styles/globalStyle";
import pagamentoStyle from "@/styles/pagamentoStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

export default function PagamentoScreen() {

  const itensResumo = [
    {
      id: 1,
      quantidade: 2,
      nome: "Bolo de Banana Fit",
      valor: "R$ 37,60",
      imagem: require("@/assets/images/img/produtos/bolo01.png"),
    },
    {
      id: 2,
      quantidade: 3,
      nome: "Bolo de Banana Fit",
      valor: "R$ 56,40",
      imagem: require("@/assets/images/img/produtos/bolo01.png"),
    },
    {
      id: 3,
      quantidade: 2,
      nome: "Bolo de Banana Fit",
      valor: "R$ 37,60",
      imagem: require("@/assets/images/img/produtos/bolo01.png"),
    },
  ];

  const confirmarPedido = () => {
    const telefone = "5511964440092";

    const listaProdutos = itensResumo
      .map(
        (item) =>
          `${item.quantidade}x ${item.nome} - ${item.valor}`
      )
      .join("\n");

    const mensagem = `
    🍰 *NOVO PEDIDO - THE GUSTA*

    📋 *Itens do pedido:*

    ${listaProdutos}

    -------------------------
    Subtotal: R$ 150,40
    Entrega: R$ 8,00
    Desconto: R$ -15,84

    💰 *Total: R$ 142,56*

    📍 *Entrega*
    Avenida Marechal Tito, 1500
    São Miguel Paulista - São Paulo - SP

    💳 *Forma de pagamento:* Pix
    `;

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    Linking.openURL(url);
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
            <View style={pagamentoStyle.conteudo}>
              <View style={pagamentoStyle.header}>
                <View style={pagamentoStyle.conteudoHeader}>
                  <Text style={pagamentoStyle.titulo}>Pagamento</Text>
                  <Image
                    style={pagamentoStyle.logo}
                    source={require("@/assets/images/img/logo/logo.png")}
                  />
                </View>
                <Text style={pagamentoStyle.subtitulo}>
                  Confirme entrega e forma de pagamento
                </Text>
              </View>

              <View style={pagamentoStyle.main}>
                <View style={pagamentoStyle.endereco}>
                  <Image
                    style={pagamentoStyle.imgEndereco}
                    source={require("@/assets/images/img/icones/local.png")}
                    resizeMode="stretch"
                  />
                  <View style={pagamentoStyle.infoEndereco}>
                    <Text style={pagamentoStyle.tituloEndereco}>
                      Endereço de entrega:
                    </Text>
                    <Text style={pagamentoStyle.nomeEndereco}>Casa</Text>
                    <Text style={pagamentoStyle.enderecoCompleto}>
                      Avenida Marechal Tito, 1500
                    </Text>
                    <Text style={pagamentoStyle.localCompleto}>
                      São Miguel Paulista - São Paulo - SP
                    </Text>
                    <Text style={pagamentoStyle.telefone}>
                      {"("}11{")"} 99999-9999
                    </Text>
                  </View>
                  <Pressable>
                    <Text style={pagamentoStyle.txtAlterar}>Alterar {">"}</Text>
                  </Pressable>
                </View>

                <View style={pagamentoStyle.areaEntrega}>
                  <Image
                    style={pagamentoStyle.imgEntrega}
                    source={require("@/assets/images/img/icones/delivery-laranja.png")}
                    resizeMode="stretch"
                  />
                  <View style={pagamentoStyle.infoEntrega}>
                    <Text style={pagamentoStyle.tituloEntrega}>
                      Endereço de entrega:
                    </Text>
                    <View style={pagamentoStyle.btnEntregaRetira}>
                      <Pressable style={pagamentoStyle.btnEntrega}>
                        <Text style={pagamentoStyle.txtEntrega}>Entrega</Text>
                      </Pressable>
                      <Pressable style={pagamentoStyle.btnRetira}>
                        <Text style={pagamentoStyle.txtRetira}>Retirada</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={pagamentoStyle.previsao}>
                    <Text style={pagamentoStyle.tempoEntrega}>40 - 60 min</Text>
                    <Text style={pagamentoStyle.txtPrevisao}>Previsão</Text>
                  </View>
                </View>

                <View style={pagamentoStyle.areaPagamento}>
                  <Image
                    style={pagamentoStyle.imgPagamento}
                    source={require("@/assets/images/img/icones/carteira.png")}
                    resizeMode="stretch"
                  />
                  <View style={pagamentoStyle.infoPagamento}>
                    <Text style={pagamentoStyle.tituloPagamento}>
                      Forma de Pagamento
                    </Text>
                    <View style={pagamentoStyle.btnPagamento}>
                      <Pressable style={pagamentoStyle.btnPix}>
                        <Text style={pagamentoStyle.txtPix}>Pix</Text>
                      </Pressable>
                      <Pressable style={pagamentoStyle.btnCartao}>
                        <Text style={pagamentoStyle.txtCartao}>Cartão</Text>
                      </Pressable>
                      <Pressable style={pagamentoStyle.btnDinheiro}>
                        <Text style={pagamentoStyle.txtDinheiro}>Dinheiro</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

                <View style={pagamentoStyle.areaObservacao}>
                  <Image
                    style={pagamentoStyle.imgObservacao}
                    source={require("@/assets/images/img/icones/mensagem.png")}
                    resizeMode="stretch"
                  />
                  <View style={pagamentoStyle.observacao}>
                    <Text style={pagamentoStyle.tituloObservacao}>
                      Observação
                    </Text>
                    <TextInput
                      style={pagamentoStyle.txtObservacao}
                      placeholder="Alguma observação para seu pedido?"
                      placeholderTextColor={cores.cinza}
                    />
                  </View>
                </View>

                <View style={pagamentoStyle.subtotal}>
                  <View style={pagamentoStyle.topoSubtotal}>
                    <Image
                      style={pagamentoStyle.imgSubtotal}
                      source={require("@/assets/images/img/icones/pedido.png")}
                      resizeMode="stretch"
                    />
                    <View style={pagamentoStyle.resumoPedido}>
                      <Text style={pagamentoStyle.tituloSubtotal}>
                        Resumo do pedido
                      </Text>
                      <View style={pagamentoStyle.resumo}>
                        {itensResumo.map((item) => (
                          <View style={pagamentoStyle.itemResumo} key={item.id}>
                            <Image 
                              style={pagamentoStyle.imgProduto}
                              source={item.imagem}
                              resizeMode="stretch"
                            />
                            <Text style={pagamentoStyle.nomeProduto}>{item.quantidade}x {item.nome}</Text>
                            <Text style={pagamentoStyle.valorProduto}>{item.valor}</Text>
                          </View>                          
                        ))}
                      </View>
                    </View>
                  </View>

                  <View style={globalStyle.separador}></View>
                  <View style={pagamentoStyle.areaSubtotal}>
                    <Text style={pagamentoStyle.txtSubtotal}>Subtotal</Text>
                    <Text style={pagamentoStyle.valorSubtotal}>R$ 150,40</Text>
                  </View>
                  <View style={pagamentoStyle.areaValorEntrega}>
                    <Text style={pagamentoStyle.txtValorEntrega}>Entrega</Text>
                    <Text style={pagamentoStyle.valorEntrega}>R$ 8,00</Text>
                  </View>
                  <View style={pagamentoStyle.areaDesconto}>
                    <Text style={pagamentoStyle.txtDesconto}>Desconto</Text>
                    <Text style={pagamentoStyle.cupomDesconto}>THEGUSTA40</Text>
                    <Text style={pagamentoStyle.valorDesconto}>R$ -15,84</Text>
                  </View>
                  <View style={globalStyle.separador}></View>
                  <View style={pagamentoStyle.areaTotal}>
                    <Text style={pagamentoStyle.txtTotal}>Total</Text>
                    <Text style={pagamentoStyle.valorTotal}>R$ 142,56</Text>
                  </View>
                </View>
                <Pressable style={pagamentoStyle.btnPedido} onPress={confirmarPedido}>
                  <Text style={pagamentoStyle.txtPedido}>Confirmar pedido</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          <FooterScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
