import { useState, useCallback } from "react";
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
import meusPedidosStyle from "@/styles/meusPedidosStyle";
import FooterScreen from "@/app/footer";
import { API, IMAGEM } from "@/config/api";
import { cores } from "@/styles/variaveis";

type ItemPedido = {
  id_item: number;
  qtde_item: number;
  produto: { nome_produto: string; foto_produto: string | null } | null;
};
type Pedido = {
  id_venda: number;
  valor_venda: number;
  status_venda: string;
  status_descricao_venda: string;
  data_entrega_venda: string | null;
  entrega_venda: "SIM" | "NAO";
  itens: ItemPedido[];
};

export default function MeusPedidosScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [aba, setAba] = useState<"ANDAMENTO" | "ENTREGUES">("ANDAMENTO");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(false);

  const carregarPedidos = useCallback(async (numeroPagina = 1) => {
    setCarregando(true);
    setErro("");
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Sessão expirada. Faça login novamente.");
      const resposta = await fetch(
        `${API}/pedidos?page=${numeroPagina}&por_pagina=10`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await resposta.json();
      if (!resposta.ok || !json.success || !Array.isArray(json.data)) {
        throw new Error(
          json.message || "Não foi possível carregar os pedidos.",
        );
      }
      setPedidos((atuais) =>
        numeroPagina === 1
          ? json.data
          : [
              ...atuais,
              ...json.data.filter(
                (novo: Pedido) =>
                  !atuais.some((antigo) => antigo.id_venda === novo.id_venda),
              ),
            ],
      );
      setPagina(numeroPagina);
      setTemMais(json.meta.pagina_atual < json.meta.ultima_pagina);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro de conexão.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarPedidos(1);
    }, [carregarPedidos]),
  );

  const pedidosFiltrados = pedidos.filter((pedido) =>
    aba === "ENTREGUES"
      ? pedido.status_venda === "ENTREGUE"
      : pedido.status_venda !== "ENTREGUE" &&
        pedido.status_venda !== "CANCELADO",
  );
  const moeda = (valor: number) =>
    Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  const dataBrasileira = (valor: string | null) => {
    if (!valor) return "Não informada";
    const data = new Date(valor);
    return Number.isNaN(data.getTime())
      ? "Não informada"
      : data.toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        });
  };

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
            <View style={meusPedidosStyle.conteudo}>
              <View style={meusPedidosStyle.header}>
                <View style={meusPedidosStyle.conteudoHeader}>
                  <Text style={meusPedidosStyle.titulo}>Meus pedidos</Text>
                  <Image
                    style={meusPedidosStyle.logo}
                    source={require("@/assets/images/img/logo/logo.png")}
                  />
                </View>
                <Text style={meusPedidosStyle.subtitulo}>
                  Acompanhe seus pedidos e seu histórico
                </Text>
              </View>

              <View style={meusPedidosStyle.main}>
                <View style={meusPedidosStyle.posicaoPedido}>
                  <Pressable
                    style={[
                      meusPedidosStyle.btnAndamento,
                      aba === "ANDAMENTO"
                        ? { backgroundColor: cores.laranja }
                        : { backgroundColor: cores.branco },
                    ]}
                    onPress={() => setAba("ANDAMENTO")}
                  >
                    <Text style={meusPedidosStyle.txtAndamento}>
                      Em andamento
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      meusPedidosStyle.btnEntregue,
                      aba === "ENTREGUES"
                        ? { backgroundColor: cores.laranja }
                        : { backgroundColor: cores.branco },
                    ]}
                    onPress={() => setAba("ENTREGUES")}
                  >
                    <Text style={meusPedidosStyle.txtEntregue}>Entregues</Text>
                  </Pressable>
                </View>

                {erro ? <Text>{erro}</Text> : null}
                {carregando && pedidos.length === 0 ? (
                  <Text>Carregando pedidos...</Text>
                ) : null}
                {!carregando && pedidosFiltrados.length === 0 ? (
                  <Text>Nenhum pedido nesta categoria.</Text>
                ) : null}
                {pedidosFiltrados.map((pedido) => (
                  <View style={meusPedidosStyle.subtotal} key={pedido.id_venda}>
                    <View style={meusPedidosStyle.topoSubtotal}>
                      <Image
                        style={meusPedidosStyle.imgSubtotal}
                        source={require("@/assets/images/img/icones/preparando-laranja.png")}
                        resizeMode="stretch"
                      />
                      <View style={meusPedidosStyle.resumoPedido}>
                        <View style={meusPedidosStyle.topoPedido}>
                          <Text style={meusPedidosStyle.tituloSubtotal}>
                            Pedido #{pedido.id_venda}
                          </Text>
                          <View style={meusPedidosStyle.statusPedido}>
                            <Image
                              style={meusPedidosStyle.imgStatus}
                              source={require("@/assets/images/img/icones/preparando-laranja.png")}
                              resizeMode="stretch"
                            />
                            <Text style={meusPedidosStyle.txtStatus}>
                              {pedido.status_descricao_venda}
                            </Text>
                          </View>
                        </View>
                        <View style={meusPedidosStyle.areaResumo}>
                          <View style={meusPedidosStyle.resumo}>
                            {/* REPETIÇÃO */}
                            {pedido.itens.map((item) => (
                              <View
                                style={meusPedidosStyle.itemResumo}
                                key={item.id_item}
                              >
                                <Image
                                  style={meusPedidosStyle.imgProduto}
                                  source={{
                                    uri: item.produto?.foto_produto
                                      ? `${IMAGEM}/${item.produto.foto_produto}`
                                      : `${IMAGEM}/produto/sem-imagem.png`,
                                  }}
                                  resizeMode="stretch"
                                />
                                <Text style={meusPedidosStyle.nomeProduto}>
                                  {item.qtde_item}x{" "}
                                  {item.produto?.nome_produto ?? "Produto"}
                                </Text>
                              </View>
                            ))}
                            {/* FIM REPETIÇÃO */}
                          </View>
                          <Image
                            style={meusPedidosStyle.imgResumo}
                            source={require("@/assets/images/img/icones/preparando-laranja.png")}
                            resizeMode="stretch"
                          />
                        </View>
                      </View>
                    </View>
                    <View style={globalStyle.separador}></View>
                    <View style={meusPedidosStyle.rodapeResumo}>
                      <View style={meusPedidosStyle.areaTotal}>
                        <Text style={meusPedidosStyle.txtTotal}>TOTAL</Text>
                        <Text style={meusPedidosStyle.valorTotal}>
                          {moeda(pedido.valor_venda)}
                        </Text>
                      </View>
                      <View style={meusPedidosStyle.areaPrevisao}>
                        <Image
                          style={meusPedidosStyle.imgPrevisao}
                          source={require("@/assets/images/img/icones/previsao.png")}
                          resizeMode="stretch"
                        />
                        <View style={meusPedidosStyle.tempoPrevisao}>
                          <Text style={meusPedidosStyle.txtPrevisao}>
                            Data desejada
                          </Text>
                          <Text style={meusPedidosStyle.txtTempoPrevisao}>
                            {dataBrasileira(pedido.data_entrega_venda)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Pressable
                      style={meusPedidosStyle.btnDetalhes}
                      onPress={() =>
                        router.push({
                          pathname: "/detalhe-pedido",
                          params: { id: String(pedido.id_venda) },
                        })
                      }
                    >
                      <Text style={meusPedidosStyle.txtDetalhes}>
                        Ver detalhes
                      </Text>
                    </Pressable>
                  </View>
                ))}
                {temMais && !carregando ? (
                  <Pressable onPress={() => carregarPedidos(pagina + 1)}>
                    <Text>Carregar mais pedidos</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          </ScrollView>

          <FooterScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
