import { useState } from "react";
import { router } from "expo-router";
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
import depoimentosStyle from "@/styles/depoimentosStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

export default function DepoimentosScreen() {
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
            contentContainerStyle={depoimentosStyle.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={depoimentosStyle.conteudo}>
              <View style={depoimentosStyle.header}>
                <Image
                  style={depoimentosStyle.logo}
                  source={require("@/assets/images/img/logo/logo.png")}
                  resizeMode="contain"
                />

                <Text style={depoimentosStyle.titulo}>Depoimentos</Text>

                <Text style={depoimentosStyle.subtitulo}>
                  Compartilhe sua experiência com a The Gusta
                </Text>
              </View>

              <View style={depoimentosStyle.main}>
                <View style={depoimentosStyle.formulario}>
                  {/* Titulo */}
                  <View style={depoimentosStyle.areaTitulo}>
                    <Image
                      style={depoimentosStyle.iconeTitulo}
                      source={require("@/assets/images/img/icones/depoimento.png")}
                    />
                    <Text style={depoimentosStyle.tituloForm}>
                      Deixe seu depoimento
                    </Text>
                  </View>

                  {/* Avaliação */}
                  <View style={depoimentosStyle.areaAvaliacao}>
                    <Text style={depoimentosStyle.tituloCaixa}>Endereço</Text>
                    <View style={depoimentosStyle.estrelas}>
                      <Text style={depoimentosStyle.estrela}>★</Text>
                      <Text style={depoimentosStyle.estrela}>★</Text>
                      <Text style={depoimentosStyle.estrela}>★</Text>
                      <Text style={depoimentosStyle.estrela}>☆</Text>
                      <Text style={depoimentosStyle.estrela}>☆</Text>
                    </View>
                  </View>

                  {/* Depoimento */}
                  <View style={depoimentosStyle.areaDepoimento}>
                    <Text style={depoimentosStyle.tituloCaixa}>
                      Seu depoimento
                    </Text>
                    <View style={depoimentosStyle.areaTexto}>
                      <TextInput
                        placeholder="Conte como foi sua experiência, sabor, atendimento ou entrega..."
                        placeholderTextColor={cores.cinza}
                        style={depoimentosStyle.txtCaixa}
                        multiline={true}
                        numberOfLines={6}
                      />
                    </View>
                  </View>
                  {/* Enviar */}
                  <Pressable
                    style={depoimentosStyle.btnSalvar}
                    onPress={() => router.replace("/")}
                  >
                    <Text style={depoimentosStyle.txtSalvar}>
                      Enviar depoimento
                    </Text>
                  </Pressable>
                </View>

                <Text style={depoimentosStyle.tituloForm}>Suas avaliações</Text>

                <View style={depoimentosStyle.formulario}>
                  {/* Avaliação */}
                  <View style={depoimentosStyle.estrelasAvaliacao}>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>★</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>★</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>★</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>☆</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>☆</Text>
                  </View>

                  {/* Depoimento */}
                  <View style={depoimentosStyle.areaDepoimento}>
                    <Text style={depoimentosStyle.txtCaixaAvaliacao}>
                      Produtos deliciosos e saudáveis! O sabor é incrível e a entrega foi super rápida. Já virei fã da The Gusta.
                    </Text>
                  </View>
                </View>
                <View style={depoimentosStyle.formulario}>
                  {/* Avaliação */}
                  <View style={depoimentosStyle.estrelasAvaliacao}>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>★</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>★</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>★</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>☆</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>☆</Text>
                  </View>

                  {/* Depoimento */}
                  <View style={depoimentosStyle.areaDepoimento}>
                    <Text style={depoimentosStyle.txtCaixaAvaliacao}>
                      Produtos deliciosos e saudáveis! O sabor é incrível e a entrega foi super rápida. Já virei fã da The Gusta.
                    </Text>
                  </View>
                </View>
                <View style={depoimentosStyle.formulario}>
                  {/* Avaliação */}
                  <View style={depoimentosStyle.estrelasAvaliacao}>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>★</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>★</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>★</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>☆</Text>
                    <Text style={depoimentosStyle.estrelaAvaliacao}>☆</Text>
                  </View>

                  {/* Depoimento */}
                  <View style={depoimentosStyle.areaDepoimento}>
                    <Text style={depoimentosStyle.txtCaixaAvaliacao}>
                      Produtos deliciosos e saudáveis! O sabor é incrível e a entrega foi super rápida. Já virei fã da The Gusta.
                    </Text>
                  </View>
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
