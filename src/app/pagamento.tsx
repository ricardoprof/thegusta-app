import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Linking,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, IMAGEM } from "@/config/api";
import { ItemSacola, carregarSacola, limparSacola } from "@/config/sacola";

import globalStyle from "@/styles/globalStyle";
import pagamentoStyle from "@/styles/pagamentoStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

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

export default function PagamentoScreen() {
  const [itensResumo, setItensResumo] = useState<ItemSacola[]>([]);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [idEndereco, setIdEndereco] = useState<number | null>(null);
  const [entrega, setEntrega] = useState<"SIM" | "NAO">("SIM");
  const [formaPagamento, setFormaPagamento] = useState<
    "PIX" | "CARTAO" | "DINHEIRO"
  >("PIX");
  const [dataEntrega, setDataEntrega] = useState("");
  const [horaEntrega, setHoraEntrega] = useState("");
  const [observacao, setObservacao] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const enderecoSelecionado = enderecos.find(
    (e) => e.id_endereco === idEndereco,
  );
  const subtotal = itensResumo.reduce(
    (total, item) => total + item.valor_produto * item.quantidade,
    0,
  );
  const moeda = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const mascaraData = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 8);

    return numeros
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
  };

  const mascaraHora = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 4);

    return numeros.replace(/^(\d{2})(\d)/, "$1:$2");
  };

  const converterDataHora = () => {
    const [dia, mes, ano] = dataEntrega.split("/");

    return `${ano}-${mes}-${dia} ${horaEntrega}`;
  };

  const carregarPagamento = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      const produtos = await carregarSacola();
      setItensResumo(produtos);
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Sessão expirada. Faça login novamente.");
      const resposta = await fetch(`${API}/enderecos`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await resposta.json();
      if (!resposta.ok || !json.success) {
        throw new Error(json.message || "Não foi possível carregar endereços.");
      }
      const lista: Endereco[] = Array.isArray(json.data) ? json.data : [];
      setEnderecos(lista);
      setIdEndereco(
        lista.find((e) => e.principal_endereco === "SIM")?.id_endereco ??
          lista[0]?.id_endereco ??
          null,
      );
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar pagamento.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarPagamento();
    }, [carregarPagamento]),
  );

  function dataValidaFutura(texto: string): boolean {
    const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.exec(texto);
    if (!m) return false;
    const [ano, mes, dia, hora, minuto] = m.slice(1).map(Number);
    const data = new Date(ano, mes - 1, dia, hora, minuto);
    return (
      data.getFullYear() === ano &&
      data.getMonth() === mes - 1 &&
      data.getDate() === dia &&
      data.getHours() === hora &&
      data.getMinutes() === minuto &&
      data.getTime() > Date.now()
    );
  }

  async function confirmarPedido() {
    if (enviando) return;
    if (itensResumo.length === 0) {
      setErro("A sacola está vazia.");
      return;
    }
    if (entrega === "SIM" && !idEndereco) {
      setErro("Selecione um endereço de entrega.");
      return;
    }
    const dataHoraPedido = converterDataHora();

    if (!dataValidaFutura(dataHoraPedido)) {
      setErro("Informe uma data e horário futuros válidos.");
      return;
    }
    setEnviando(true);
    setErro("");
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Sessão expirada. Faça login novamente.");
      const corpo = {
        itens: itensResumo.map((item) => ({
          id_produto: item.id_produto,
          quantidade: item.quantidade,
        })),
        entrega,
        ...(entrega === "SIM" ? { id_endereco: idEndereco } : {}),
        forma_pagamento: formaPagamento,
        data_entrega: dataHoraPedido,
        ...(observacao.trim() ? { observacao: observacao.trim() } : {}),
      };
      const resposta = await fetch(`${API}/pedidos`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(corpo),
      });
      const json = await resposta.json();
      if (!resposta.ok || !json.success) {
        throw new Error(json.message || "Não foi possível criar o pedido.");
      }

      // A partir daqui o pedido JÁ EXISTE na API.
      const pedido = json.data;
      const numeroPedido = pedido.id_venda;
      const listaProdutos = itensResumo
        .map(
          (item) =>
            `${item.quantidade}x ${item.nome_produto} - ` +
            moeda(item.valor_produto * item.quantidade),
        )
        .join("\n");
      const local =
        entrega === "SIM" && enderecoSelecionado
          ? `Entrega: ${enderecoSelecionado.nome_endereco} - ` +
            `${enderecoSelecionado.endereco}, ${enderecoSelecionado.numero}`
          : "Retirada no estabelecimento";
      const valorFinal = Number(pedido.valor_venda);
      const valorConfirmado = Number.isFinite(valorFinal)
        ? moeda(valorFinal)
        : "Consulte o valor no pedido registrado";
      const mensagem = [
        "🍰 *NOVO PEDIDO - THE GUSTA*",
        `*Pedido nº ${numeroPedido}*`,
        "",
        "📋 *Itens do pedido:*",
        listaProdutos,
        "",
        `Subtotal (prévia): ${moeda(subtotal)}`,
        `💰 *Total confirmado pela API:* ${valorConfirmado}`,
        "",
        `📍 ${local}`,
        `📅 Data desejada: ${dataEntrega} às ${horaEntrega}`,
        `💳 Forma de pagamento: ${formaPagamento}`,
        ...(observacao.trim() ? [`📝 ${observacao.trim()}`] : []),
      ].join("\n");

      try {
        await limparSacola();
      } catch (erroLimpeza) {
        console.warn("Pedido criado; falha ao limpar sacola:", erroLimpeza);
      }
      // Mantenha o telefone usado na sua função original.
      const telefone = "5511964440092";
      const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
      try {
        await Linking.openURL(url);
      } catch (erroWhatsApp) {
        console.warn("WhatsApp não abriu:", erroWhatsApp);
        setErro(
          `Pedido nº ${numeroPedido} registrado! ` +
            "Não foi possível abrir o WhatsApp. Consulte Meus Pedidos.",
        );
      }
      // Não criar outro pedido se o WhatsApp falhar.
      // Não navegar imediatamente: isso pode interromper o WhatsApp.
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao confirmar pedido.");
    } finally {
      setEnviando(false);
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
            <View style={pagamentoStyle.conteudo}>
              <View style={pagamentoStyle.header}>
                <View style={pagamentoStyle.conteudoHeader}>
                  <Text style={pagamentoStyle.titulo}>Pagamento</Text>
                  <Image
                    style={pagamentoStyle.logo}
                    source={require("@/assets/images/img/logo/logo.png")}
                  />
                </View>
                <Text style={pagamentoStyle.subtitulo}>
                  Confirme entrega e forma de pagamento
                </Text>
              </View>

              <View style={pagamentoStyle.main}>
                <View style={pagamentoStyle.endereco}>
                  <Image
                    style={pagamentoStyle.imgEndereco}
                    source={require("@/assets/images/img/icones/local.png")}
                    resizeMode="stretch"
                  />
                  <View style={pagamentoStyle.infoEndereco}>
                    <Text style={pagamentoStyle.tituloEndereco}>
                      Endereço de entrega:
                    </Text>
                    <Text style={pagamentoStyle.nomeEndereco}>
                      {enderecoSelecionado?.nome_endereco ??
                        "Nenhum endereço cadastrado"}
                    </Text>
                    <Text style={pagamentoStyle.enderecoCompleto}>
                      {enderecoSelecionado
                        ? `${enderecoSelecionado.endereco}, ${enderecoSelecionado.numero}${enderecoSelecionado.complemento ? ` - ${enderecoSelecionado.complemento}` : ""}`
                        : "Cadastre um endereço para receber o pedido."}
                    </Text>
                    <Text style={pagamentoStyle.localCompleto}>
                      {enderecoSelecionado
                        ? `${enderecoSelecionado.bairro} - ${enderecoSelecionado.cidade} - ${enderecoSelecionado.uf}`
                        : ""}
                    </Text>
                    {/* <Text style={pagamentoStyle.telefone}>
                      {"("}11{")"} 99999-9999
                    </Text> */}
                  </View>
                  <Pressable
                    onPress={() => router.push("/enderecos")}>
                    <Text style={pagamentoStyle.txtAlterar}>Alterar {">"}</Text>
                  </Pressable>
                </View>

                <View style={pagamentoStyle.areaEntrega}>
                  <Image
                    style={pagamentoStyle.imgEntrega}
                    source={require("@/assets/images/img/icones/delivery-laranja.png")}
                    resizeMode="stretch"
                  />
                  <View style={pagamentoStyle.infoEntrega}>
                    <Text style={pagamentoStyle.tituloEntrega}>
                      Modalidade do pedido:
                    </Text>
                    <View style={pagamentoStyle.btnEntregaRetira}>
                      <Pressable
                        style={[
                          pagamentoStyle.btnEntrega,
                          entrega === "SIM"
                            ? pagamentoStyle.botaoAtivo
                            : pagamentoStyle.botaoInativo,
                        ]}
                        onPress={() => setEntrega("SIM")}
                      >
                        <Text style={pagamentoStyle.txtEntrega}>
                          {entrega === "SIM" ? "✓ Entrega" : "Entrega"}
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          pagamentoStyle.btnRetira,
                          entrega === "NAO"
                            ? pagamentoStyle.botaoAtivo
                            : pagamentoStyle.botaoInativo,
                        ]}
                        onPress={() => setEntrega("NAO")}
                      >
                        <Text style={pagamentoStyle.txtRetira}>
                          {entrega === "NAO" ? "✓ Retirada" : "Retirada"}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={pagamentoStyle.previsao}>
                    <Text style={pagamentoStyle.tempoEntrega}>40 - 60 min</Text>
                    <Text style={pagamentoStyle.txtPrevisao}>Previsão</Text>
                  </View>
                </View>
                <View style={pagamentoStyle.areaObservacao}>
                  <View style={pagamentoStyle.camposDataHora}>
                    <Text style={pagamentoStyle.tituloObservacao}>
                      Data da {entrega === "SIM" ? "entrega" : "retirada"}
                    </Text>
                    <TextInput
                      style={pagamentoStyle.txtDataHora}
                      placeholder="DD/MM/AAAA"
                      keyboardType="numeric"
                      placeholderTextColor={cores.cinza}
                      value={dataEntrega}
                      onChangeText={(texto) =>
                        setDataEntrega(mascaraData(texto))
                      }
                      maxLength={10}
                    />
                  </View>
                  <View style={pagamentoStyle.camposDataHora}>
                    <Text style={pagamentoStyle.tituloObservacao}>
                      Horário da {entrega === "SIM" ? "entrega" : "retirada"}
                    </Text>
                    <TextInput
                      style={pagamentoStyle.txtDataHora}
                      placeholder="HH:MM"
                      keyboardType="numeric"
                      placeholderTextColor={cores.cinza}
                      value={horaEntrega}
                      onChangeText={(texto) =>
                        setHoraEntrega(mascaraHora(texto))
                      }
                      maxLength={5}
                    />
                  </View>
                </View>

                <View style={pagamentoStyle.areaPagamento}>
                  <Image
                    style={pagamentoStyle.imgPagamento}
                    source={require("@/assets/images/img/icones/carteira.png")}
                    resizeMode="stretch"
                  />
                  <View style={pagamentoStyle.infoPagamento}>
                    <Text style={pagamentoStyle.tituloPagamento}>
                      Forma de Pagamento
                    </Text>
                    <View style={pagamentoStyle.btnPagamento}>
                      <Pressable
                        style={[
                          pagamentoStyle.btnPix,
                          formaPagamento === "PIX"
                            ? pagamentoStyle.botaoAtivo
                            : pagamentoStyle.botaoInativo,
                        ]}
                        onPress={() => setFormaPagamento("PIX")}
                      >
                        <Text style={pagamentoStyle.txtPix}>
                          {formaPagamento === "PIX" ? "✓ Pix" : "Pix"}
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          pagamentoStyle.btnCartao,
                          formaPagamento === "CARTAO"
                            ? pagamentoStyle.botaoAtivo
                            : pagamentoStyle.botaoInativo,
                        ]}
                        onPress={() => setFormaPagamento("CARTAO")}
                      >
                        <Text style={pagamentoStyle.txtCartao}>
                          {formaPagamento === "CARTAO" ? "✓ Cartão" : "Cartão"}
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          pagamentoStyle.btnDinheiro,
                          formaPagamento === "DINHEIRO"
                            ? pagamentoStyle.botaoAtivo
                            : pagamentoStyle.botaoInativo,
                        ]}
                        onPress={() => setFormaPagamento("DINHEIRO")}
                      >
                        <Text style={pagamentoStyle.txtDinheiro}>
                          {formaPagamento === "DINHEIRO"
                            ? "✓ Dinheiro"
                            : "Dinheiro"}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

                <View style={pagamentoStyle.areaObservacao}>
                  <Image
                    style={pagamentoStyle.imgObservacao}
                    source={require("@/assets/images/img/icones/mensagem.png")}
                    resizeMode="stretch"
                  />
                  <View style={pagamentoStyle.observacao}>
                    <Text style={pagamentoStyle.tituloObservacao}>
                      Observações:
                    </Text>
                    <TextInput
                      style={pagamentoStyle.txtObservacao}
                      value={observacao}
                      onChangeText={setObservacao}
                      maxLength={500}
                      multiline
                    />
                  </View>
                </View>

                <View style={pagamentoStyle.subtotal}>
                  <View style={pagamentoStyle.topoSubtotal}>
                    <Image
                      style={pagamentoStyle.imgSubtotal}
                      source={require("@/assets/images/img/icones/pedido.png")}
                      resizeMode="stretch"
                    />
                    <View style={pagamentoStyle.resumoPedido}>
                      <Text style={pagamentoStyle.tituloSubtotal}>
                        Resumo do pedido
                      </Text>
                      <View style={pagamentoStyle.resumo}>
                        {itensResumo.map((item) => (
                          <View
                            style={pagamentoStyle.itemResumo}
                            key={item.id_produto}
                          >
                            <Image
                              style={pagamentoStyle.imgProduto}
                              source={{
                                uri: item.foto_produto
                                  ? `${IMAGEM}/${item.foto_produto}`
                                  : `${IMAGEM}/produto/sem-imagem.png`,
                              }}
                              resizeMode="stretch"
                            />
                            <Text style={pagamentoStyle.nomeProduto}>
                              {item.quantidade}x {item.nome_produto}
                            </Text>
                            <Text style={pagamentoStyle.valorProduto}>
                              {moeda(item.valor_produto * item.quantidade)}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  <View style={globalStyle.separador}></View>
                  <View style={pagamentoStyle.areaSubtotal}>
                    <Text style={pagamentoStyle.txtSubtotal}>Subtotal</Text>
                    <Text style={pagamentoStyle.valorSubtotal}>
                      {moeda(subtotal)}
                    </Text>
                  </View>
                  {/* <View style={pagamentoStyle.areaValorEntrega}>
                    <Text style={pagamentoStyle.txtValorEntrega}>Entrega</Text>
                    <Text style={pagamentoStyle.valorEntrega}>R$ 8,00</Text>
                  </View> */}
                  <View style={pagamentoStyle.areaDesconto}>
                    <Text style={pagamentoStyle.txtDesconto}>Desconto</Text>
                    <Text style={pagamentoStyle.cupomDesconto}></Text>
                    <Text style={pagamentoStyle.valorDesconto}>R$ 0,00</Text>
                  </View>
                  <View style={globalStyle.separador}></View>
                  <View style={pagamentoStyle.areaTotal}>
                    <Text style={pagamentoStyle.txtTotal}>Total</Text>
                    <Text style={pagamentoStyle.valorTotal}>
                      {moeda(subtotal)}
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={pagamentoStyle.btnPedido}
                  disabled={enviando || carregando || itensResumo.length === 0}
                  onPress={confirmarPedido}
                >
                  <Text style={pagamentoStyle.txtPedido}>
                    {enviando ? "Enviando pedido..." : "Confirmar pedido"}
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
