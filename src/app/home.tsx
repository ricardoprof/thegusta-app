import { useState, useEffect, useRef, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
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
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import homeStyle from "@/styles/homeStyle";

import { cores } from "@/styles/variaveis";

import FooterScreen from "@/app/footer";

import { API, IMAGEM } from "@/config/api";

export default function HomeScreen() {
  const [cliente, setCliente] = useState<any>(null);

  const [produtos, setProdutos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [banner, setBanner] = useState<any>(null);

  const [mensagemFavorito, setMensagemFavorito] = useState("");
  const [processandoFavoritos, setProcessandoFavoritos] = useState<number[]>(
    [],
  );
  const bloqueiosFavoritos = useRef<Set<number>>(new Set());

  const [produtosEmDestaque, setProdutosEmDestaque] = useState<any[]>([]);
  //Carregar as informações da API
  useEffect(() => {
    async function carregarCliente() {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          router.replace("/");
          return;
        }

        const resposta = await fetch(`${API}/cliente`, {
          // method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await resposta.json();

        // 401: "Sessão expirada. Faça login novamente."
        if (!resposta.ok) {
          console.log("Erro ao carregar cliente:", json.message);
          return;
        }

        setCliente(json.data);
      } catch (erro) {
        console.log("Erro ao carregar cliente:", erro);
      }
    }
    carregarCliente();

    async function carregarCategorias() {
      try {
        const resposta = await fetch(`${API}/categorias`);
        const json = await resposta.json();
        const categoriasAtivas = json.data
          .filter((categoria: any) => categoria.status_categoria === "ATIVO")
          .sort((a: any, b: any) => a.ordem_categoria - b.ordem_categoria);
        setCategorias(categoriasAtivas);
      } catch (erro) {
        console.log("Erro ao carregar as categorias", erro);
      }
    }
    carregarCategorias();

    async function carregarBanner() {
      try {
        const resposta = await fetch(`${API}/banners`);
        const json = await resposta.json();
        console.log("Resposta da API:", json);
        console.log("Endereço base das imagens:", IMAGEM);
        console.log(
          "URL final do banner:",
          `${IMAGEM}/${json.data[0]?.foto_banner}`,
        );
        const bannersAtivos = json.data.filter(
          (banner: any) => banner.status_banner === "ATIVO",
        );
        bannersAtivos.forEach((banner: any) => {
          console.log(
            "Banner:",
            banner.nome_banner,
            "URL:",
            `${IMAGEM}/${banner.foto_banner}`,
          );
        });

        if (bannersAtivos.length > 0) {
          const indiceAleatorio = Math.floor(
            Math.random() * bannersAtivos.length,
          );
          setBanner(bannersAtivos[indiceAleatorio]);
        }
      } catch (erro) {
        console.log("Erro ao carregar o banner", erro);
      }
    }
    carregarBanner();
  }, []);

  const carregarProdutosEFavoritos = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/");
        return;
      }

      const respostaProdutos = await fetch(`${API}/produtos`);
      const jsonProdutos = await respostaProdutos.json();
      if (
        !respostaProdutos.ok ||
        !jsonProdutos.success ||
        !Array.isArray(jsonProdutos.data)
      ) {
        setMensagemFavorito("Não foi possível carregar os produtos.");
        return;
      }

      const respostaFavoritos = await fetch(`${API}/favoritos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonFavoritos = await respostaFavoritos.json();
      if (
        !respostaFavoritos.ok ||
        !jsonFavoritos.success ||
        !Array.isArray(jsonFavoritos.data)
      ) {
        setMensagemFavorito("Não foi possível carregar seus favoritos.");
        return;
      }

      const idsFavoritos = new Set<number>(
        jsonFavoritos.data.map((item: any) => Number(item.id_produto)),
      );

      const produtosAtivos = jsonProdutos.data
        .filter((produto: any) => produto.status_produto === "ATIVO")
        .map((produto: any) => ({
          ...produto,
          favorito: idsFavoritos.has(Number(produto.id_produto)),
        }))
        .sort((a: any, b: any) =>
          a.nome_produto.localeCompare(b.nome_produto, "pt-BR"),
        );

      setProdutos(produtosAtivos);
      setProdutosEmDestaque(
        produtosAtivos.filter(
          (produto: any) => produto.destaque_produto === "SIM",
        ),
      );
      setMensagemFavorito("");
    } catch (erro) {
      console.log("Erro ao carregar produtos/favoritos:", erro);
      setMensagemFavorito("Não foi possível conectar ao servidor.");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarProdutosEFavoritos();
    }, [carregarProdutosEFavoritos]),
  );

  const [textoBusca, setTextoBusca] = useState("");

  const categoriasComProdutos = categorias.filter((categoria) =>
    produtos.some(
      (produto) =>
        produto.categoria_produto.id_categoria === categoria.id_categoria,
    ),
  );

  const [semImagem, setSemImagem] = useState<number[]>([]);

  // const [produtosDestaque, setProdutosDestaque] = useState([
  //   {
  //     id: 1,
  //     nome: "Bolo de banana fit",
  //     descricao: "Banana prata com canela e gergilim",
  //     categoria: "Bolos",
  //     valor: "18,80",
  //     imagem: require("@/assets/images/img/produtos/bolo01.png"),
  //     status: "ativo",
  //     favorito: false,
  //   },
  //   {
  //     id: 2,
  //     nome: "Bolo de chocolate",
  //     descricao: "Chocolate com cobertura cremosa",
  //     categoria: "Bolos",
  //     valor: "21,80",
  //     imagem: require("@/assets/images/img/produtos/bolo01.png"),
  //     status: "ativo",
  //     favorito: false,
  //   },
  //   {
  //     id: 3,
  //     nome: "Bolo de Cenoura",
  //     descricao: "Cenoura com cobertura de chocolate",
  //     categoria: "Bolos",
  //     valor: "19,80",
  //     imagem: require("@/assets/images/img/produtos/bolo01.png"),
  //     status: "ativo",
  //     favorito: false,
  //   },
  //   {
  //     id: 4,
  //     nome: "Brigadeiro Gourmet",
  //     descricao: "Brigadeiro de chocolate com cobertura de chantily",
  //     categoria: "Doces",
  //     valor: "6,80",
  //     imagem: require("@/assets/images/img/produtos/bolo01.png"),
  //     status: "ativo",
  //     favorito: false,
  //   },
  // ]);

  async function alterarFavorito(id: number) {
    if (bloqueiosFavoritos.current.has(id)) return;

    const produto = produtosEmDestaque.find(
      (item) => Number(item.id_produto) === Number(id),
    );
    if (!produto) return;

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      setMensagemFavorito("Faça login para salvar seus favoritos.");
      return;
    }

    bloqueiosFavoritos.current.add(id);
    setProcessandoFavoritos((atual) => [...atual, id]);
    setMensagemFavorito("");

    try {
      const estavaFavorito = Boolean(produto.favorito);
      const resposta = await fetch(
        estavaFavorito ? `${API}/favoritos/${id}` : `${API}/favoritos`,
        {
          method: estavaFavorito ? "DELETE" : "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            ...(!estavaFavorito ? { "Content-Type": "application/json" } : {}),
          },
          ...(!estavaFavorito
            ? { body: JSON.stringify({ id_produto: id }) }
            : {}),
        },
      );
      const json = await resposta.json();
      if (!resposta.ok || !json.success) {
        setMensagemFavorito(
          json.message || "Não foi possível atualizar o favorito.",
        );
        return;
      }

      const atualizar = (atual: any[]) =>
        atual.map((item) =>
          Number(item.id_produto) === Number(id)
            ? { ...item, favorito: !estavaFavorito }
            : item,
        );
      setProdutos(atualizar);
      setProdutosEmDestaque(atualizar);
    } catch (erro) {
      console.log("Erro ao alterar favorito:", erro);
      setMensagemFavorito("Não foi possível conectar ao servidor.");
    } finally {
      bloqueiosFavoritos.current.delete(id);
      setProcessandoFavoritos((atual) => atual.filter((item) => item !== id));
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
            <View style={homeStyle.conteudo}>
              <View style={homeStyle.header}>
                <View style={homeStyle.conteudoHeader}>
                  <Text style={homeStyle.titulo}>
                    Olá, {cliente?.nome_cliente ?? "Cliente"}!
                  </Text>
                  <View style={homeStyle.bordaPerfil}>
                    <Image
                      style={homeStyle.perfil}
                      source={
                        cliente?.foto_cliente
                          ? { uri: `${IMAGEM}/${cliente?.foto_cliente}` }
                          : {
                              uri:
                                `${IMAGEM}/cliente/user.png` ||
                                require("@/assets/images/img/icones/user.png"),
                            }
                      }
                    />
                  </View>
                </View>
                <Text style={homeStyle.subtitulo}>
                  O que vai adoçar o seu dia hoje?
                </Text>
              </View>
              <View style={homeStyle.main}>
                {mensagemFavorito ? (
                  <Text
                    style={{
                      color: "#B42318",
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    {mensagemFavorito}
                  </Text>
                ) : null}

                <View style={homeStyle.buscarProduto}>
                  <TextInput
                    style={homeStyle.txtProduto}
                    placeholder="Buscar produto"
                    placeholderTextColor={cores.cinza}
                    value={textoBusca}
                    onChangeText={setTextoBusca}
                  />
                  <Pressable
                    style={homeStyle.btnBuscar}
                    onPress={() =>
                      router.push({
                        pathname: "/cardapio",
                        params: {
                          busca: textoBusca,
                        },
                      })
                    }
                  >
                    <Image
                      style={homeStyle.imgBuscar}
                      source={require("@/assets/images/img/icones/lupa.png")}
                    />
                  </Pressable>
                </View>

                {banner && (
                  <Image
                    style={homeStyle.banner}
                    source={{ uri: `${IMAGEM}/${banner.foto_banner}` }}
                    resizeMode="stretch"
                  />
                )}

                <View style={homeStyle.categoria}>
                  <Text style={homeStyle.tituloSecao}>Categoria</Text>

                  <View style={homeStyle.conteudoCategoria}>
                    {categoriasComProdutos.map((categoria) => (
                      <Pressable
                        key={categoria.id_categoria}
                        style={homeStyle.itemCategoria}
                        onPress={() =>
                          router.push({
                            pathname: "/cardapio",
                            params: {
                              categoria: categoria.id_categoria.toString(),
                            },
                          })
                        }
                      >
                        <Text style={homeStyle.txtCategoria}>
                          {categoria.nome_categoria}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <View style={homeStyle.destaque}>
                  <Text style={homeStyle.tituloSecao}>Destaque</Text>
                  {produtosEmDestaque.length > 0 ? (
                    <ScrollView
                      contentContainerStyle={homeStyle.conteudoDestaque}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {/* CARD QUE IRÁ SE REPETIR */}
                      {produtosEmDestaque.map((produto) => (
                        <View
                          key={produto.id_produto}
                          style={homeStyle.itemDestaque}
                        >
                          <View style={homeStyle.caixaImagem}>
                            <Image
                              style={homeStyle.imgDestaque}
                              source={
                                semImagem.includes(produto.id_produto) ||
                                !produto.foto_produto
                                  ? { uri: `${IMAGEM}/produto/sem-imagem.png` }
                                  : { uri: `${IMAGEM}/${produto.foto_produto}` }
                              }
                              onError={() => {
                                setSemImagem((imagem) => [
                                  ...imagem,
                                  produto.id_produto,
                                ]);
                              }}
                            />
                            <Pressable
                              style={homeStyle.btnFavorito}
                              onPress={() =>
                                alterarFavorito(produto.id_produto)
                              }
                              disabled={processandoFavoritos.includes(
                                produto.id_produto,
                              )}
                              accessibilityRole="button"
                              accessibilityLabel={
                                produto.favorito
                                  ? "Remover dos favoritos"
                                  : "Adicionar aos favoritos"
                              }
                            >
                              <Text style={homeStyle.iconeFavorito}>
                                {produto.favorito ? "★" : "☆"}
                              </Text>
                            </Pressable>
                          </View>

                          <Text style={homeStyle.nomeProduto}>
                            {produto.nome_produto}
                          </Text>
                          <Text style={homeStyle.descricaoProduto}>
                            {produto.descricao_produto}
                          </Text>
                          <View style={homeStyle.valorContainer}>
                            {/* <Text style={homeStyle.valorProduto}>R$ {Number(produto.valor_produto).toFixed(2).replace(".",",")}</Text> */}

                            <Text style={homeStyle.valorProduto}>
                              {Number(produto.valor_produto).toLocaleString(
                                "pt-BR",
                                { style: "currency", currency: "BRL" },
                              )}
                            </Text>

                            <Pressable
                              style={homeStyle.btnAdicionar}
                              onPress={() =>
                                router.push({
                                  pathname: "/detalhe-produto",
                                  params: {
                                    slug: produto.slug_produto,
                                  },
                                })
                              }
                            >
                              <Image
                                style={homeStyle.imgAdicionar}
                                source={require("@/assets/images/img/icones/mais.png")}
                              />
                            </Pressable>
                          </View>
                        </View>
                      ))}
                      {/* FINAL DO CARD */}
                    </ScrollView>
                  ) : (
                    <View style={homeStyle.semDestaque}>
                      <Text style={homeStyle.txtSemDestaque}>
                        Nenhum produto em destaque
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>

          <FooterScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
