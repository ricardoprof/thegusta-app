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
import configStyle from "@/styles/configStyle";
import FooterScreen from "@/app/footer";
import { API, IMAGEM } from "@/config/api";

export default function ConfigScreen() {
  const [ativo, setAtivo] = useState(false);

  const [cliente, setCliente] = useState<any>(null);

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
  }, []);

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
            contentContainerStyle={configStyle.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={configStyle.conteudo}>
              <View style={configStyle.header}>
                <Image
                  style={configStyle.logo}
                  source={require("@/assets/images/img/logo/logo.png")}
                  resizeMode="contain"
                />

                <Text style={configStyle.titulo}>Configurações</Text>

                <Text style={configStyle.subtitulo}>
                  Gerencie seu perfil, endereços, entre outros
                </Text>
              </View>

              <View style={configStyle.main}>
                <View style={configStyle.areaCliente}>
                  <View style={configStyle.avatar}>
                    <Image
                      style={configStyle.perfil}
                      source={cliente?.foto_cliente
                        ? {uri: `${IMAGEM}/${cliente?.foto_cliente}`}
                        : {uri: `${IMAGEM}/cliente/user.png` || require("@/assets/images/img/icones/user.png")}
                      }
                    />
                  </View>
                  <View style={configStyle.textoCliente}>
                    <Text style={configStyle.nomeCliente}>Olá, {cliente?.nome_cliente}!</Text>

                    <Text style={configStyle.descricaoCliente}>
                      Acesse e organize sua experiência no app
                    </Text>
                  </View>
                </View>

                <Text style={configStyle.tituloSecao}>Minha conta</Text>

                <View style={configStyle.areaOpcoes}>
                  {/* Perfil */}
                  <View style={configStyle.itemOpcao}>
                    <Image
                      style={configStyle.icone}
                      source={require("@/assets/images/img/icones/perfil.png")}
                    />
                    <View style={configStyle.areaTextoOpcao}>
                      <Text style={configStyle.tituloOpcao}>Perfil</Text>

                      <Text style={configStyle.descricaoOpcao}>
                        Dados pessoais, telefone e e-mail
                      </Text>
                    </View>

                    <Pressable onPress={() => router.push("/perfil")}>
                      <Text style={configStyle.setaOpcao}>{">"}</Text>
                    </Pressable>
                  </View>

                  {/* Endereço */}
                  <View style={configStyle.itemOpcao}>
                    <Image
                      style={configStyle.icone}
                      source={require("@/assets/images/img/icones/local.png")}
                    />
                    <View style={configStyle.areaTextoOpcao}>
                      <Text style={configStyle.tituloOpcao}>Endereços</Text>

                      <Text style={configStyle.descricaoOpcao}>
                        Gerencie seus endereços de entrega
                      </Text>
                    </View>

                    <Pressable onPress={() => router.push("/enderecos")}>
                      <Text style={configStyle.setaOpcao}>{">"}</Text>
                    </Pressable>
                  </View>

                  {/* Senha */}
                  <View style={[configStyle.itemOpcao, configStyle.ultimoItem]}>
                    <Image
                      style={configStyle.icone}
                      source={require("@/assets/images/img/icones/senha.png")}
                    />
                    <View style={configStyle.areaTextoOpcao}>
                      <Text style={configStyle.tituloOpcao}>Alterar senha</Text>

                      <Text style={configStyle.descricaoOpcao}>
                        Atualize sua senha com segurança
                      </Text>
                    </View>

                    <Pressable onPress={() => router.push("/alterar-senha")}>
                      <Text style={configStyle.setaOpcao}>{">"}</Text>
                    </Pressable>
                  </View>
                </View>

                {/* APP */}
                <Text style={configStyle.tituloSecao}>App</Text>

                <View style={configStyle.areaOpcoes}>
                  {/* Instalar */}
                  <View style={configStyle.itemOpcao}>
                    <Image
                      style={configStyle.icone}
                      source={require("@/assets/images/img/icones/download.png")}
                    />
                    <View style={configStyle.areaTextoOpcao}>
                      <Text style={configStyle.tituloOpcao}>
                        Instalar aplicativo
                      </Text>

                      <Text style={configStyle.descricaoOpcao}>
                        Adicione o app à sua tela inicial
                      </Text>
                    </View>

                    <Pressable
                      style={configStyle.btnInstalar}
                      onPress={() => router.push("/")}
                    >
                      <Text style={configStyle.txtInstalar}>Instalar</Text>
                    </Pressable>
                  </View>

                  {/* Notificações */}
                  <View style={[configStyle.itemOpcao, configStyle.ultimoItem]}>
                    <Image
                      style={configStyle.icone}
                      source={require("@/assets/images/img/icones/notificacao.png")}
                    />
                    <View style={configStyle.areaTextoOpcao}>
                      <Text style={configStyle.tituloOpcao}>
                        Ativar notificações
                      </Text>

                      <Text style={configStyle.descricaoOpcao}>
                        Receba avisos sobre pedidos e promoções
                      </Text>
                    </View>

                    <Pressable onPress={() => setAtivo((current) => !current)}>
                      <Image
                        style={configStyle.itemAtivar}
                        source={
                          ativo
                            ? require("@/assets/images/img/icones/ativo.png")
                            : require("@/assets/images/img/icones/inativo.png")
                        }
                      />
                    </Pressable>
                  </View>
                </View>

                {/* Relacionamento */}
                <Text style={configStyle.tituloSecao}>Relacionamento</Text>

                <View style={configStyle.areaOpcoes}>
                  {/* Depoimentos */}
                  <View style={configStyle.itemOpcao}>
                    <Image
                      style={configStyle.icone}
                      source={require("@/assets/images/img/icones/depoimento.png")}
                    />
                    <View style={configStyle.areaTextoOpcao}>
                      <Text style={configStyle.tituloOpcao}>Depoimento</Text>

                      <Text style={configStyle.descricaoOpcao}>
                        Veja ou deixe sua avaliação
                      </Text>
                    </View>

                    <Pressable onPress={() => router.push("/depoimentos")}>
                      <Text style={configStyle.setaOpcao}>{">"}</Text>
                    </Pressable>
                  </View>

                  {/* Fale Conosco */}
                  <View style={[configStyle.itemOpcao, configStyle.ultimoItem]}>
                    <Image
                      style={configStyle.icone}
                      source={require("@/assets/images/img/icones/fale_conosco.png")}
                    />
                    <View style={configStyle.areaTextoOpcao}>
                      <Text style={configStyle.tituloOpcao}>Fale conosco</Text>

                      <Text style={configStyle.descricaoOpcao}>
                        Tire suas dúvidas e envie sugestões
                      </Text>
                    </View>

                    <Pressable onPress={() => router.push("/fale-conosco")}>
                      <Text style={configStyle.setaOpcao}>{">"}</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Sair */}
                <Pressable
                  style={configStyle.btnSair}
                  onPress={() => router.replace("/")}
                >
                  <Text style={configStyle.txtSair}>Sair da conta</Text>
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
