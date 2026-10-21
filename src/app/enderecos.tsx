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
  Linking,
} from "react-native";
import globalStyle from "@/styles/globalStyle";
import enderecosStyle from "@/styles/enderecosStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

export default function EnderecosScreen() {
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
            <View style={enderecosStyle.conteudo}>
              <View style={enderecosStyle.header}>
                <View style={enderecosStyle.conteudoHeader}>
                  <Text style={enderecosStyle.titulo}>Endereços</Text>
                  <Image
                    style={enderecosStyle.logo}
                    source={require("@/assets/images/img/logo/logo.png")}
                  />
                </View>
                <Text style={enderecosStyle.subtitulo}>
                  Gerencie seus endereços de entrega
                </Text>
              </View>

              <View style={enderecosStyle.main}>
                <View style={enderecosStyle.areaEndereco}>
                  <View style={enderecosStyle.endereco}>
                    <View style={enderecosStyle.areaIcone}>
                      <Image
                        style={enderecosStyle.icone}
                        source={require("@/assets/images/img/icones/home.png")}
                        resizeMode="stretch"
                      />
                    </View>
                    <View style={enderecosStyle.infoEndereco}>
                      <Text style={enderecosStyle.nomeEndereco}>Casa</Text>
                      <Text style={enderecosStyle.localCompleto}>
                        Avenida Marechal Tito, 1500
                      </Text>
                      <Text style={enderecosStyle.localCompleto}>
                        São Miguel Paulista - São Paulo - SP
                      </Text>
                      <Text style={enderecosStyle.localCompleto}>
                        CEP: 00000-000
                      </Text>
                    </View>
                    <Pressable style={enderecosStyle.btnFavorito}>
                      <Text style={enderecosStyle.iconeFavoritoAtivo}>★</Text>
                      <Text style={enderecosStyle.txtFavoritoAtivo}>
                        Endereço ativo
                      </Text>
                    </Pressable>
                  </View>
                  <View style={globalStyle.separador}></View>
                  <View style={enderecosStyle.botoes}>
                    <Pressable
                      style={enderecosStyle.btnEditar}
                      onPress={() => router.navigate("/editar-endereco")}
                    >
                      <Text style={enderecosStyle.txtEditar}>Editar</Text>
                    </Pressable>
                    <Pressable style={enderecosStyle.btnExcluir}>
                      <Text style={enderecosStyle.txtExcluir}>Excluir</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={enderecosStyle.areaEndereco}>
                  <View style={enderecosStyle.endereco}>
                    <View style={enderecosStyle.areaIcone}>
                      <Image
                        style={enderecosStyle.icone}
                        source={require("@/assets/images/img/icones/trabalho.png")}
                        resizeMode="stretch"
                      />
                    </View>
                    <View style={enderecosStyle.infoEndereco}>
                      <Text style={enderecosStyle.nomeEndereco}>Trabalho</Text>
                      <Text style={enderecosStyle.localCompleto}>
                        Avenida Marechal Tito, 1500
                      </Text>
                      <Text style={enderecosStyle.localCompleto}>
                        São Miguel Paulista - São Paulo - SP
                      </Text>
                      <Text style={enderecosStyle.localCompleto}>
                        CEP: 00000-000
                      </Text>
                    </View>
                    <Pressable style={enderecosStyle.btnFavorito}>
                      <Text style={enderecosStyle.iconeFavoritoInativo}>☆</Text>
                      <Text style={enderecosStyle.txtFavoritoInativo}>
                        Usar este endereço
                      </Text>
                    </Pressable>
                  </View>
                  <View style={globalStyle.separador}></View>
                  <View style={enderecosStyle.botoes}>
                    <Pressable
                      style={enderecosStyle.btnEditar}
                      onPress={() => router.navigate("/editar-endereco")}
                    >
                      <Text style={enderecosStyle.txtEditar}>Editar</Text>
                    </Pressable>
                    <Pressable style={enderecosStyle.btnExcluir}>
                      <Text style={enderecosStyle.txtExcluir}>Excluir</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={enderecosStyle.areaEndereco}>
                  <View style={enderecosStyle.endereco}>
                    <View style={enderecosStyle.areaIcone}>
                      <Image
                        style={enderecosStyle.icone}
                        source={require("@/assets/images/img/icones/local.png")}
                        resizeMode="stretch"
                      />
                    </View>
                    <View style={enderecosStyle.infoEndereco}>
                      <Text style={enderecosStyle.nomeEndereco}>Academia</Text>
                      <Text style={enderecosStyle.localCompleto}>
                        Avenida Marechal Tito, 1500
                      </Text>
                      <Text style={enderecosStyle.localCompleto}>
                        São Miguel Paulista - São Paulo - SP
                      </Text>
                      <Text style={enderecosStyle.localCompleto}>
                        CEP: 00000-000
                      </Text>
                    </View>
                    <Pressable style={enderecosStyle.btnFavorito}>
                      <Text style={enderecosStyle.iconeFavoritoInativo}>☆</Text>
                      <Text style={enderecosStyle.txtFavoritoInativo}>
                        Usar este endereço
                      </Text>
                    </Pressable>
                  </View>
                  <View style={globalStyle.separador}></View>
                  <View style={enderecosStyle.botoes}>
                    <Pressable
                      style={enderecosStyle.btnEditar}
                      onPress={() => router.navigate("/editar-endereco")}
                    >
                      <Text style={enderecosStyle.txtEditar}>Editar</Text>
                    </Pressable>
                    <Pressable style={enderecosStyle.btnExcluir}>
                      <Text style={enderecosStyle.txtExcluir}>Excluir</Text>
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
