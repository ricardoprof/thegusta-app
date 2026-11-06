import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";
import globalStyle from "@/styles/globalStyle";
import enderecosStyle from "@/styles/enderecosStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

import { API } from "@/config/api";

type Endereco = {
  id_endereco: number;
  nome_endereco: string;
  endereco: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  principal_endereco: "SIM" | "NAO";
};

export default function EnderecosScreen() {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const carregarEnderecos = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Sessão expirada. Faça login novamente.");
      const resposta = await fetch(`${API}/enderecos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await resposta.json();
      if (!resposta.ok || !json.success || !Array.isArray(json.data)) {
        throw new Error(
          json.message || "Não foi possível listar os endereços.",
        );
      }
      setEnderecos(json.data);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar endereços.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarEnderecos();
    }, [carregarEnderecos]),
  );

  async function excluirEndereco(id: number) {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Sessão expirada.");
      const resposta = await fetch(`${API}/enderecos/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Algumas APIs retornam 204 sem corpo JSON.
      const json =
        resposta.status === 204 ? { success: true } : await resposta.json();
      if (!resposta.ok || !json.success) {
        throw new Error(json.message || "Não foi possível excluir.");
      }
      await carregarEnderecos();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao excluir.");
    }
  }
  function confirmarExclusao(id: number) {
    Alert.alert("Excluir endereço", "Deseja excluir este endereço?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          void excluirEndereco(id);
        },
      },
    ]);
  }

  async function definirPrincipal(id: number) {
    const atual = enderecos.find((e) => e.id_endereco === id);
    if (atual?.principal_endereco === "SIM") return;
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Sessão expirada.");
      // EXEMPLO HIPOTÉTICO — verificar endpoint oficial:
      const resposta = await fetch(`${API}/enderecos/${id}/principal`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await resposta.json();
      if (!resposta.ok || !json.success) {
        throw new Error(
          json.message || "Não foi possível definir o endereço principal.",
        );
      }
      await carregarEnderecos();
    } catch (e) {
      setErro(
        e instanceof Error ? e.message : "Erro ao alterar endereço principal.",
      );
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
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={enderecosStyle.conteudo}>
              <View style={enderecosStyle.header}>
                <View style={enderecosStyle.conteudoHeader}>
                  <Text style={enderecosStyle.titulo}>Endereços</Text>
                  <Image
                    style={enderecosStyle.logo}
                    source={require("@/assets/images/img/logo/logo.png")}
                  />
                </View>
                <Text style={enderecosStyle.subtitulo}>
                  Gerencie seus endereços de entrega
                </Text>
              </View>

              <View style={enderecosStyle.main}>
                {carregando && <Text>Carregando endereços...</Text>}
                {!!erro && <Text>{erro}</Text>}
                {!carregando && !erro && enderecos.length === 0 && (
                  <Text>Nenhum endereço cadastrado.</Text>
                )}
                {enderecos.map((item) => (
                  <View
                    style={enderecosStyle.areaEndereco}
                    key={item.id_endereco}
                  >
                    <View style={enderecosStyle.endereco}>
                      <View style={enderecosStyle.areaIcone}>
                        <Image
                          style={enderecosStyle.icone}
                          source={require("@/assets/images/img/icones/home.png")}
                          resizeMode="stretch"
                        />
                      </View>
                      <View style={enderecosStyle.infoEndereco}>
                        <Text style={enderecosStyle.nomeEndereco}>
                          {item.nome_endereco}
                        </Text>
                        <Text style={enderecosStyle.localCompleto}>
                          {item.endereco}, {item.numero}
                          {item.complemento ? ` - ${item.complemento}` : ""}
                        </Text>
                        <Text style={enderecosStyle.localCompleto}>
                          {item.bairro} - {item.cidade} - {item.uf}
                        </Text>
                        <Text style={enderecosStyle.localCompleto}>
                          CEP: {item.cep}
                        </Text>
                      </View>
                      <Pressable
                        style={enderecosStyle.btnFavorito}
                        onPress={() => definirPrincipal(item.id_endereco)}
                      >
                        <Text
                          style={
                            item.principal_endereco === "SIM"
                              ? enderecosStyle.iconeFavoritoAtivo
                              : enderecosStyle.iconeFavoritoInativo
                          }
                        >
                          {item.principal_endereco === "SIM" ? "★" : "☆"}
                        </Text>
                        <Text
                          style={
                            item.principal_endereco === "SIM"
                              ? enderecosStyle.txtFavoritoAtivo
                              : enderecosStyle.txtFavoritoInativo
                          }
                        >
                          {item.principal_endereco === "SIM"
                            ? "Endereço ativo"
                            : "Usar este endereço"}
                        </Text>
                      </Pressable>
                    </View>
                    <View style={globalStyle.separador}></View>
                    <View style={enderecosStyle.botoes}>
                      <Pressable
                        style={enderecosStyle.btnEditar}
                        onPress={() =>
                          router.push({
                            pathname: "/editar-endereco",
                            params: { id: String(item.id_endereco) },
                          })
                        }
                      >
                        <Text style={enderecosStyle.txtEditar}>Editar</Text>
                      </Pressable>
                      <Pressable
                        style={enderecosStyle.btnExcluir}
                        onPress={() => confirmarExclusao(item.id_endereco)}
                      >
                        <Text style={enderecosStyle.txtExcluir}>Excluir</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}

                <Pressable
                  style={enderecosStyle.btnCadastrar}
                  onPress={() => router.push("/editar-endereco")}
                >
                  <Text style={enderecosStyle.txtCadastrar}>
                    + Cadastrar endereço
                  </Text>
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
