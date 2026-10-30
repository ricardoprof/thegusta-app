import { useState, useEffect } from "react";
import { router } from "expo-router";
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
import perfilStyle from "@/styles/perfilStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";
import { API, IMAGEM } from "@/config/api";

export default function PerfilScreen() {
  const [cliente, setCliente] = useState<any>(null);

  const [modalFoto, setModalFoto] = useState(false);
  // ALTERAR O ESTADO ABAIXO
  // const [imagem, setImagem] = useState<string | null>(null);

  const [imagem, setImagem] = useState<ImagePicker.ImagePickerAsset | null>(
    null,
  );
  const [enviandoFoto, setEnviandoFoto] = useState(false);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [erro, setErro] = useState("");

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const escolherFoto = () => {
    setModalFoto(true);
  };

  const tirarFoto = async () => {
    if (enviandoFoto) return;
    setModalFoto(false);
    try {
      if (Platform.OS !== "web") {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissao.granted) {
          setMensagem("É necessário permitir o acesso à câmera.");
          return;
        }
      }
      const resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.7,
      });
      if (resultado.canceled) return;
      const foto = resultado.assets[0];
      setImagem(foto);
      await enviarFoto(foto);
      setImagem(null);
    } catch (erro) {
      console.log("Erro ao capturar foto:", erro);
      setImagem(null);
      setMensagem("Não foi possível abrir a câmera.");
    }
  };

  const selecionarGaleria = async () => {
    if (enviandoFoto) return;
    setModalFoto(false);
    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.7,
      });
      if (resultado.canceled) return;
      const foto = resultado.assets[0];
      setImagem(foto);
      await enviarFoto(foto);
      setImagem(null);
    } catch (erro) {
      console.log("Erro ao selecionar foto:", erro);
      setImagem(null);
      setMensagem("Não foi possível selecionar a imagem.");
    }
  };

  function formatarCpf(texto: string) {
    let numeros = texto.replace(/\D/g, "").slice(0, 11);

    if (numeros.length > 9) {
      numeros = numeros.replace(
        /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
        "$1.$2.$3-$4",
      );
    } else if (numeros.length > 6) {
      numeros = numeros.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (numeros.length > 3) {
      numeros = numeros.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    setCpf(numeros);
  }

  // Formatar a data no padrão BRASIL
  function formatarData(texto: string) {
    let numeros = texto.replace(/\D/g, "").slice(0, 8);

    if (numeros.length > 4) {
      numeros = numeros.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    } else if (numeros.length > 2) {
      numeros = numeros.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    setDataNascimento(numeros);
    setErro("");

    if (numeros.length === 10 && !validarData(numeros)) {
      setErro("Data inválida");
    }
  }

  //Validar a data seguindo os padrões de Meses e Anos Bissextos
  function validarData(valor: string): boolean {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
      return false;
    }

    const [dia, mes, ano] = valor.split("/").map(Number);

    if (ano < 1 || mes < 1 || mes > 12 || dia < 1) {
      return false;
    }

    //Calcular os anos bissextos
    const bissexto = ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0);

    const diasMes = [
      31,
      bissexto ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return dia <= diasMes[mes - 1];
  }

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

        setNome(json.data.nome_cliente ?? "");
        setEmail(json.data.email_cliente ?? "");
        setTelefone(json.data.telefone_cliente ?? "");
        setCpf(json.data.cpf_cnpj_cliente ?? "");

        if (json.data.data_nasc_cliente) {
          const dataAPI = json.data.data_nasc_cliente.substring(0, 10);

          const dataBR = dataAPI.split("-").reverse().join("/");

          setDataNascimento(dataBR);
        }
      } catch (erro) {
        console.log("Erro ao carregar cliente:", erro);
      }
    }
    carregarCliente();
  }, []);

  async function salvarPerfil() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !cpf.trim() ||
      !dataNascimento.trim()
    ) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!validarData(dataNascimento)) {
      setErro("Informe uma data válida");
      setMensagem("Verifique a data de nascimento.");
      return;
    }

    if (cpf.replace(/\D/g, "").length !== 11) {
      setMensagem("Informe um CPF com 11 dígitos.");
      return;
    }

    const [dia, mes, ano] = dataNascimento.split("/");
    const dataNascimentoISO = `${ano}-${mes}-${dia}`;

    setCarregando(true);
    setMensagem("");

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/");
        return;
      }

      const resposta = await fetch(`${API}/cliente`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome_cliente: nome.trim(),
          tipo_cliente: "PF",
          cpf_cnpj_cliente: cpf,
          data_nasc_cliente: dataNascimentoISO,
          email_cliente: email.trim(),
          telefone_cliente: telefone.trim(),
        }),
      });

      const json = await resposta.json();

      if (!resposta.ok || !json.success) {
        setMensagem(json.message || "Erro ao atualizar o perfil.");
        return;
      }

      setCliente(json.data);
      router.replace("/config");
    } catch (erro) {
      console.log("Erro ao salvar perfil:", erro);
      setMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  async function enviarFoto(foto: ImagePicker.ImagePickerAsset): Promise<boolean> {
    const tipo = foto.mimeType ?? "image/jpeg";
    const tiposAceitos = ["image/jpeg", "image/png", "image/webp"];

    if (!tiposAceitos.includes(tipo)) {
      setMensagem("Escolha uma imagem JPG, PNG ou WEBP.");
      return false;
    }
    if (foto.fileSize && foto.fileSize > 2 * 1024 * 1024) {
      setMensagem("A imagem deve ter no máximo 2 MB.");
      return false;
    }

    setEnviandoFoto(true);
    setMensagem("");
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/");
        return false;
      }

      const form = new FormData();
      const extensao =
        tipo === "image/png" ? "png" : tipo === "image/webp" ? "webp" : "jpg";
      const nomeArquivo = foto.fileName ?? `foto.${extensao}`;

      if (Platform.OS === "web") {
        const arquivo = await fetch(foto.uri).then((r) => r.blob());
        form.append("foto_cliente", arquivo, nomeArquivo);
      } else {
        form.append("foto_cliente", {
          uri: foto.uri,
          name: nomeArquivo,
          type: tipo,
        } as any);
      }

      const resposta = await fetch(`${API}/cliente/foto`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });
      const json = await resposta.json();

      if (!resposta.ok || !json.success || !json.data?.foto_cliente) {
        setMensagem(json.message || "Não foi possível atualizar a foto.");
        return false;
      }

      setCliente((anterior: any) => ({ ...anterior, ...json.data }));
      setMensagem("Foto atualizada com sucesso.");
      return true;
    } catch (erro) {
      console.log("Erro ao enviar foto:", erro);
      setMensagem("Não foi possível conectar ao servidor.");
      return false;
    } finally {
      setEnviandoFoto(false);
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
            contentContainerStyle={perfilStyle.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={perfilStyle.conteudo}>
              <View style={perfilStyle.header}>
                <Image
                  style={perfilStyle.logo}
                  source={require("@/assets/images/img/logo/logo.png")}
                  resizeMode="contain"
                />

                <Text style={perfilStyle.titulo}>Editar perfil</Text>

                <Text style={perfilStyle.subtitulo}>
                  Atualize seus dados pessoais
                </Text>
              </View>

              <View style={perfilStyle.main}>
                <View style={perfilStyle.areaCliente}>
                  <View style={perfilStyle.avatar}>
                    <Image
                      style={perfilStyle.fotoPerfil}
                      source={
                        imagem
                          ? { uri: imagem.uri }
                          : cliente?.foto_cliente
                            ? { uri: `${IMAGEM}/${cliente.foto_cliente}` }
                            : require("@/assets/images/img/icones/user.png")
                      }
                    />
                  </View>
                  <View style={perfilStyle.textoCliente}>
                    <Text style={perfilStyle.nomeCliente}>Foto do perfil</Text>

                    <Text style={perfilStyle.descricaoCliente}>
                      A foto do perfil ajuda a personalizar sua conta
                    </Text>
                  </View>
                  <Pressable
                    style={perfilStyle.btnAlterar}
                    onPress={escolherFoto}
                    disabled={enviandoFoto}
                  >
                    <Text style={perfilStyle.txtAlterar}>{enviandoFoto ? "Enviando..." : "Alterar foto"}</Text>
                  </Pressable>
                </View>

                <View style={perfilStyle.formulario}>
                  {/* Nome */}
                  <View style={perfilStyle.areaTexto}>
                    <Image
                      style={perfilStyle.icone}
                      source={require("@/assets/images/img/icones/perfil.png")}
                    />
                    <View style={perfilStyle.input}>
                      <Text style={perfilStyle.tituloCaixa}>Nome completo</Text>

                      <TextInput
                        style={perfilStyle.txtCaixa}
                        placeholder={cliente?.nome_cliente}
                        placeholderTextColor={cores.cinza}
                        value={nome}
                        onChangeText={setNome}
                      />
                    </View>
                  </View>

                  {/* Email */}
                  <View style={perfilStyle.areaTexto}>
                    <Image
                      style={perfilStyle.icone}
                      source={require("@/assets/images/img/icones/email.png")}
                    />
                    <View style={perfilStyle.input}>
                      <Text style={perfilStyle.tituloCaixa}>E-mail</Text>

                      <TextInput
                        style={perfilStyle.txtCaixa}
                        placeholder={cliente?.email_cliente}
                        placeholderTextColor={cores.cinza}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>
                  </View>

                  {/* Telefone */}
                  <View style={perfilStyle.areaTexto}>
                    <Image
                      style={perfilStyle.icone}
                      source={require("@/assets/images/img/icones/telefone.png")}
                    />
                    <View style={perfilStyle.input}>
                      <Text style={perfilStyle.tituloCaixa}>Telefone</Text>

                      <TextInput
                        placeholder={cliente?.telefone_cliente}
                        placeholderTextColor={cores.cinza}
                        keyboardType="phone-pad"
                        style={perfilStyle.txtCaixa}
                        value={telefone}
                        onChangeText={setTelefone}
                      />
                    </View>
                  </View>

                  {/* Cpf */}
                  <View style={perfilStyle.areaTexto}>
                    <Image
                      style={perfilStyle.icone}
                      source={require("@/assets/images/img/icones/documento.png")}
                    />
                    <View style={perfilStyle.input}>
                      <Text style={perfilStyle.tituloCaixa}>CPF</Text>

                      <TextInput
                        placeholder={cliente?.cpf_cnpj_cliente}
                        placeholderTextColor={cores.cinza}
                        style={perfilStyle.txtCaixa}
                        value={cpf}
                        onChangeText={formatarCpf}
                        maxLength={14}
                      />
                    </View>
                  </View>

                  {/* Data de Nascimento */}
                  <View style={perfilStyle.areaTexto}>
                    <Image
                      style={perfilStyle.icone}
                      source={require("@/assets/images/img/icones/documento.png")}
                    />
                    <View style={perfilStyle.input}>
                      <Text style={perfilStyle.tituloCaixa}>
                        Data de nascimento
                      </Text>

                      <TextInput
                        placeholder={
                          cliente?.data_nasc_cliente
                            ? cliente.data_nasc_cliente
                                .substring(0, 10)
                                .split("-")
                                .reverse()
                                .join("/")
                            : "Data de nascimento"
                        }
                        placeholderTextColor={cores.cinza}
                        style={perfilStyle.txtCaixa}
                        value={dataNascimento}
                        onChangeText={formatarData}
                        maxLength={10}
                        onBlur={() => {
                          if (
                            dataNascimento.length > 0 &&
                            !validarData(dataNascimento)
                          ) {
                            setErro("Informe uma data válida");
                          }
                        }}
                      />
                      {erro ? (
                        <Text style={perfilStyle.erro}>{erro}</Text>
                      ) : null}
                    </View>
                  </View>
                </View>

                {/* Notificações */}
                <View style={perfilStyle.itemOpcao}>
                  <Image
                    style={perfilStyle.icone}
                    source={require("@/assets/images/img/icones/notificacao.png")}
                  />
                  <View style={perfilStyle.areaTextoOpcao}>
                    <Text style={perfilStyle.tituloOpcao}>
                      Receber novidades e promoções
                    </Text>

                    <Text style={perfilStyle.descricaoOpcao}>
                      Receba ofertas exclusivas e novidades da The Gusta
                    </Text>
                  </View>

                  <Pressable
                    onPress={() =>
                      setCliente((current: any) => ({
                        ...current,
                        termo_aceito_em_cliente:
                          !current?.termo_aceito_em_cliente,
                      }))
                    }
                  >
                    <Image
                      style={perfilStyle.itemAtivar}
                      source={
                        cliente?.termo_aceito_em_cliente
                          ? require("@/assets/images/img/icones/ativo.png")
                          : require("@/assets/images/img/icones/inativo.png")
                      }
                    />
                  </Pressable>
                </View>

                {mensagem ? (
                  <Text style={perfilStyle.erroSalvar}>{mensagem}</Text>
                ) : null}

                {/* Sair */}
                <Pressable
                  style={perfilStyle.btnSalvar}
                  onPress={salvarPerfil}
                  disabled={carregando}
                >
                  <Text style={perfilStyle.txtSalvar}>
                    {carregando ? "Salvando..." : "Salvar alterações"}
                  </Text>
                </Pressable>

                <Pressable
                  style={perfilStyle.btnCancelar}
                  onPress={() => router.replace("/config")}
                >
                  <Text style={perfilStyle.txtCancelar}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          {/* MODAL FOTO */}
          <Modal
            visible={modalFoto}
            transparent
            animationType="fade"
            onRequestClose={() => setModalFoto(false)}
          >
            <View style={perfilStyle.fundoModalFoto}>
              <View style={perfilStyle.modalFoto}>
                <Text style={perfilStyle.tituloModalFoto}>Adicionar foto</Text>

                <Text style={perfilStyle.subtituloModalFoto}>
                  Como deseja adicionar sua foto?
                </Text>

                <Pressable style={perfilStyle.opcaoFoto} onPress={tirarFoto}>
                  <Text style={perfilStyle.textoOpcaoFoto}>📷 Tirar foto</Text>
                </Pressable>

                <Pressable
                  style={perfilStyle.opcaoFoto}
                  onPress={selecionarGaleria}
                >
                  <Text style={perfilStyle.textoOpcaoFoto}>
                    🖼️ Escolher da galeria
                  </Text>
                </Pressable>

                <Pressable
                  style={perfilStyle.cancelarFoto}
                  onPress={() => setModalFoto(false)}
                >
                  <Text style={perfilStyle.textoCancelarFoto}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <FooterScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
