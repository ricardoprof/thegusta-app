import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
// precisa instalar o npx expo install expo-image-picker
import * as ImagePicker from "expo-image-picker";
import globalStyle from "@/styles/globalStyle";
import editarEnderecoStyle from "@/styles/editarEnderecoStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

export default function EditarEnderecoScreen() {
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

          <ScrollView
            style={globalStyle.scrollConteudo}
            contentContainerStyle={editarEnderecoStyle.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={editarEnderecoStyle.conteudo}>
              <View style={editarEnderecoStyle.header}>
                <Image
                  style={editarEnderecoStyle.logo}
                  source={require("@/assets/images/img/logo/logo.png")}
                  resizeMode="contain"
                />

                <Text style={editarEnderecoStyle.titulo}>Editar endereço</Text>

                <Text style={editarEnderecoStyle.subtitulo}>
                  Edite o endereço selecionado
                </Text>
              </View>

              <View style={editarEnderecoStyle.main}>
                <View style={editarEnderecoStyle.formulario}>
                  {/* Nome do endereço*/}
                  <View style={editarEnderecoStyle.areaTexto}>
                    <Image
                      style={editarEnderecoStyle.icone}
                      source={require("@/assets/images/img/icones/local.png")}
                    />
                    <View style={editarEnderecoStyle.input}>
                      <Text style={editarEnderecoStyle.tituloCaixa}>
                        Nome do endereço
                      </Text>

                      <TextInput
                        style={editarEnderecoStyle.txtCaixa}
                        placeholder="Casa"
                        placeholderTextColor={cores.preto}
                      />
                    </View>
                  </View>

                  {/* Endereço */}
                  <View style={editarEnderecoStyle.areaTexto}>
                    <Image
                      style={editarEnderecoStyle.icone}
                      source={require("@/assets/images/img/icones/local.png")}
                    />
                    <View style={editarEnderecoStyle.input}>
                      <Text style={editarEnderecoStyle.tituloCaixa}>
                        Endereço
                      </Text>

                      <TextInput
                        style={editarEnderecoStyle.txtCaixa}
                        placeholder="Avenida Marechal Tito, 1500"
                        placeholderTextColor={cores.cinza}
                      />
                    </View>
                  </View>

                  {/* Bairro */}
                  <View style={editarEnderecoStyle.areaTexto}>
                    <Image
                      style={editarEnderecoStyle.icone}
                      source={require("@/assets/images/img/icones/local.png")}
                    />
                    <View style={editarEnderecoStyle.input}>
                      <Text style={editarEnderecoStyle.tituloCaixa}>
                        Bairro
                      </Text>

                      <TextInput
                        placeholder="São Miguel Paulista"
                        placeholderTextColor={cores.cinza}
                        style={editarEnderecoStyle.txtCaixa}
                      />
                    </View>
                  </View>

                  {/* Cidade */}
                  <View style={editarEnderecoStyle.areaTexto}>
                    <Image
                      style={editarEnderecoStyle.icone}
                      source={require("@/assets/images/img/icones/local.png")}
                    />
                    <View style={editarEnderecoStyle.input}>
                      <Text style={editarEnderecoStyle.tituloCaixa}>Cidade</Text>

                      <TextInput
                        placeholder="São Paulo"
                        placeholderTextColor={cores.cinza}
                        style={editarEnderecoStyle.txtCaixa}
                      />
                    </View>
                  </View>

                  {/* Uf */}
                  <View style={editarEnderecoStyle.areaTexto}>
                    <Image
                      style={editarEnderecoStyle.icone}
                      source={require("@/assets/images/img/icones/local.png")}
                    />
                    <View style={editarEnderecoStyle.input}>
                      <Text style={editarEnderecoStyle.tituloCaixa}>
                        UF
                      </Text>

                      <TextInput
                        placeholder="SP"
                        placeholderTextColor={cores.cinza}
                        style={editarEnderecoStyle.txtCaixa}
                      />
                    </View>
                  </View>

                  {/* CEP */}
                  <View style={editarEnderecoStyle.areaTexto}>
                    <Image
                      style={editarEnderecoStyle.icone}
                      source={require("@/assets/images/img/icones/local.png")}
                    />
                    <View style={editarEnderecoStyle.input}>
                      <Text style={editarEnderecoStyle.tituloCaixa}>
                        CEP
                      </Text>

                      <TextInput
                        placeholder="00000-000"
                        placeholderTextColor={cores.cinza}
                        style={editarEnderecoStyle.txtCaixa}
                      />
                    </View>
                  </View>
                </View>

                {/* Sair */}
                <Pressable
                  style={editarEnderecoStyle.btnSalvar}
                  onPress={() => router.replace("/config")}
                >
                  <Text style={editarEnderecoStyle.txtSalvar}>
                    Salvar alterações
                  </Text>
                </Pressable>

                <Pressable
                  style={editarEnderecoStyle.btnCancelar}
                  onPress={() => router.replace("/config")}
                >
                  <Text style={editarEnderecoStyle.txtCancelar}>Cancelar</Text>
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
