import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const loginStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  logo: {
    width: 195,
    height: 180,
  },
  titulo: {
    marginTop: 30,
    fontSize: 40,
    fontWeight: "bold",
    color: cores.preto,
    textAlign: "center",
    fontFamily: fontes.negrito,
  },
  subtitulo: {
    marginTop: 10,
    fontSize: 20,
    color: cores.cinza,
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
    marginVertical: 10,
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
  btnMostrarSenha: {
    justifyContent: "center",
  },
  mostrarSenha: {
    width: 20,
    height: 20,
    marginVertical: 5,
  },
  btnEsqueciSenha: {
    alignSelf: "flex-end",
  },
  txtEsqueciSenha: {
    fontSize: 12,
    color: cores.laranja,
    textDecorationLine: "underline",
  },
  btnEntrar: {
    width: "80%",
    height: 50,
    backgroundColor: cores.laranja,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  textoEntrar: {
    fontSize: 25,
    color: cores.preto,
    fontWeight: "bold",
  },
  btnEntrarPressed: {
    opacity: 0.8,
  },
  separador: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  linha: {
    flex: 1,
    height: 2,
    backgroundColor: cores.laranja,
  },
  textoSeparador: {
    fontSize: 15,
    color: cores.cinza,
  },
  btnCriar: {
    width: "80%",
    height: 50,
    backgroundColor: cores.laranjaClaro,
    borderColor: cores.laranja,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textoCriar: {
    fontSize: 25,
    color: cores.preto,
    fontWeight: "bold",
  },
  btnCriarPressed: {
    backgroundColor: cores.laranja,
  },
  erroLogin: {
    color: "#CC0000",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
});

export default loginStyle;
