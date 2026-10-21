import { useState, useEffect } from "react";
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
import detalheProdutoStyle from "@/styles/detalheProdutoStyle";
import FooterScreen from "@/app/footer";

import { API, IMAGEM } from "@/config/api";

export default function DetalheProdutoScreen() {
  const { slug } = useLocalSearchParams();

  const [produto, setProduto] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    async function carregarProduto() {
      if (!slug) {
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(`${API}/produtos/${slug}`);
        const json = await resposta.json();

        if (!resposta.ok) {
          setErro("Não foi possível carregar o produto.");
          return;
        }
        setProduto(json.data);
      } catch (erro) {
        console.log("Erro ao carregar o produto: ", erro);
        setErro("Não foi possível carregar o produto.");
      } finally {
        setCarregando(false);
      }
    }
    carregarProduto();
  }, [slug]);

  if (carregando) {
    return (
      <View style={globalStyle.container}>
        <Text>Carregando produto...</Text>
      </View>
    );
  }

  if (erro || !produto) {
    return (
      <View style={globalStyle.container}>
        <Text>{erro || "Produto não encontrado."}</Text>
      </View>
    );
  }

  function aumentarQuantidade() {
    setQuantidade(quantidade + 1);
  }

  function diminuirQuantidade() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
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
            <View style={detalheProdutoStyle.conteudo}>
              <View style={detalheProdutoStyle.header}>
                <View style={detalheProdutoStyle.conteudoHeader}>
                  <Text style={detalheProdutoStyle.titulo}>
                    {produto.nome_produto}
                  </Text>
                  <Pressable style={detalheProdutoStyle.btnFavorito}>
                    <Text style={detalheProdutoStyle.iconeFavorito}>★</Text>
                  </Pressable>
                </View>
              </View>
              <View style={detalheProdutoStyle.main}>
                <Image
                  style={detalheProdutoStyle.imgProduto}
                  source={
                    produto.foto_produto
                      ? { uri: `${IMAGEM}/${produto.foto_produto}` }
                      : { uri: `${IMAGEM}/produto/sem-imagem.png` }
                  }
                  resizeMode="stretch"
                />
                <View style={detalheProdutoStyle.medidas}>
                  <Text style={detalheProdutoStyle.categoria}>
                    {produto.tamanho_produto}
                  </Text>
                  <Text style={detalheProdutoStyle.categoria}>
                    {produto.categoria_produto.nome_categoria}
                  </Text>
                </View>
                <Text style={detalheProdutoStyle.valorProduto}>
                  {Number(produto.valor_produto).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
                <Text style={detalheProdutoStyle.descricao}>
                  {produto.categoria_produto.descricao_categoria}
                </Text>
                <Text style={detalheProdutoStyle.tituloDescricao}>
                  Descrição
                </Text>
                <Text style={detalheProdutoStyle.descricao}>
                  {produto.descricao_produto}
                </Text>

                <View style={detalheProdutoStyle.areaVenda}>
                  <View style={detalheProdutoStyle.topoVenda}>
                    <View style={detalheProdutoStyle.caixaQtde}>
                      <Pressable
                        style={detalheProdutoStyle.btnQtde}
                        onPress={diminuirQuantidade}
                      >
                        <Image
                          style={detalheProdutoStyle.imgQtde}
                          source={require("@/assets/images/img/icones/retirar.png")}
                        />
                      </Pressable>
                      <Text style={detalheProdutoStyle.quantidade}>
                        {quantidade}
                      </Text>
                      <Pressable
                        style={detalheProdutoStyle.btnQtde}
                        onPress={aumentarQuantidade}
                      >
                        <Image
                          style={detalheProdutoStyle.imgQtde}
                          source={require("@/assets/images/img/icones/adicionar.png")}
                        />
                      </Pressable>
                    </View>
                    <View style={detalheProdutoStyle.subtotal}>
                      <View style={detalheProdutoStyle.caixaSubtotal}>
                        <Text style={detalheProdutoStyle.txtSubtotal}>
                          Subtotal
                        </Text>
                        <Text style={detalheProdutoStyle.valorSubtotal}>
                          {Number(produto.valor_produto * quantidade)
                            .toLocaleString("pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                            },
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Pressable
                    style={detalheProdutoStyle.btnSubtotal}
                    onPress={() => router.navigate("/sacola")}
                  >
                    <Text style={detalheProdutoStyle.txtSacola}>
                      Adicionar à sacola
                    </Text>
                  </Pressable>
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
