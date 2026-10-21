import { useState, useEffect } from "react";
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

  const [produtosEmDestaque, setProdutosEmDestaque] = useState<any[]>([]);
  //Carregar as informações da API
  useEffect(() => {
    async function carregarCliente() {      
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token){
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

    async function carregarProdutos() {
      try {
        const resposta = await fetch(`${API}/produtos`);
        const json = await resposta.json();

        const produtos = json.data
          .filter((produto: any) => produto.status_produto === "ATIVO")
          .map((produto: any) => ({
            ...produto,
            favorito: false,
          }));
        setProdutos(produtos);

        const destaques = produtos.filter(
          (produto: any) => produto.destaque_produto === "SIM",
        );
        setProdutosEmDestaque(destaques);
      } catch (erro) {
        console.log("Erro ao carregar os produtos em destaque", erro);
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

  function alterarFavorito(id: number) {
    setProdutosEmDestaque((produtoFavorito) =>
      produtoFavorito.map((produto) =>
        produto.id_produto === id
          ? { ...produto, favorito: !produto.favorito }
          : produto,
      ),
    );
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
                  <Text style={homeStyle.titulo}>Olá, {cliente?.nome_cliente ?? "Cliente"}!</Text>
                  <View style={homeStyle.bordaPerfil}>
                    <Image
                      style={homeStyle.perfil}
                      source={cliente?.foto_cliente
                        ? {uri: `${IMAGEM}/${cliente?.foto_cliente}`}
                        : {uri: `${IMAGEM}/cliente/user.png` || require("@/assets/images/img/icones/user.png")}
                      }
                    />
                  </View>
                </View>
                <Text style={homeStyle.subtitulo}>
                  O que vai adoçar o seu dia hoje?
                </Text>
              </View>
              <View style={homeStyle.main}>
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
                                router.navigate("/detalhe-produto")
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
