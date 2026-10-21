import { useState } from "react";
import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  Image,
  Text,
  ImageBackground,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import cadClienteStyle from "@/styles/cadClienteStyle";

import TermosUsoModal from "@/components/termosUsoModal";

export default function CadClienteScreen() {
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [aceitarTermos, setAceitarTermos] = useState(false);

  const [modalTermosUso, setModalTermosUso] = useState(false);

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/00_fundo.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={cadClienteStyle.conteudo}>
              <Image
                source={require("@/assets/images/img/logo/logo.png")}
                style={globalStyle.logoMaior}
              />
              <Text style={cadClienteStyle.titulo}>Criar conta</Text>
              <Text style={cadClienteStyle.subtitulo}>
                Cadastre-se para fazer seus pedidos
              </Text>
              {/* Formulario */}
              <View style={cadClienteStyle.form}>
                <View style={cadClienteStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/user.png")}
                    style={cadClienteStyle.icone}
                  />
                  <TextInput
                    placeholder="Nome completo"
                    placeholderTextColor="#888888"
                    style={cadClienteStyle.textInput}
                  />
                </View>

                <View style={cadClienteStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/email.png")}
                    style={cadClienteStyle.icone}
                  />
                  <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#888888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={cadClienteStyle.textInput}
                  />
                </View>

                <View style={cadClienteStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/telefone.png")}
                    style={cadClienteStyle.icone}
                  />
                  <TextInput
                    placeholder="Telefone"
                    placeholderTextColor="#888888"
                    keyboardType="phone-pad"
                    style={cadClienteStyle.textInput}
                  />
                </View>

                <View style={cadClienteStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/senha.png")}
                    style={cadClienteStyle.icone}
                  />
                  <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#888888"
                    style={cadClienteStyle.textInput}
                    secureTextEntry={!verSenha}
                  />
                  <Pressable
                    style={cadClienteStyle.btnMostrarSenha}
                    onPress={() => setVerSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verSenha
                          ? require("@/assets/images/img/icones/esconder.png")
                          : require("@/assets/images/img/icones/mostrar.png")
                      }
                      style={cadClienteStyle.mostrarSenha}
                    />
                  </Pressable>
                </View>

                <View style={cadClienteStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/senha.png")}
                    style={cadClienteStyle.icone}
                  />
                  <TextInput
                    placeholder="Confirmar a senha"
                    placeholderTextColor="#888888"
                    style={cadClienteStyle.textInput}
                    secureTextEntry={!verConfirmarSenha}
                  />
                  <Pressable
                    style={cadClienteStyle.btnMostrarSenha}
                    onPress={() => setVerConfirmarSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verConfirmarSenha
                          ? require("@/assets/images/img/icones/esconder.png")
                          : require("@/assets/images/img/icones/mostrar.png")
                      }
                      style={cadClienteStyle.mostrarSenha}
                    />
                  </Pressable>
                </View>

                <View style={cadClienteStyle.termosUso}>
                  <Pressable
                    style={cadClienteStyle.btnTermos}
                    onPress={() => setAceitarTermos((current) => !current)}
                  >
                    <View
                      style={[
                        cadClienteStyle.checkTermos,
                        aceitarTermos && cadClienteStyle.termoAceito,
                      ]}
                    >
                      {aceitarTermos && (
                        <Text style={cadClienteStyle.checkOk}>✔️</Text>
                      )}
                    </View>
                  </Pressable>
                  <Text style={cadClienteStyle.txtTermos}>Aceito os </Text>
                  <Pressable onPress={() => setModalTermosUso(true)}>
                    <Text style={cadClienteStyle.linkTermos}>
                      termos de uso
                    </Text>
                  </Pressable>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    cadClienteStyle.btnCriar,
                    pressed && cadClienteStyle.btnCriarPressed,
                  ]}
                  onPress={() => router.navigate("/")}
                >
                  <Text style={cadClienteStyle.textoCriar}>Criar conta</Text>
                </Pressable>

                <View style={cadClienteStyle.separador}>
                  <View style={cadClienteStyle.linha}></View>
                  <Text style={cadClienteStyle.textoSeparador}>ou</Text>
                  <View style={cadClienteStyle.linha}></View>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    cadClienteStyle.btnTenhoConta,
                    pressed && cadClienteStyle.btnTenhoContaPressed,
                  ]}
                  onPress={() => router.navigate("/")}
                >
                  <Text style={cadClienteStyle.textoTenhoConta}>Já tenho conta</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          <TermosUsoModal
            visible={modalTermosUso}
            onClose={() => setModalTermosUso(false)}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
