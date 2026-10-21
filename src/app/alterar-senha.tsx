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
import alterarSenhaStyle from "@/styles/alterarSenhaStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

export default function AlterarSenhaScreen() {
  const [verSenha, setVerSenha] = useState(false);
  const [verNovaSenha, setVerNovaSenha] = useState(false);
  const [verConfirmarNovaSenha, setVerConfirmarNovaSenha] = useState(false);

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
            contentContainerStyle={alterarSenhaStyle.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={alterarSenhaStyle.conteudo}>
              <View style={alterarSenhaStyle.header}>
                <Image
                  style={alterarSenhaStyle.logo}
                  source={require("@/assets/images/img/logo/logo.png")}
                  resizeMode="contain"
                />

                <Text style={alterarSenhaStyle.titulo}>Alterar senha</Text>

                <Text style={alterarSenhaStyle.subtitulo}>
                  Atualize sua senha com segurança
                </Text>
              </View>

              <View style={alterarSenhaStyle.main}>
                <View style={alterarSenhaStyle.formulario}>
                  {/* Senha atual*/}
                  <View style={alterarSenhaStyle.areaTexto}>
                    <Image
                      style={alterarSenhaStyle.icone}
                      source={require("@/assets/images/img/icones/senha.png")}
                    />
                    <View style={alterarSenhaStyle.input}>
                      <Text style={alterarSenhaStyle.tituloCaixa}>
                        Senha atual
                      </Text>

                      <TextInput
                        style={alterarSenhaStyle.txtCaixa}
                        placeholder="Senha atual"
                        placeholderTextColor={cores.cinza}
                        secureTextEntry={!verSenha}
                      />
                    </View>
                    <Pressable
                      style={alterarSenhaStyle.btnMostrarSenha}
                      onPress={() => setVerSenha((current) => !current)}
                    >
                      <Image
                        source={
                          verSenha
                            ? require("@/assets/images/img/icones/esconder.png")
                            : require("@/assets/images/img/icones/mostrar.png")
                        }
                        style={alterarSenhaStyle.mostrarSenha}
                      />
                    </Pressable>
                  </View>

                  {/* Nova senha */}
                  <View style={alterarSenhaStyle.areaTexto}>
                    <Image
                      style={alterarSenhaStyle.icone}
                      source={require("@/assets/images/img/icones/senha.png")}
                    />
                    <View style={alterarSenhaStyle.input}>
                      <Text style={alterarSenhaStyle.tituloCaixa}>
                        Nova senha
                      </Text>

                      <TextInput
                        style={alterarSenhaStyle.txtCaixa}
                        placeholder="Nova senha"
                        placeholderTextColor={cores.cinza}
                        secureTextEntry={!verNovaSenha}
                      />
                    </View>
                    <Pressable
                      style={alterarSenhaStyle.btnMostrarSenha}
                      onPress={() => setVerNovaSenha((current) => !current)}
                    >
                      <Image
                        source={
                          verNovaSenha
                            ? require("@/assets/images/img/icones/esconder.png")
                            : require("@/assets/images/img/icones/mostrar.png")
                        }
                        style={alterarSenhaStyle.mostrarSenha}
                      />
                    </Pressable>
                  </View>

                  {/* Confirmar nova senha */}
                  <View style={alterarSenhaStyle.areaTexto}>
                    <Image
                      style={alterarSenhaStyle.icone}
                      source={require("@/assets/images/img/icones/senha.png")}
                    />
                    <View style={alterarSenhaStyle.input}>
                      <Text style={alterarSenhaStyle.tituloCaixa}>
                        Confirmar nova senha
                      </Text>

                      <TextInput
                        placeholder="Confirmar nova senha"
                        placeholderTextColor={cores.cinza}
                        style={alterarSenhaStyle.txtCaixa}
                        secureTextEntry={!verConfirmarNovaSenha}
                      />
                    </View>
                    <Pressable
                      style={alterarSenhaStyle.btnMostrarSenha}
                      onPress={() => setVerConfirmarNovaSenha((current) => !current)}
                    >
                      <Image
                        source={
                          verConfirmarNovaSenha
                            ? require("@/assets/images/img/icones/esconder.png")
                            : require("@/assets/images/img/icones/mostrar.png")
                        }
                        style={alterarSenhaStyle.mostrarSenha}
                      />
                    </Pressable>
                  </View>
                </View>

                {/* Notificações */}
                  <View style={alterarSenhaStyle.itemOpcao}>
                    <Image
                      style={alterarSenhaStyle.iconeOpcao}
                      source={require("@/assets/images/img/icones/info.png")}
                    />
                    <View style={alterarSenhaStyle.areaTextoOpcao}>
                      <Text style={alterarSenhaStyle.tituloOpcao}>Dicas para uma senha segura</Text>

                      <Text style={alterarSenhaStyle.descricaoOpcao}>
                        {"\u2022"} Use pelo menos 8 caracteres
                      </Text>
                      <Text style={alterarSenhaStyle.descricaoOpcao}>
                        {"\u2022"} Combine letras e números
                      </Text>
                    </View>

                  </View>

                {/* Sair */}
                <Pressable
                  style={alterarSenhaStyle.btnSalvar}
                  onPress={() => router.replace("/config")}
                >
                  <Text style={alterarSenhaStyle.txtSalvar}>
                    Salvar nova senha
                  </Text>
                </Pressable>

                <Pressable
                  style={alterarSenhaStyle.btnCancelar}
                  onPress={() => router.replace("/config")}
                >
                  <Text style={alterarSenhaStyle.txtCancelar}>Cancelar</Text>
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
