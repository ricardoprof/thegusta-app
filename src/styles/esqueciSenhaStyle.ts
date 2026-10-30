import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const esqueciSenhaStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  titulo: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
    color: cores.preto,
    textAlign: "center",
    fontFamily: fontes.negrito,
  },
  subtitulo: {
    marginTop: 10,
    fontSize: 18,
    color: cores.cinza,
    textAlign: "center",
  },
  form: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  input: {
    height: 50,
    flexDirection: "row",
    borderColor: cores.laranja,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginVertical: 50,
    justifyContent: "space-between",
    backgroundColor: cores.laranjaClaro,
  },
  icone: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textInput: {
    width: "100%",
  },
  btnEnviar: {
    width: "80%",
    height: 50,
    backgroundColor: cores.laranja,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  textoEnviar: {
    fontSize: 25,
    color: cores.preto,
    fontWeight: "bold",
  },
  btnEnviarPressed: {
    opacity: 0.8,
  },
  btnLogin: {
    width: "80%",
    height: 50,
    backgroundColor: cores.laranjaClaro,
    borderColor: cores.laranja,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textoLogin: {
    fontSize: 25,
    color: cores.preto,
    fontWeight: "bold",
  },
  btnLoginPressed: {
    backgroundColor: cores.laranja,
  },
  erroSolicitacao: {
    color: "#B42318",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
});

export default esqueciSenhaStyle;
