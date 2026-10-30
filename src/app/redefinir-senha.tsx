import { useState, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";

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

import { API } from "@/config/api";
import { cores } from "@/styles/variaveis";

export default function RedefinirSenhaScreen() {
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

  const { email } = useLocalSearchParams<{ email?: string }>();
  const [codigo, setCodigo] = useState(["", "", "", ""]);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const camposCodigo = useRef<Array<TextInput | null>>([]);

  function alterarDigito(texto: string, indice: number) {
    const digito = texto.replace(/\D/g, "").slice(-1);
    setCodigo((atual) =>
      atual.map((item, i) => (i === indice ? digito : item)),
    );
    if (digito && indice < 3) camposCodigo.current[indice + 1]?.focus();
  }

  function voltarDigito(indice: number, tecla: string) {
    if (tecla === "Backspace" && !codigo[indice] && indice > 0) {
      camposCodigo.current[indice - 1]?.focus();
    }
  }

  async function salvarNovaSenha() {
    const codigoCompleto = codigo.join("");
    if (!email || typeof email !== "string") {
      setMensagem("E-mail não informado. Solicite um novo código.");
      return;
    }
    if (!/^\d{4}$/.test(codigoCompleto)) {
      setMensagem("Informe os 4 dígitos do código.");
      return;
    }
    if (!novaSenha || !confirmarSenha) {
      setMensagem("Preencha os campos de senha.");
      return;
    }
    if (novaSenha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não correspondem.");
      return;
    }

    setCarregando(true);
    setMensagem("");
    try {
      const respostaCodigo = await fetch(`${API}/auth/validar-codigo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email.trim(), codigo: codigoCompleto }),
      });
      const jsonCodigo = await respostaCodigo.json();
      if (!respostaCodigo.ok || !jsonCodigo.success) {
        setMensagem(jsonCodigo.message || "Código inválido ou expirado.");
        return;
      }
      const resetToken = jsonCodigo.data?.reset_token;
      if (!resetToken) {
        setMensagem("Token de redefinição não recebido.");
        return;
      }

      const respostaSenha = await fetch(`${API}/auth/redefinir-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          reset_token: resetToken,
          nova_senha: novaSenha,
          nova_senha_confirmation: confirmarSenha,
        }),
      });
      const jsonSenha = await respostaSenha.json();
      if (!respostaSenha.ok || !jsonSenha.success) {
        setMensagem(jsonSenha.message || "Não foi possível redefinir a senha.");
        return;
      }
      router.replace("/");
    } catch (erro) {
      console.log("Erro ao redefinir senha:", erro);
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
                <Text style={redefinirSenhaStyle.subtitulo}>
                  Código de verificação
                </Text>
                <View style={redefinirSenhaStyle.linhaCodigo}>
                  {codigo.map((digito, indice) => (
                    <TextInput
                      key={indice}
                      ref={(ref) => {
                        camposCodigo.current[indice] = ref;
                      }}
                      style={redefinirSenhaStyle.campoCodigo}
                      value={digito}
                      onChangeText={(texto) => alterarDigito(texto, indice)}
                      onKeyPress={({ nativeEvent }) =>
                        voltarDigito(indice, nativeEvent.key)
                      }
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                      textAlign="center"
                    />
                  ))}
                </View>

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
                    value={novaSenha}
                    onChangeText={setNovaSenha}
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
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                  />
                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() => setVerConfirmarSenha((current) => !current)}
                  >
                    <Text style={redefinirSenhaStyle.mostrarSenha}>
                      {verConfirmarSenha ? "🙉" : "🙈"}
                    </Text>
                  </Pressable>
                </View>

                {mensagem ? (
                  <Text style={redefinirSenhaStyle.erroSenha}>{mensagem}</Text>
                ) : null}

                <Pressable
                  style={({ pressed }) => [
                    redefinirSenhaStyle.btnSalvar,
                    pressed && redefinirSenhaStyle.btnSalvarPressed,
                  ]}
                  onPress={salvarNovaSenha}
                  disabled={carregando}
                >
                  <Text style={redefinirSenhaStyle.textoSalvar}>
                    {carregando ? "Salvando..." : "Salvar senha"}
                  </Text>
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
