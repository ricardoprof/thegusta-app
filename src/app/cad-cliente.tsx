import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { API } from "@/config/api";

export default function CadClienteScreen() {
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [aceitarTermos, setAceitarTermos] = useState(false);

  const [modalTermosUso, setModalTermosUso] = useState(false);

  // Dados do cadastro
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Controle do formulário
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function nomeDoDispositivo() {
    let id = await AsyncStorage.getItem("device_id");

    if (!id) {
      id = `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      await AsyncStorage.setItem("device_id", id);
    }

    return id;
  }

  async function cadastrar() {
    // Verificar campos obrigatórios
    if (
      !nome.trim() ||
      !email.trim() ||
      !telefone.trim() ||
      !senha ||
      !confirmarSenha
    ) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    // Verificar tamanho da senha
    if (senha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    // Verificar confirmação da senha
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não correspondem.");
      return;
    }

    // Verificar aceite dos termos
    if (!aceitarTermos) {
      setMensagem("Aceite os termos de uso para continuar.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch(`${API}/auth/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          telefone: telefone.trim(),
          senha: senha,
          aceite_termo: aceitarTermos,
          device_name: await nomeDoDispositivo(),
        }),
      });

      const json = await resposta.json();

      // Verificar erros retornados pela API
      if (!resposta.ok || !json.success) {
        setMensagem(json.message || "Erro ao cadastrar cliente.");
        return;
      }

      // Salvar os dados retornados pela API
      await AsyncStorage.setItem("token", json.data.token);

      await AsyncStorage.setItem("cliente", JSON.stringify(json.data.cliente));

      // Direcionar para a Home
      router.replace("/home");
    } catch (erro) {
      console.log("Erro ao cadastrar cliente:", erro);
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
                    value={nome}
                    onChangeText={setNome}
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
                    value={email}
                    onChangeText={setEmail}
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
                    value={telefone}
                    onChangeText={setTelefone}
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
                    value={senha}
                    onChangeText={setSenha}
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
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
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

                {mensagem ? (
                  <Text style={cadClienteStyle.erroCadastro}>{mensagem}</Text>
                ) : null}

                <Pressable
                  style={({ pressed }) => [
                    cadClienteStyle.btnCriar,
                    pressed && cadClienteStyle.btnCriarPressed,
                  ]}
                  onPress={cadastrar}
                  disabled={carregando}
                >
                  <Text style={cadClienteStyle.textoCriar}>
                    {carregando ? "Cadastrando..." : "Criar conta"}
                  </Text>
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
                  <Text style={cadClienteStyle.textoTenhoConta}>
                    Já tenho conta
                  </Text>
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
