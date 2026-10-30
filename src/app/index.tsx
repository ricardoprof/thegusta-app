import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import loginStyle from "@/styles/loginStyle";

import { API } from "@/config/api";

export default function LoginScreen() {
  const [verSenha, setVerSenha] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function mostrarMensagem(texto: string) {
    setMensagem(texto);

    setTimeout(() => {
      setMensagem("");
    }, 5000);
  }

  async function nomeDoDispositivo() {
    let id = await AsyncStorage.getItem("device_id");
    if (!id) {
      id = `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await AsyncStorage.setItem("device_id", id);
    }
    return id;
  }

  async function fazerLogin() {
    if (!email.trim() || !senha) {
      mostrarMensagem("Informe e-mail e senha.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          senha: senha,
          device_name: await nomeDoDispositivo(),
        }),
      });

      const json = await resposta.json();

      // 401 senha errada | 403 inativo | 422 campos | 429 tentativas
      if (!resposta.ok || !json.success) {
        mostrarMensagem(json.message);
        return;
      }

      await AsyncStorage.setItem("token", json.data.token);

      router.replace("/home");
    } catch (erro) {
      console.log("Erro ao realizar login:", erro);
      mostrarMensagem("Não foi possível conectar ao servidor.");
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
            <View style={loginStyle.conteudo}>
              <Image
                source={require("@/assets/images/img/logo/logo.png")}
                style={loginStyle.logo}
              />
              <Text style={loginStyle.titulo}>Bem-vindo(a)!</Text>
              <Text style={loginStyle.subtitulo}>
                Faça seu login para continuar
              </Text>
              {/* Formulario */}
              <View style={loginStyle.form}>
                <View style={loginStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/email.png")}
                    style={loginStyle.icone}
                  />
                  <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#888888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={loginStyle.textInput}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={loginStyle.input}>
                  <Image
                    source={require("@/assets/images/img/icones/senha.png")}
                    style={loginStyle.icone}
                  />
                  <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#888888"
                    style={loginStyle.textInput}
                    secureTextEntry={!verSenha}
                    value={senha}
                    onChangeText={setSenha}
                  />
                  <Pressable
                    style={loginStyle.btnMostrarSenha}
                    onPress={() => setVerSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verSenha
                          ? require("@/assets/images/img/icones/esconder.png")
                          : require("@/assets/images/img/icones/mostrar.png")
                      }
                      style={loginStyle.mostrarSenha}
                    />
                  </Pressable>
                </View>

                <Pressable
                  style={loginStyle.btnEsqueciSenha}
                  onPress={() => router.navigate("/esqueci-senha")}
                >
                  <Text style={loginStyle.txtEsqueciSenha}>
                    Esqueci minha senha
                  </Text>
                </Pressable>

                {mensagem ? (
                  <Text style={loginStyle.erroLogin}>{mensagem}</Text>
                ) : null}

                <Pressable
                  style={({ pressed }) => [
                    loginStyle.btnEntrar,
                    pressed && loginStyle.btnEntrarPressed,
                  ]}
                  onPress={fazerLogin}
                  disabled={carregando}
                >
                  <Text style={loginStyle.textoEntrar}>Entrar</Text>
                </Pressable>

                <View style={loginStyle.separador}>
                  <View style={loginStyle.linha}></View>
                  <Text style={loginStyle.textoSeparador}>ou</Text>
                  <View style={loginStyle.linha}></View>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    loginStyle.btnCriar,
                    pressed && loginStyle.btnCriarPressed,
                  ]}
                  onPress={() => router.navigate("/cad-cliente")}
                >
                  <Text style={loginStyle.textoCriar}>Criar conta</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
