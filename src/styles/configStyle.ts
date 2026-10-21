import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const configStyle = StyleSheet.create({

  scrollContent: {
    paddingBottom: 15,
  },

  conteudo: {
    width: "100%",
    marginTop: 45,
    marginBottom: 10,
  },

  /* ==============================
     CABEÇALHO
  ============================== */

  header: {
    width: "82%",
    alignSelf: "center",
    position: "relative",
    paddingTop: 25,
  },

  logo: {
    width: 78,
    height: 70,
    position: "absolute",
    right: 0,
    top: -18,
  },

  titulo: {
    fontSize: 28,
    fontFamily: fontes.negrito,
    color: cores.preto,
    marginTop: 5,
  },

  subtitulo: {
    fontSize: 15,
    fontFamily: fontes.comum,
    color: cores.cinza,
    marginTop: 7,
  },


  /* ==============================
     CONTEÚDO
  ============================== */

  main: {
    width: "82%",
    alignSelf: "center",
    marginTop: 15,
  },


  /* ==============================
     CLIENTE
  ============================== */

  areaCliente: {
    width: "100%",
    minHeight: 82,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: cores.branco,

    borderWidth: 2,
    borderColor: cores.laranja,
    borderRadius: 12,

    paddingHorizontal: 10,
    paddingVertical: 8,

    marginBottom: 12,
  },

  avatar: {
    width: 62,
    height: 62,

    borderRadius: 31,

    borderWidth: 2,
    borderColor: cores.laranja,

    backgroundColor: "#FFF2DF",

    justifyContent: "center",
    alignItems: "center",
  },
  perfil: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  textoCliente: {
    flex: 1,
    marginLeft: 12,
  },

  nomeCliente: {
    fontFamily: fontes.negrito,
    fontSize: 18,
    color: cores.preto,
  },

  descricaoCliente: {
    fontFamily: fontes.comum,
    fontSize: 9,
    color: cores.cinza,
    marginTop: 6,
  },


  /* ==============================
     SEÇÕES
  ============================== */

  tituloSecao: {
    fontFamily: fontes.negrito,
    fontSize: 17,
    color: cores.preto,

    marginBottom: 5,
    marginTop: 2,
  },

  areaOpcoes: {
    width: "100%",

    backgroundColor: cores.branco,

    borderWidth: 2,
    borderColor: cores.laranja,
    borderRadius: 10,

    overflow: "hidden",

    marginBottom: 10,
  },


  /* ==============================
     ITEM
  ============================== */

  itemOpcao: {
    width: "100%",
    minHeight: 45,
    maxHeight: 50,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
    paddingVertical: 10,

    borderBottomWidth: 1,
    borderBottomColor: cores.laranja,

    backgroundColor: cores.branco,
  },

  ultimoItem: {
    borderBottomWidth: 0,
  },

  icone: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  areaTextoOpcao: {
    flex: 1,
    marginLeft: 3,
  },

  tituloOpcao: {
    fontFamily: fontes.negrito,
    fontSize: 12,
    color: cores.preto,
  },

  descricaoOpcao: {
    fontFamily: fontes.comum,
    fontSize: 9,
    color: cores.cinza,
    marginTop: 1,
  },


  /* ==============================
     INSTALAR
  ============================== */

  btnInstalar: {
    width: 65,
    height: 20,

    borderWidth: 1,
    borderColor: cores.laranja,
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 5,
  },

  txtInstalar: {
    color: cores.laranja,
    fontFamily: fontes.comum,
    fontSize: 8,
  },


  /* ==============================
     SWITCH
  ============================== */

  itemAtivar: {
    width: 30,
    height: 30,
  },

  setaOpcao:{
    color: cores.laranja,
    fontFamily: fontes.negrito,
  },

  /* ==============================
     SAIR
  ============================== */

  btnSair: {
    width: "75%",
    height: 30,

    backgroundColor: cores.laranja,

    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 8,

    marginTop: 2,
    marginBottom: 5,
  },

  txtSair: {
    fontFamily: fontes.negrito,
    fontSize: 12,
    color: cores.preto,
  },

});

export default configStyle;