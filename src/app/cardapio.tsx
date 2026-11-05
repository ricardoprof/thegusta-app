import { useState, useEffect, useRef, useCallback } from "react";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import cardapioStyle from "@/styles/cardapioStyle";
import FooterScreen from "@/app/footer";

import { cores } from "@/styles/variaveis";

import { API, IMAGEM } from "@/config/api";

export default function CardapioScreen() {
  //Estrutura referente Listar Produtos e Categorias
  const [produtos, setProdutos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [semImagem, setSemImagem] = useState<number[]>([]);
  const { categoria, busca: buscaParam } = useLocalSearchParams();

  const [mensagemFavorito, setMensagemFavorito] = useState("");
  const [processandoFavoritos, setProcessandoFavoritos] = useState<number[]>(
    [],
  );
  const bloqueiosFavoritos = useRef<Set<number>>(new Set());

  useEffect(() => {
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
  }, []);

  const carregarProdutosEFavoritos = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
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

      let idsFavoritos = new Set<number>();
      if (token) {
        const respostaFavoritos = await fetch(`${API}/favoritos`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const jsonFavoritos = await respostaFavoritos.json();
        if (
          respostaFavoritos.ok &&
          jsonFavoritos.success &&
          Array.isArray(jsonFavoritos.data)
        ) {
          idsFavoritos = new Set<number>(
            jsonFavoritos.data.map((item: any) => Number(item.id_produto)),
          );
        } else {
          setMensagemFavorito("Não foi possível carregar seus favoritos.");
        }
      }

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

  //Estrutura referente caixa de texto Buscar Produtos
  const [textoBusca, setTextoBusca] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    if (buscaParam) {
      const texto = String(buscaParam);
      setTextoBusca(texto);
      setBusca(texto);
    }
  }, [buscaParam]);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome_produto.toLowerCase().includes(busca.trim().toLowerCase()),
  );

  const categoriasComProdutos = categorias.filter((categoria) =>
    produtosFiltrados.some(
      (produto) =>
        produto.categoria_produto.id_categoria === categoria.id_categoria,
    ),
  );

  const scrollRef = useRef<ScrollView>(null);
  const posicaoCategoria = useRef<{ [key: number]: number }>({});
  const scrollInicialRealizado = useRef(false);

  useEffect(() => {
    if (!categoria || scrollInicialRealizado.current) {
      return;
    }
    const idCategoria = Number(categoria);
    const intervalo = setInterval(() => {
      const posicao = posicaoCategoria.current[idCategoria];
      if (posicao != undefined) {
        scrollRef.current?.scrollTo({
          y: posicao,
          animated: true,
        });
        scrollInicialRealizado.current = true;
        clearInterval(intervalo);
      }
    }, 100);
    return () => clearInterval(intervalo);
  }, [categoria, categorias, produtos]);

  async function alterarFavorito(id: number) {
    if (bloqueiosFavoritos.current.has(id)) return;
    const produto = produtos.find((item) => item.id_produto === id);
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

      setProdutos((atual) =>
        atual.map((item) =>
          item.id_produto === id
            ? { ...item, favorito: !estavaFavorito }
            : item,
        ),
      );
    } catch (erro) {
      console.log("Erro ao alterar favorito:", erro);
      setMensagemFavorito("Não foi possível conectar ao servidor.");
    } finally {
      bloqueiosFavoritos.current.delete(id);
      setProcessandoFavoritos((atual) => atual.filter((item) => item !== id));
    }
  }

  function irParaCategoria(idCategoria: number) {
    const posicao = posicaoCategoria.current[idCategoria];
    if (posicao != undefined) {
      scrollRef.current?.scrollTo({ y: posicao, animated: true });
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
          <ScrollView ref={scrollRef} style={globalStyle.scrollConteudo}>
            <View style={cardapioStyle.conteudo}>
              <View style={cardapioStyle.header}>
                <View style={cardapioStyle.conteudoHeader}>
                  <Text style={cardapioStyle.titulo}>Cardápio</Text>
                  <Image
                    style={cardapioStyle.logo}
                    source={require("@/assets/images/img/logo/logo.png")}
                  />
                </View>
                <Text style={cardapioStyle.subtitulo}>
                  Escolha suas delícias saudáveis
                </Text>
              </View>

              <View style={cardapioStyle.main}>
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

                <View style={cardapioStyle.buscarProduto}>
                  <TextInput
                    style={cardapioStyle.txtProduto}
                    placeholder="Buscar produto"
                    placeholderTextColor={cores.cinza}
                    value={textoBusca}
                    onChangeText={setTextoBusca}
                  />
                  <Pressable
                    style={cardapioStyle.btnBuscar}
                    onPress={() => setBusca(textoBusca)}
                  >
                    <Image
                      style={cardapioStyle.imgBuscar}
                      source={require("@/assets/images/img/icones/lupa.png")}
                    />
                  </Pressable>
                </View>

                <View style={cardapioStyle.conteudoCategoria}>
                  {categoriasComProdutos.map((categoria) => (
                    <Pressable
                      key={categoria.id_categoria}
                      style={cardapioStyle.itemCategoria}
                      onPress={() => irParaCategoria(categoria.id_categoria)}
                    >
                      <Text style={cardapioStyle.txtCategoria}>
                        {categoria.nome_categoria}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {produtosFiltrados.length > 0 ? (
                  categoriasComProdutos.map((categoria) => (
                    <View
                      key={categoria.id_categoria}
                      style={cardapioStyle.categorias}
                      onLayout={(event) => {
                        posicaoCategoria.current[categoria.id_categoria] =
                          event.nativeEvent.layout.y;
                      }}
                    >
                      <Text style={cardapioStyle.tituloCategoria}>
                        {categoria.nome_categoria}
                      </Text>

                      <View style={cardapioStyle.produtos}>
                        {produtosFiltrados
                          .filter(
                            (produto) =>
                              produto.categoria_produto.id_categoria ===
                              categoria.id_categoria,
                          )
                          .map((produto) => (
                            <View
                              key={produto.id_produto}
                              style={cardapioStyle.itemProduto}
                            >
                              <View style={cardapioStyle.caixaImagem}>
                                <Image
                                  style={cardapioStyle.imgDestaque}
                                  resizeMode="stretch"
                                  source={
                                    semImagem.includes(produto.id_produto) ||
                                    !produto.foto_produto
                                      ? {
                                          uri: `${IMAGEM}/produto/sem-imagem.png`,
                                        }
                                      : {
                                          uri: `${IMAGEM}/${produto.foto_produto}`,
                                        }
                                  }
                                  onError={() => {
                                    setSemImagem((imagem) => [
                                      ...imagem,
                                      produto.id_produto,
                                    ]);
                                  }}
                                />
                                <Pressable
                                  style={cardapioStyle.btnFavorito}
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
                                  <Text style={cardapioStyle.iconeFavorito}>
                                    {produto.favorito ? "★" : "☆"}
                                  </Text>
                                </Pressable>
                              </View>

                              <Text style={cardapioStyle.nomeProduto}>
                                {produto.nome_produto}
                              </Text>
                              <Text style={cardapioStyle.descricaoProduto}>
                                {produto.descricao_produto}
                              </Text>
                              <View style={cardapioStyle.valorContainer}>
                                <Text style={cardapioStyle.valorProduto}>
                                  {Number(produto.valor_produto).toLocaleString(
                                    "pt-BR",
                                    { style: "currency", currency: "BRL" },
                                  )}
                                </Text>
                                <Pressable
                                  style={cardapioStyle.btnAdicionar}
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
                                    style={cardapioStyle.imgAdicionar}
                                    source={require("@/assets/images/img/icones/mais.png")}
                                  />
                                </Pressable>
                              </View>
                            </View>
                          ))}
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={cardapioStyle.semProduto}>
                    <Text style={cardapioStyle.txtSemProduto}>
                      Nenhum produto encontrado
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          <FooterScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
