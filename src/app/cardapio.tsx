import { useState, useEffect, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
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

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch(`${API}/produtos`);
        const json = await resposta.json();
        const produtosAtivos = json.data
          .filter((produto: any) => produto.status_produto === "ATIVO")
          .map((produto: any) => ({
            ...produto,
            favorito: false,
          }))
          .sort((a: any, b: any) => a.nome_produto - b.nome_produto);
        setProdutos(produtosAtivos);
      } catch (erro) {
        console.log("Erro ao carregar os produtos", erro);
      }
    }
    carregarProdutos();

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
  
  //Estrutura referente caixa de texto Buscar Produtos
  const [textoBusca, setTextoBusca] = useState("");
  const [busca, setBusca] = useState("");
  
  useEffect(() => {
    if (buscaParam){
      const texto = String(buscaParam);
      setTextoBusca(texto);
      setBusca(texto);
    }
  },[buscaParam]);


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

  function alterarFavorito(id: number) {
    setProdutos((produtoFavorito) =>
      produtoFavorito.map((produto) =>
        produto.id_produto === id
          ? { ...produto, favorito: !produto.favorito }
          : produto,
      ),
    );
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
                                      params:{
                                        slug: produto.slug_produto
                                      }
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
