import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";


const enviarLinkStyle = StyleSheet.create({
  sobrepor: {
    flex: 1,
    backgroundColor: cores.preto80,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  conteudo: {
    width: "80%",
    height: "40%",
    backgroundColor: cores.branco,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: cores.preto,
    fontFamily: fontes.negrito,
  },
  scroll: {
    marginVertical: 20,
  },
  subtitulo: {
    fontSize: 18,
    color: cores.laranja,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  texto: {
    fontSize: 15,
    color: cores.cinza,
    lineHeight: 20,
    textAlign: "justify",
    marginVertical: 10,
  },
  btnOK: {
    backgroundColor: cores.laranja,
    borderRadius: 10,
    padding: 10,
    width: "50%",
    height: 40,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  txtOK: {
    fontSize: 15,
    color: cores.preto,
    fontWeight: "bold",
  },
});

export default enviarLinkStyle;
