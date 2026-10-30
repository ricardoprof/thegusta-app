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

import { API } from "@/config/api";

export default function EsqueciSenhaScreen() {
  const [modalEnviarLink, setModalEnviarLink] = useState(false);

  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function solicitarCodigo() {
    if (!email.trim()) {
      setMensagem("Informe seu e-mail.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch(`${API}/auth/esqueci-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const json = await resposta.json();

      if (!resposta.ok || !json.success) {
        setMensagem(json.message || "Não foi possível solicitar o código.");
        return;
      }

      setMensagem(
        json.message ||
          "Se o e-mail estiver cadastrado, enviaremos um código de verificação.",
      );
      setModalEnviarLink(true);
    } catch (erro) {
      console.log("Erro ao solicitar código:", erro);
      setMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

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
                Informe seu e-mail para receber {"\n"} o código de redefinição
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
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                {mensagem ? (
                  <Text style={esqueciSenhaStyle.erroSolicitacao}>
                    {mensagem}
                  </Text>
                ) : null}

                <Pressable
                  style={({ pressed }) => [
                    esqueciSenhaStyle.btnEnviar,
                    pressed && esqueciSenhaStyle.btnEnviarPressed,
                  ]}
                  onPress={solicitarCodigo}
                  disabled={carregando}
                >
                  <Text style={esqueciSenhaStyle.textoEnviar}>
                    {carregando ? "Enviando..." : "Enviar código"}
                  </Text>
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
            onClose={() => {
              router.push({
                pathname: "/redefinir-senha",
                params: {
                  email: email.trim(),
                },
              });
              setModalEnviarLink(false);
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
