import { useState, useCallback } from "react";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
import { API } from "@/config/api";

export default function EditarEnderecoScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const idEndereco = id ? Number(id) : null;
  const editando =
    idEndereco !== null && Number.isInteger(idEndereco) && idEndereco > 0;
  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [principal, setPrincipal] = useState<"SIM" | "NAO">("NAO");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const carregarEdicao = useCallback(async () => {
    if (!editando) return;
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Sessão expirada.");
      const resposta = await fetch(`${API}/enderecos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await resposta.json();
      if (!resposta.ok || !json.success || !Array.isArray(json.data)) {
        throw new Error(json.message || "Falha ao consultar endereços.");
      }
      const item = json.data.find(
        (e: any) => Number(e.id_endereco) === idEndereco,
      );
      if (!item) throw new Error("Endereço não encontrado.");
      setNome(item.nome_endereco ?? "");
      setLogradouro(item.endereco ?? "");
      setNumero(String(item.numero ?? ""));
      setComplemento(item.complemento ?? "");
      setBairro(item.bairro ?? "");
      setCidade(item.cidade ?? "");
      setUf(item.uf ?? "");
      setCep(item.cep ?? "");
      setPrincipal(item.principal_endereco === "SIM" ? "SIM" : "NAO");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Falha ao carregar endereço.");
    }
  }, [editando, idEndereco]);

  useFocusEffect(
    useCallback(() => {
      carregarEdicao();
    }, [carregarEdicao]),
  );

  async function salvarEndereco() {
    if (salvando) return;
    console.log("DADOS DO ENDEREÇO:", {
      nome,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
    });
    if (
      !nome.trim() ||
      !logradouro.trim() ||
      !numero.trim() ||
      !bairro.trim() ||
      !cidade.trim() ||
      !/^[A-Z]{2}$/.test(uf) ||
      !/^\d{8}$/.test(cep.replace(/\D/g, ""))
    ) {
      setErro(
        "Preencha nome, endereço, número, bairro, cidade, UF e CEP válido.",
      );
      return;
    }
    setSalvando(true);
    setErro("");
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Sessão expirada. Faça login novamente.");
      const corpo = editando
        ? {
            nome_endereco: nome.trim(),
            endereco: logradouro.trim(),
            numero: numero.trim(),
            complemento: complemento.trim() || null,
            bairro: bairro.trim(),
            cidade: cidade.trim(),
            uf: uf.trim(),
          }
        : {
            nome_endereco: nome.trim(),
            endereco: logradouro.trim(),
            numero: numero.trim(),
            complemento: complemento.trim() || null,
            bairro: bairro.trim(),
            cidade: cidade.trim(),
            uf: uf.trim(),
            cep: cep.replace(/\D/g, ""),
          };
      const url = editando
        ? `${API}/enderecos/${idEndereco}`
        : `${API}/enderecos`;
      const resposta = await fetch(url, {
        method: editando ? "PATCH" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(corpo),
      });
      const json = await resposta.json();

      console.log("STATUS HTTP:", resposta.status);
      console.log("URL:", url);
      console.log("MÉTODO:", editando ? "PATCH" : "POST");
      console.log("DADOS ENVIADOS:", corpo);
      console.log("RESPOSTA DA API:", json);

      if (!resposta.ok || !json.success) {
        throw new Error(json.message || "Não foi possível salvar o endereço.");
      }
      router.replace("/enderecos");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao salvar endereço.");
    } finally {
      setSalvando(false);
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

                <Text style={editarEnderecoStyle.titulo}>
                  {editando ? "Editar endereço" : "Cadastrar endereço"}
                </Text>

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
                        placeholderTextColor={cores.cinza}
                        value={nome}
                        onChangeText={setNome}
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
                        placeholder="Rua ou avenida"
                        placeholderTextColor={cores.cinza}
                        value={logradouro}
                        onChangeText={setLogradouro}
                      />
                    </View>
                  </View>

                  <View style={editarEnderecoStyle.areaTexto}>
                    <Image
                      style={editarEnderecoStyle.icone}
                      source={require("@/assets/images/img/icones/local.png")}
                    />
                    <View style={editarEnderecoStyle.input}>
                      <Text style={editarEnderecoStyle.tituloCaixa}>
                        Número
                      </Text>
                      <TextInput
                        style={editarEnderecoStyle.txtCaixa}
                        placeholder="0000"
                        placeholderTextColor={cores.cinza}
                        value={numero}
                        onChangeText={setNumero}
                      />
                    </View>
                  </View>
                  <View style={editarEnderecoStyle.areaTexto}>
                    <Image
                      style={editarEnderecoStyle.icone}
                      source={require("@/assets/images/img/icones/local.png")}
                    />
                    <View style={editarEnderecoStyle.input}>
                      <Text style={editarEnderecoStyle.tituloCaixa}>
                        Complemento (opcional)
                      </Text>
                      <TextInput
                        style={editarEnderecoStyle.txtCaixa}
                        placeholder="Apto / bloco"
                        placeholderTextColor={cores.cinza}
                        value={complemento}
                        onChangeText={setComplemento}
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
                        placeholder="Bairro"
                        placeholderTextColor={cores.cinza}
                        style={editarEnderecoStyle.txtCaixa}
                        value={bairro}
                        onChangeText={setBairro}
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
                      <Text style={editarEnderecoStyle.tituloCaixa}>
                        Cidade
                      </Text>

                      <TextInput
                        placeholder="Cidade"
                        placeholderTextColor={cores.cinza}
                        style={editarEnderecoStyle.txtCaixa}
                        value={cidade}
                        onChangeText={setCidade}
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
                      <Text style={editarEnderecoStyle.tituloCaixa}>UF</Text>

                      <TextInput
                        placeholder="UF"
                        placeholderTextColor={cores.cinza}
                        style={editarEnderecoStyle.txtCaixa}
                        value={uf}
                        onChangeText={(t) => setUf(t.toUpperCase().slice(0, 2))}
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
                      <Text style={editarEnderecoStyle.tituloCaixa}>CEP</Text>

                      <TextInput
                        placeholder="CEP"
                        placeholderTextColor={cores.cinza}
                        style={editarEnderecoStyle.txtCaixa}
                        value={cep}
                        onChangeText={(t) =>
                          setCep(t.replace(/\D/g, "").slice(0, 8))
                        }
                        editable={!editando}
                        selectTextOnFocus={!editando}
                      />
                    </View>
                  </View>
                </View>

                {/* Sair */}
                <Pressable
                  style={editarEnderecoStyle.btnSalvar}
                  onPress={salvarEndereco}
                  disabled={salvando}
                >
                  <Text style={editarEnderecoStyle.txtSalvar}>
                    {salvando ? "Salvando..." : "Salvar endereço"}
                  </Text>
                </Pressable>
                {!!erro && <Text>{erro}</Text>}
                <Pressable
                  style={editarEnderecoStyle.btnCancelar}
                  onPress={() => router.back()}
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
