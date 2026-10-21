import { useState } from "react";
import { router } from "expo-router";
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
import FooterScreen from "@/app/footer";

export default function DetalhePedidoScreen() {
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
                <View style={detalhePedidoStyle.areaPedido}>
                  <Image
                    style={detalhePedidoStyle.imgPedido}
                    source={require("@/assets/images/img/icones/pedido.png")}
                    resizeMode="stretch"
                  />
                  <View style={detalhePedidoStyle.resumoPedido}>
                    <Text style={detalhePedidoStyle.numeroPedido}>
                      Pedido {"#"}1035
                    </Text>
                    <Text style={detalhePedidoStyle.horarioPedido}>
                      Hoje, 08:00
                    </Text>
                  </View>
                  <View style={detalhePedidoStyle.statusPedido}>
                    <Image
                      style={detalhePedidoStyle.imgStatus}
                      source={require("@/assets/images/img/icones/delivery-laranja.png")}
                      resizeMode="stretch"
                    />
                    <Text style={detalhePedidoStyle.txtStatus}>
                      Saiu para entrega
                    </Text>
                  </View>
                </View>

                <View style={detalhePedidoStyle.areaAcompanhar}>
                  <View style={detalhePedidoStyle.acompanharPedido}>
                    <View
                      style={[
                        detalhePedidoStyle.areaIconeEtapa,
                        detalhePedidoStyle.etapaFinalizada,
                      ]}
                    >
                      <Image
                        style={detalhePedidoStyle.iconeEtapa}
                        source={require("@/assets/images/img/icones/preparando-verde.png")}
                      />
                    </View>
                    <View
                      style={[
                        detalhePedidoStyle.linha,
                        detalhePedidoStyle.linhaFinalizada,
                      ]}
                    ></View>
                    <View
                      style={[
                        detalhePedidoStyle.areaIconeEtapa,
                        detalhePedidoStyle.etapaEmAndamento,
                      ]}
                    >
                      <Image
                        style={detalhePedidoStyle.iconeEtapa}
                        source={require("@/assets/images/img/icones/delivery-laranja.png")}
                      />
                    </View>
                    <View
                      style={[
                        detalhePedidoStyle.linha,
                        detalhePedidoStyle.linhaEmAndamento,
                      ]}
                    ></View>
                    <View style={detalhePedidoStyle.areaIconeEtapa}>
                      <Image
                        style={detalhePedidoStyle.iconeEtapa}
                        source={require("@/assets/images/img/icones/entregue-cinza.png")}
                      />
                    </View>
                  </View>

                  <View style={detalhePedidoStyle.textoAcompanhar}>
                    <Text style={detalhePedidoStyle.textoPedido}>
                      Em preparo
                    </Text>

                    <Text style={detalhePedidoStyle.textoPedido}>
                      Saiu para entrega
                    </Text>

                    <Text style={detalhePedidoStyle.textoPedido}>
                      Entrega realizada
                    </Text>
                  </View>

                  <View style={detalhePedidoStyle.statusAcompanhar}>
                    <Image
                      style={detalhePedidoStyle.imgStatusAcompanhar}
                      source={require("@/assets/images/img/icones/previsao.png")}
                      resizeMode="stretch"
                    />
                    <Text style={detalhePedidoStyle.txtStatusAcompanhar}>
                      Previsão estimada:
                    </Text>
                    <Text style={detalhePedidoStyle.txtStatusTempo}>
                      40 - 55 min
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
                        {itensResumo.map((item) => (
                          <View
                            style={detalhePedidoStyle.itemResumo}
                            key={item.id}
                          >
                            <Image
                              style={detalhePedidoStyle.imgProduto}
                              source={item.imagem}
                              resizeMode="stretch"
                            />
                            <Text style={detalhePedidoStyle.nomeProduto}>
                              {item.quantidade}x {item.nome}
                            </Text>
                            <Text style={detalhePedidoStyle.valorProduto}>
                              {item.valor}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  <View style={globalStyle.separador}></View>
                  <View style={detalhePedidoStyle.areaSubtotal}>
                    <Text style={detalhePedidoStyle.txtSubtotal}>Subtotal</Text>
                    <Text style={detalhePedidoStyle.valorSubtotal}>
                      R$ 150,40
                    </Text>
                  </View>
                  <View style={detalhePedidoStyle.areaValorEntrega}>
                    <Text style={detalhePedidoStyle.txtValorEntrega}>
                      Entrega
                    </Text>
                    <Text style={detalhePedidoStyle.valorEntrega}>R$ 8,00</Text>
                  </View>
                  <View style={detalhePedidoStyle.areaDesconto}>
                    <Text style={detalhePedidoStyle.txtDesconto}>Desconto</Text>
                    <Text style={detalhePedidoStyle.cupomDesconto}>
                      THEGUSTA40
                    </Text>
                    <Text style={detalhePedidoStyle.valorDesconto}>
                      R$ -15,84
                    </Text>
                  </View>
                  <View style={globalStyle.separador}></View>
                  <View style={detalhePedidoStyle.areaTotal}>
                    <Text style={detalhePedidoStyle.txtTotal}>Total</Text>
                    <Text style={detalhePedidoStyle.valorTotal}>R$ 142,56</Text>
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
                      Pix
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
                      Nenhuma observação para seu pedido
                    </Text>
                  </View>
                </View>

                <View style={detalhePedidoStyle.botoesDetalhes}>
                  <Pressable
                    style={detalhePedidoStyle.btnDetalhes} 
                    onPress={() => Linking.openURL(`https://wa.me/5511964440092?text=Gostaria de tirar uma dúvida!`)}
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
                    onPress={() => router.navigate('/pagamento')}
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

              </View>
            </View>
          </ScrollView>

          <FooterScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
