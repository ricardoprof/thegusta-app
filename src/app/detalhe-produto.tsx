import React, { useState, useEffect, useRef } from "react";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
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
import detalheProdutoStyle from "@/styles/detalheProdutoStyle";
import FooterScreen from "@/app/footer";

import { API, IMAGEM } from "@/config/api";

import { adicionarNaSacola } from "@/config/sacola";

export default function DetalheProdutoScreen() {
  const { slug } = useLocalSearchParams();

  const [produto, setProduto] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [quantidade, setQuantidade] = useState(1);

  const [mensagemFavorito, setMensagemFavorito] = useState("");
  const [processandoFavoritos, setProcessandoFavoritos] = useState<number[]>(
    [],
  );
  const bloqueiosFavoritos = useRef<Set<number>>(new Set());

  const [adicionandoSacola, setAdicionandoSacola] = useState(false);
  const [mensagemSacola, setMensagemSacola] = useState("");

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
        setProduto({ ...json.data, favorito: false });
      } catch (erro) {
        console.log("Erro ao carregar o produto: ", erro);
        setErro("Não foi possível carregar o produto.");
      } finally {
        setCarregando(false);
      }
    }
    carregarProduto();
  }, [slug]);

  async function carregarFavoritos(idProduto: number) {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/");
        return;
      }

      const resposta = await fetch(`${API}/favoritos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await resposta.json();
      if (!resposta.ok || !json.success) {
        setMensagemFavorito(json.message || "Erro ao carregar favoritos.");
        return;
      }

      const idsFavoritos = new Set(
        (json.data ?? []).map((item: any) => Number(item.id_produto)),
      );
      setProduto((anterior: any) =>
        anterior && Number(anterior.id_produto) === idProduto
          ? { ...anterior, favorito: idsFavoritos.has(idProduto) }
          : anterior,
      );
    } catch (erro) {
      console.log("Erro ao carregar favoritos:", erro);
      setMensagemFavorito("Não foi possível consultar os favoritos.");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (produto?.id_produto) {
        carregarFavoritos(Number(produto.id_produto));
      }
    }, [produto?.id_produto]),
  );

  async function alterarFavorito(idProduto: number) {
    if (!produto || bloqueiosFavoritos.current.has(idProduto)) return;
    bloqueiosFavoritos.current.add(idProduto);
    setProcessandoFavoritos((atual) => [...atual, idProduto]);
    setMensagemFavorito("");

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/");
        return;
      }

      const jaFavorito = Boolean(produto.favorito);
      const resposta = await fetch(
        jaFavorito ? `${API}/favoritos/${idProduto}` : `${API}/favoritos`,
        {
          method: jaFavorito ? "DELETE" : "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            ...(!jaFavorito ? { "Content-Type": "application/json" } : {}),
          },
          ...(!jaFavorito
            ? { body: JSON.stringify({ id_produto: idProduto }) }
            : {}),
        },
      );

      const json = await resposta.json();
      if (!resposta.ok || !json.success) {
        setMensagemFavorito(json.message || "Erro ao atualizar favorito.");
        return;
      }
      setProduto((anterior: any) =>
        anterior && Number(anterior.id_produto) === idProduto
          ? { ...anterior, favorito: !jaFavorito }
          : anterior,
      );
    } catch (erro) {
      console.log("Erro ao alterar favorito:", erro);
      setMensagemFavorito("Não foi possível conectar ao servidor.");
    } finally {
      bloqueiosFavoritos.current.delete(idProduto);
      setProcessandoFavoritos((atual) =>
        atual.filter((id) => id !== idProduto),
      );
    }
  }

  async function adicionarProdutoNaSacola() {
    if (!produto || adicionandoSacola) return;
    setAdicionandoSacola(true);
    setMensagemSacola("");
    try {
      await adicionarNaSacola(produto, quantidade);
      router.push("/sacola");
    } catch (erro) {
      console.log("Erro ao adicionar à sacola:", erro);
      setMensagemSacola(
        erro instanceof Error
          ? erro.message
          : "Não foi possível adicionar à sacola.",
      );
    } finally {
      setAdicionandoSacola(false);
    }
  }

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
                  <Pressable
                    style={detalheProdutoStyle.btnFavorito}
                    onPress={() => alterarFavorito(Number(produto.id_produto))}
                    disabled={processandoFavoritos.includes(
                      Number(produto.id_produto),
                    )}
                  >
                    <Text style={detalheProdutoStyle.iconeFavorito}>
                      {produto.favorito ? "★" : "☆"}
                    </Text>
                  </Pressable>
                </View>
              </View>
              {mensagemFavorito ? (
                <Text style={detalheProdutoStyle.erroFavorito}>
                  {mensagemFavorito}
                </Text>
              ) : null}

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
                          {Number(
                            produto.valor_produto * quantidade,
                          ).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Pressable
                    style={detalheProdutoStyle.btnSubtotal}
                    onPress={adicionarProdutoNaSacola}
                    disabled={adicionandoSacola}
                  >
                    <Text style={detalheProdutoStyle.txtSacola}>
                      {adicionandoSacola
                        ? "Adicionando..."
                        : "Adicionar à sacola"}
                    </Text>
                  </Pressable>
                  {mensagemSacola ? (
                    <Text style={detalheProdutoStyle.erroFavorito}>
                      {mensagemSacola}
                    </Text>
                  ) : null}
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
