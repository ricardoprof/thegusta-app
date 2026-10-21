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
import esqueciSenhaStyle from "@/styles/esqueciSenhaStyle";

import EnviarLinkModal from "@/components/enviarLinkModal";

export default function EsqueciSenhaScreen() {
  const [modalEnviarLink, setModalEnviarLink] = useState(false);
  
  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/00_fundo.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={esqueciSenhaStyle.conteudo}>
              <Image
                source={require("@/assets/images/img/logo/logo.png")}
                style={globalStyle.logoMaior}
              />
              <Text style={esqueciSenhaStyle.titulo}>Esqueci minha senha</Text>
              <Text style={esqueciSenhaStyle.subtitulo}>
                Informe seu e-mail para receber {"\n"} o link de redefinição
              </Text>
              {/* Formulario */}
              <View style={esqueciSenhaStyle.form}>
                <View style={esqueciSenhaStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/email.png")}
                    style={esqueciSenhaStyle.icone}
                  />
                  <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#888888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={esqueciSenhaStyle.textInput}
                  />
                </View>

                <Pressable
                  style={({ pressed }) => [
                    esqueciSenhaStyle.btnEnviar,
                    pressed && esqueciSenhaStyle.btnEnviarPressed,
                  ]}
                  onPress={() => setModalEnviarLink(true)}
                >
                  <Text style={esqueciSenhaStyle.textoEnviar}>Enviar link</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    esqueciSenhaStyle.btnLogin,
                    pressed && esqueciSenhaStyle.btnLoginPressed,
                  ]}
                  onPress={() => router.navigate("/")}
                >
                  <Text style={esqueciSenhaStyle.textoLogin}>
                    Voltar ao login
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          <EnviarLinkModal
            visible={modalEnviarLink}
            onClose={() => {router.navigate('/'); setModalEnviarLink(false);}}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
