import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
// precisa instalar o npx expo install expo-image-picker
import * as ImagePicker from "expo-image-picker";
import globalStyle from "@/styles/globalStyle";
import faleConoscoStyle from "@/styles/faleConoscoStyle";
import FooterScreen from "@/app/footer";
import { cores } from "@/styles/variaveis";

export default function FaleConcoscoScreen() {
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
            contentContainerStyle={faleConoscoStyle.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={faleConoscoStyle.conteudo}>
              <View style={faleConoscoStyle.header}>
                <Image
                  style={faleConoscoStyle.logo}
                  source={require("@/assets/images/img/logo/logo.png")}
                  resizeMode="contain"
                />

                <Text style={faleConoscoStyle.titulo}>Fale Conosco</Text>

                <Text style={faleConoscoStyle.subtitulo}>
                  Envie sua mensagem para a The Gusta
                </Text>
              </View>

              <View style={faleConoscoStyle.main}>
                <View style={faleConoscoStyle.formulario}>
                  {/* Assunto*/}
                  <View style={faleConoscoStyle.areaTexto}>
                    <Image
                      style={faleConoscoStyle.icone}
                      source={require("@/assets/images/img/icones/assunto.png")}
                    />
                    <TextInput
                      style={faleConoscoStyle.txtCaixa}
                      placeholder="Assunto"
                      placeholderTextColor={cores.cinza}
                    />
                  </View>

                  {/* Depoimento */}
                  <View style={faleConoscoStyle.areaDepoimento}>
                    <View style={faleConoscoStyle.areaTexto}>
                      <Image
                        style={faleConoscoStyle.icone}
                        source={require("@/assets/images/img/icones/mensagem.png")}
                      />
                      <TextInput
                        placeholder="Mensagem"
                        placeholderTextColor={cores.cinza}
                        style={faleConoscoStyle.txtMensagem}
                        multiline={true}
                        numberOfLines={5}
                      />
                    </View>
                  </View>
                  {/* Enviar */}
                  <Pressable
                    style={faleConoscoStyle.btnSalvar}
                    onPress={() => router.replace("/")}
                  >
                    <Text style={faleConoscoStyle.txtSalvar}>
                      Enviar mensagem
                    </Text>
                  </Pressable>
                </View>

                <View style={faleConoscoStyle.atendimento}>
                  <View>
                    <Text style={faleConoscoStyle.tituloCaixa}>Atendimento</Text>
                    <View style={faleConoscoStyle.areaCaixa}>
                      <Text style={faleConoscoStyle.txtCaixa}>WhatsApp</Text>
                      <Text style={faleConoscoStyle.txtCaixa}>11964440092</Text>
                    </View>
                    <View style={faleConoscoStyle.areaCaixa}>
                      <Text style={faleConoscoStyle.txtCaixa}>E-mail</Text>
                      <Text style={faleConoscoStyle.txtCaixa}>contato@thegusta.com.br</Text>
                    </View>
                    <View style={faleConoscoStyle.areaCaixa}>
                      <Text style={faleConoscoStyle.txtCaixa}>Horário de atendimento</Text>
                      <Text style={faleConoscoStyle.txtCaixa}>Seg à Sáb, das 9h às 18h</Text>
                    </View>
                  </View>
                  <Image
                        style={faleConoscoStyle.iconeCaixa}
                        source={require("@/assets/images/img/icones/fale_conosco.png")}
                      />
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
