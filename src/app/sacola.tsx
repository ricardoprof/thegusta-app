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
import sacolaStyle from "@/styles/sacolaStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

export default function SacolaScreen() {
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

                <View style={sacolaStyle.itemSacola}>
                  <Image 
                    style={sacolaStyle.imgItem} 
                    source={require('@/assets/images/img/produtos/bolo01.png')}
                    resizeMode="stretch"
                  />
                  <View style={sacolaStyle.centroItem}>
                    <Text style={sacolaStyle.tituloItem}>Bolo de Banana Fit</Text>
                    <Text style={sacolaStyle.descricaoItem}>Banana Prata com canela e gergilim</Text>
                    <View style={sacolaStyle.valoresItem}>
                      <Text style={sacolaStyle.valorUnitItem}>R$ 18,80</Text>
                      <Text style={sacolaStyle.valorTotalItem}>R$ 37,60</Text>
                    </View>
                  </View>
                  <View style={sacolaStyle.direitaItem}>
                    <Pressable style={sacolaStyle.btnExcluir}>
                      <Image
                         style={sacolaStyle.imgExcluir}
                         source={require('@/assets/images/img/icones/lixeira.png')}
                      />
                    </Pressable>
                    <View style={sacolaStyle.caixaQtde}>
                      <Pressable style={sacolaStyle.btnQtde}>
                        <Image
                          style={sacolaStyle.imgQtde}
                          source={require("@/assets/images/img/icones/retirar.png")}
                        />
                      </Pressable>
                      <Text style={sacolaStyle.quantidade}>2</Text>
                      <Pressable style={sacolaStyle.btnQtde}>
                        <Image
                          style={sacolaStyle.imgQtde}
                          source={require("@/assets/images/img/icones/adicionar.png")}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>

                <View style={sacolaStyle.itemSacola}>
                  <Image 
                    style={sacolaStyle.imgItem} 
                    source={require('@/assets/images/img/produtos/bolo01.png')}
                    resizeMode="stretch"
                  />
                  <View style={sacolaStyle.centroItem}>
                    <Text style={sacolaStyle.tituloItem}>Bolo de Banana Fit</Text>
                    <Text style={sacolaStyle.descricaoItem}>Banana Prata com canela e gergilim</Text>
                    <View style={sacolaStyle.valoresItem}>
                      <Text style={sacolaStyle.valorUnitItem}>R$ 18,80</Text>
                      <Text style={sacolaStyle.valorTotalItem}>R$ 37,60</Text>
                    </View>
                  </View>
                  <View style={sacolaStyle.direitaItem}>
                    <Pressable style={sacolaStyle.btnExcluir}>
                      <Image
                         style={sacolaStyle.imgExcluir}
                         source={require('@/assets/images/img/icones/lixeira.png')}
                      />
                    </Pressable>
                    <View style={sacolaStyle.caixaQtde}>
                      <Pressable style={sacolaStyle.btnQtde}>
                        <Image
                          style={sacolaStyle.imgQtde}
                          source={require("@/assets/images/img/icones/retirar.png")}
                        />
                      </Pressable>
                      <Text style={sacolaStyle.quantidade}>2</Text>
                      <Pressable style={sacolaStyle.btnQtde}>
                        <Image
                          style={sacolaStyle.imgQtde}
                          source={require("@/assets/images/img/icones/adicionar.png")}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>

                <View style={sacolaStyle.itemSacola}>
                  <Image 
                    style={sacolaStyle.imgItem} 
                    source={require('@/assets/images/img/produtos/bolo01.png')}
                    resizeMode="stretch"
                  />
                  <View style={sacolaStyle.centroItem}>
                    <Text style={sacolaStyle.tituloItem}>Bolo de Banana Fit</Text>
                    <Text style={sacolaStyle.descricaoItem}>Banana Prata com canela e gergilim</Text>
                    <View style={sacolaStyle.valoresItem}>
                      <Text style={sacolaStyle.valorUnitItem}>R$ 18,80</Text>
                      <Text style={sacolaStyle.valorTotalItem}>R$ 37,60</Text>
                    </View>
                  </View>
                  <View style={sacolaStyle.direitaItem}>
                    <Pressable style={sacolaStyle.btnExcluir}>
                      <Image
                         style={sacolaStyle.imgExcluir}
                         source={require('@/assets/images/img/icones/lixeira.png')}
                      />
                    </Pressable>
                    <View style={sacolaStyle.caixaQtde}>
                      <Pressable style={sacolaStyle.btnQtde}>
                        <Image
                          style={sacolaStyle.imgQtde}
                          source={require("@/assets/images/img/icones/retirar.png")}
                        />
                      </Pressable>
                      <Text style={sacolaStyle.quantidade}>2</Text>
                      <Pressable style={sacolaStyle.btnQtde}>
                        <Image
                          style={sacolaStyle.imgQtde}
                          source={require("@/assets/images/img/icones/adicionar.png")}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>

                <View style={sacolaStyle.cupom}>
                  <View style={sacolaStyle.cupomEsquerdo}>
                    <Text style={sacolaStyle.tituloCupom}>Cupom de Desconto</Text>
                    <TextInput
                      style={sacolaStyle.txtCupom}
                      placeholder="Digite seu cupom"
                      placeholderTextColor={cores.cinza}
                    />
                  </View>
                  <Pressable>
                    <Text style={sacolaStyle.txtAplicar}>Aplicar {'>'} </Text>
                  </Pressable>
                </View>

                <View style={sacolaStyle.endereco}>
                  <Image 
                    style={sacolaStyle.imgEndereco}
                    source={require('@/assets/images/img/icones/delivery-laranja.png')}
                    resizeMode="stretch"
                  />
                  <View style={sacolaStyle.infoEndereco}>
                    <Text style={sacolaStyle.tituloEndereco}>Entrega em:</Text>
                    <Text style={sacolaStyle.enderecoCompleto}>
                      Avenida Marechal Tito, 1500 - São Miguel Paulista - São Paulo - SP
                    </Text>
                    <Text style={sacolaStyle.telefone}>{'('}11{')'} 99999-9999</Text>
                    <View style={sacolaStyle.entrega}>
                      <Text style={sacolaStyle.tituloEntrega}>Entrega estimada em:</Text>
                      <Text style={sacolaStyle.tempoEntrega}>40 - 60 min</Text>
                      <Pressable>
                        <Text style={sacolaStyle.txtEndereco}>Trocar endereço</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

                <View style={sacolaStyle.subtotal}>
                  <View style={sacolaStyle.areaSubtotal}>
                    <Text style={sacolaStyle.txtSubtotal}>Subtotal</Text>
                    <Text style={sacolaStyle.valorSubtotal}>R$ 150,40</Text>
                  </View>
                  <View style={sacolaStyle.areaEntrega}>
                    <Text style={sacolaStyle.txtEntrega}>Entrega</Text>
                    <Text style={sacolaStyle.valorEntrega}>R$   8,00</Text>
                  </View>
                  <View style={sacolaStyle.areaDesconto}>
                    <Text style={sacolaStyle.txtDesconto}>Desconto</Text>
                    <Text style={sacolaStyle.cupomDesconto}>THEGUSTA40</Text>
                    <Text style={sacolaStyle.valorDesconto}>R$ -15,84</Text>
                  </View>
                  <View style={globalStyle.separador}></View>
                  <View style={sacolaStyle.areaTotal}>
                    <Text style={sacolaStyle.txtTotal}>Total</Text>
                    <Text style={sacolaStyle.valorTotal}>R$ 142,56</Text>
                  </View>
                </View>
                <Pressable 
                  style={sacolaStyle.btnPagamento}
                  onPress={() => router.navigate('/pagamento')}
                >
                  <Text style={sacolaStyle.txtPagamento}>Continuar para pagamento</Text>
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
