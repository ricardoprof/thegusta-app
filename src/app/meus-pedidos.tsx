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
} from "react-native";
import globalStyle from "@/styles/globalStyle";
import meusPedidosStyle from "@/styles/meusPedidosStyle";
import FooterScreen from "@/app/footer";

export default function MeusPedidosScreen() {
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
            <View style={meusPedidosStyle.conteudo}>
              <View style={meusPedidosStyle.header}>
                <View style={meusPedidosStyle.conteudoHeader}>
                  <Text style={meusPedidosStyle.titulo}>Meus pedidos</Text>
                  <Image
                    style={meusPedidosStyle.logo}
                    source={require("@/assets/images/img/logo/logo.png")}
                  />
                </View>
                <Text style={meusPedidosStyle.subtitulo}>
                  Acompanhe seus pedidos e seu histórico
                </Text>
              </View>

              <View style={meusPedidosStyle.main}>
                <View style={meusPedidosStyle.posicaoPedido}>
                  <Pressable style={meusPedidosStyle.btnAndamento}>
                    <Text style={meusPedidosStyle.txtAndamento}>Em andamento</Text>
                  </Pressable>
                  <Pressable style={meusPedidosStyle.btnEntregue}>
                    <Text style={meusPedidosStyle.txtEntregue}>Entrtegues</Text>
                  </Pressable>
                </View>

                <View style={meusPedidosStyle.subtotal}>
                  <View style={meusPedidosStyle.topoSubtotal}>
                    <Image
                      style={meusPedidosStyle.imgSubtotal}
                      source={require("@/assets/images/img/icones/preparando-laranja.png")}
                      resizeMode="stretch"
                    />
                    <View style={meusPedidosStyle.resumoPedido}>
                      <View style={meusPedidosStyle.topoPedido}>
                        <Text style={meusPedidosStyle.tituloSubtotal}>
                          Pedido {"#"}1035
                        </Text>
                        <View style={meusPedidosStyle.statusPedido}>
                          <Image
                            style={meusPedidosStyle.imgStatus}
                            source={require("@/assets/images/img/icones/preparando-laranja.png")}
                            resizeMode="stretch"
                          />
                          <Text style={meusPedidosStyle.txtStatus}>
                            Em preparo
                          </Text>
                        </View>
                      </View>
                      <View style={meusPedidosStyle.areaResumo}>
                        <View style={meusPedidosStyle.resumo}>
                          {/* REPETIÇÃO */}
                          {itensResumo.map((item) => (
                            <View
                              style={meusPedidosStyle.itemResumo}
                              key={item.id}
                            >
                              <Image
                                style={meusPedidosStyle.imgProduto}
                                source={item.imagem}
                                resizeMode="stretch"
                              />
                              <Text style={meusPedidosStyle.nomeProduto}>
                                {item.quantidade}x {item.nome}
                              </Text>
                            </View>
                          ))}
                          {/* FIM REPETIÇÃO */}
                        </View>
                        <Image
                          style={meusPedidosStyle.imgResumo}
                          source={require("@/assets/images/img/icones/preparando-laranja.png")}
                          resizeMode="stretch"
                        />
                      </View>
                    </View>
                  </View>

                  <View style={globalStyle.separador}></View>
                  <View style={meusPedidosStyle.rodapeResumo}>
                    <View style={meusPedidosStyle.areaTotal}>
                      <Text style={meusPedidosStyle.txtTotal}>TOTAL</Text>
                      <Text style={meusPedidosStyle.valorTotal}>R$ 142,56</Text>
                    </View>
                    <View style={meusPedidosStyle.areaPrevisao}>
                      <Image
                        style={meusPedidosStyle.imgPrevisao}
                        source={require("@/assets/images/img/icones/previsao.png")}
                        resizeMode="stretch"
                      />
                      <View style={meusPedidosStyle.tempoPrevisao}>
                        <Text style={meusPedidosStyle.txtPrevisao}>
                          Previsão
                        </Text>
                        <Text style={meusPedidosStyle.txtTempoPrevisao}>
                          45 - 60 min
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Pressable
                    style={meusPedidosStyle.btnDetalhes} 
                    onPress={() => router.navigate('/detalhe-pedido')}
                   >
                    <Text style={meusPedidosStyle.txtDetalhes}>
                      Ver detalhes
                    </Text>
                  </Pressable>
                </View>

                <View style={meusPedidosStyle.subtotal}>
                  <View style={meusPedidosStyle.topoSubtotal}>
                    <Image
                      style={meusPedidosStyle.imgSubtotal}
                      source={require("@/assets/images/img/icones/aguardando-laranja.png")}
                      resizeMode="stretch"
                    />
                    <View style={meusPedidosStyle.resumoPedido}>
                      <View style={meusPedidosStyle.topoPedido}>
                        <Text style={meusPedidosStyle.tituloSubtotal}>
                          Pedido {"#"}1032
                        </Text>
                        <View style={meusPedidosStyle.statusPedido}>
                          <Image
                            style={meusPedidosStyle.imgStatus}
                            source={require("@/assets/images/img/icones/aguardando-laranja.png")}
                            resizeMode="stretch"
                          />
                          <Text style={meusPedidosStyle.txtStatus}>
                            Aguardando retira
                          </Text>
                        </View>
                      </View>
                      <View style={meusPedidosStyle.areaResumo}>
                        <View style={meusPedidosStyle.resumo}>
                          {/* REPETIÇÃO */}
                          {itensResumo.map((item) => (
                            <View
                              style={meusPedidosStyle.itemResumo}
                              key={item.id}
                            >
                              <Image
                                style={meusPedidosStyle.imgProduto}
                                source={item.imagem}
                                resizeMode="stretch"
                              />
                              <Text style={meusPedidosStyle.nomeProduto}>
                                {item.quantidade}x {item.nome}
                              </Text>
                            </View>
                          ))}
                          {/* FIM REPETIÇÃO */}
                        </View>
                        <Image
                          style={meusPedidosStyle.imgResumo}
                          source={require("@/assets/images/img/icones/aguardando-laranja.png")}
                          resizeMode="stretch"
                        />
                      </View>
                    </View>
                  </View>

                  <View style={globalStyle.separador}></View>
                  <View style={meusPedidosStyle.rodapeResumo}>
                    <View style={meusPedidosStyle.areaTotal}>
                      <Text style={meusPedidosStyle.txtTotal}>TOTAL</Text>
                      <Text style={meusPedidosStyle.valorTotal}>R$ 142,56</Text>
                    </View>
                    <View style={meusPedidosStyle.areaPrevisao}>
                      <Image
                        style={meusPedidosStyle.imgPrevisao}
                        source={require("@/assets/images/img/icones/previsao.png")}
                        resizeMode="stretch"
                      />
                      <View style={meusPedidosStyle.tempoPrevisao}>
                        <Text style={meusPedidosStyle.txtPrevisao}>
                          Previsão
                        </Text>
                        <Text style={meusPedidosStyle.txtTempoPrevisao}>
                          45 - 60 min
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Pressable style={meusPedidosStyle.btnDetalhes} 
                    onPress={() => router.navigate('/detalhe-pedido')}>
                    <Text style={meusPedidosStyle.txtDetalhes}>
                      Ver detalhes
                    </Text>
                  </Pressable>
                </View>

                <View style={meusPedidosStyle.subtotal}>
                  <View style={meusPedidosStyle.topoSubtotal}>
                    <Image
                      style={meusPedidosStyle.imgSubtotal}
                      source={require("@/assets/images/img/icones/delivery-laranja.png")}
                      resizeMode="stretch"
                    />
                    <View style={meusPedidosStyle.resumoPedido}>
                      <View style={meusPedidosStyle.topoPedido}>
                        <Text style={meusPedidosStyle.tituloSubtotal}>
                          Pedido {"#"}1027
                        </Text>
                        <View style={meusPedidosStyle.statusPedido}>
                          <Image
                            style={meusPedidosStyle.imgStatus}
                            source={require("@/assets/images/img/icones/delivery-laranja.png")}
                            resizeMode="stretch"
                          />
                          <Text style={meusPedidosStyle.txtStatus}>
                            Em preparo
                          </Text>
                        </View>
                      </View>
                      <View style={meusPedidosStyle.areaResumo}>
                        <View style={meusPedidosStyle.resumo}>
                          {/* REPETIÇÃO */}
                          {itensResumo.map((item) => (
                            <View
                              style={meusPedidosStyle.itemResumo}
                              key={item.id}
                            >
                              <Image
                                style={meusPedidosStyle.imgProduto}
                                source={item.imagem}
                                resizeMode="stretch"
                              />
                              <Text style={meusPedidosStyle.nomeProduto}>
                                {item.quantidade}x {item.nome}
                              </Text>
                            </View>
                          ))}
                          {/* FIM REPETIÇÃO */}
                        </View>
                        <Image
                          style={meusPedidosStyle.imgResumo}
                          source={require("@/assets/images/img/icones/delivery-laranja.png")}
                          resizeMode="stretch"
                        />
                      </View>
                    </View>
                  </View>

                  <View style={globalStyle.separador}></View>
                  <View style={meusPedidosStyle.rodapeResumo}>
                    <View style={meusPedidosStyle.areaTotal}>
                      <Text style={meusPedidosStyle.txtTotal}>TOTAL</Text>
                      <Text style={meusPedidosStyle.valorTotal}>R$ 142,56</Text>
                    </View>
                    <View style={meusPedidosStyle.areaPrevisao}>
                      <Image
                        style={meusPedidosStyle.imgPrevisao}
                        source={require("@/assets/images/img/icones/previsao.png")}
                        resizeMode="stretch"
                      />
                      <View style={meusPedidosStyle.tempoPrevisao}>
                        <Text style={meusPedidosStyle.txtPrevisao}>
                          Previsão
                        </Text>
                        <Text style={meusPedidosStyle.txtTempoPrevisao}>
                          45 - 60 min
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={meusPedidosStyle.btnPedido}>
                    <Pressable style={meusPedidosStyle.btnDetalhes} 
                      onPress={() => router.navigate('/detalhe-pedido')}>
                      <Text style={meusPedidosStyle.txtDetalhes}>
                        Ver detalhes
                      </Text>
                    </Pressable>
                    <Pressable style={meusPedidosStyle.btnRastrear}>
                      <Text style={meusPedidosStyle.txtRastrear}>
                        Rastrear entrega
                      </Text>
                    </Pressable>
                  </View>
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
