import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";
import { routePatternToRegex } from "expo-router/build/fork/getStateFromPath-forks";

const detalheProdutoStyle = StyleSheet.create({
  conteudo: {
    marginTop: 50,
    marginBottom: 30,
  },
  header: {
    width: "80%",
    margin: "auto",
  },
  conteudoHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: cores.preto,
    textAlign: "center",
    fontFamily: fontes.negrito,
  },
  btnFavorito: {
    right: 5,
    width: 50,
    height: 50,
    backgroundColor: cores.branco,
    borderRadius: 50,
  },
  iconeFavorito: {
    fontSize: 50,
    color: cores.laranja,
    top: -13,
    right: -5,
  },
  main: {
    width: "80%",
    margin: "auto",
    marginTop: 30,
  },
  imgProduto: {
    width: "100%",
    height: 200,
  },
  categoria: {
    textAlign: "right",
    fontSize: 20,
    fontFamily: fontes.negrito,
    marginTop: 10,
  },
  medidas: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valorProduto: {
    fontSize: 30,
    color: cores.laranja,
    fontFamily: fontes.negrito,
    marginVertical: 10,
  },
  descricao: {
    fontSize: 15,
    color: cores.cinza,
  },
  tituloDescricao: {
    fontSize: 20,
    fontFamily: fontes.negrito,
    marginVertical: 10,
  },
  areaVenda: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  topoVenda: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  caixaQtde: {
    flexDirection: "row",
    width: 120,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.laranja,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: cores.branco,
  },
  btnQtde: {
    width: 20,
    height: 20,
  },
  imgQtde: {
    width: 20,
    height: 20,
  },
  quantidade: {
    fontSize: 30,
    color: cores.cinza,
  },
  subtotal: {
    maxWidth: "50%",
  },
  caixaSubtotal: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  txtSubtotal: {
    fontSize: 15,
    color: cores.cinza,
  },
  valorSubtotal: {
    fontSize: 30,
    color: cores.laranja,
    fontFamily: fontes.negrito,
  },
  btnSubtotal: {
    width: 200,
    height: 30,
    borderRadius: 10,
    backgroundColor: cores.laranja,
    alignItems: "center",
    justifyContent: "center",
  },
  txtSacola: {
    fontSize: 15,
    fontFamily: fontes.negrito,
  },
  erroFavorito: {
    color: "#CC0000",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default detalheProdutoStyle;
