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
import redefinirSenhaStyle from "@/styles/redefinirSenhaStyle";

export default function RedefinirSenhaScreen() {
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/00_fundo.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={redefinirSenhaStyle.conteudo}>
              <Image
                source={require("@/assets/images/img/logo/logo.png")}
                style={globalStyle.logoMaior}
              />
              <Text style={redefinirSenhaStyle.titulo}>Redefinir senha</Text>
              <Text style={redefinirSenhaStyle.subtitulo}>
                Crie uma nova senha para acessar {"\n"} sua conta
              </Text>
              {/* Formulario */}
              <View style={redefinirSenhaStyle.form}>
                <View style={redefinirSenhaStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/senha.png")}
                    style={redefinirSenhaStyle.icone}
                  />
                  <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#888888"
                    style={redefinirSenhaStyle.textInput}
                    secureTextEntry={!verSenha}
                  />
                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() => setVerSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verSenha
                          ? require("@/assets/images/img/icones/esconder.png")
                          : require("@/assets/images/img/icones/mostrar.png")
                      }
                      style={redefinirSenhaStyle.mostrarSenha}
                    />
                  </Pressable>
                </View>

                <View style={redefinirSenhaStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/senha.png")}
                    style={redefinirSenhaStyle.icone}
                  />
                  <TextInput
                    placeholder="Confirmar a senha"
                    placeholderTextColor="#888888"
                    style={redefinirSenhaStyle.textInput}
                    secureTextEntry={!verConfirmarSenha}
                  />                  
                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() => setVerConfirmarSenha((current) => !current)}
                  >
                  <Text style={redefinirSenhaStyle.mostrarSenha}>{verConfirmarSenha ? "🙉" : "🙈" }</Text>
                    
                  </Pressable>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    redefinirSenhaStyle.btnSalvar,
                    pressed && redefinirSenhaStyle.btnSalvarPressed,
                  ]}
                  onPress={() => router.navigate("/")}
                >
                  <Text style={redefinirSenhaStyle.textoSalvar}>Salvar senha</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    redefinirSenhaStyle.btnLogin,
                    pressed && redefinirSenhaStyle.btnLoginPressed,
                  ]}
                  onPress={() => router.navigate("/")}
                >
                  <Text style={redefinirSenhaStyle.textoLogin}>
                    Voltar ao login
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
