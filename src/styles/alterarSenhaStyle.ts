import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const alterarSenhaStyle = StyleSheet.create({
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

    marginBottom: 10,
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
    overflow: "hidden",
  },

  fotoPerfil: {
    width: "80%",
    height: "80%",
    borderRadius: 100,
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
  btnAlterar: {
    width: 65,
    height: 20,

    borderWidth: 1,
    borderColor: cores.laranja,
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 5,
  },

  txtAlterar: {
    color: cores.laranja,
    fontFamily: fontes.comum,
    fontSize: 8,
  },

  formulario: {
    width: "100%",
    backgroundColor: cores.branco,
    padding: 20,
    borderColor: cores.laranja,
    borderWidth: 2,
    borderRadius: 10,
    gap: 10,
  },

  areaTexto: {
    width: "100%",
    borderColor: cores.laranja,
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    maxHeight: 50,
  },

  input: {
    marginLeft: 10,
    flex: 1,
  },

  tituloCaixa: {
    fontFamily: fontes.negrito,
    color: cores.preto,
    fontSize: 10,
  },

  txtCaixa: {
    fontFamily: fontes.comum,
    color: cores.preto,
    fontSize: 10,
  },

  btnMostrarSenha: {
    justifyContent: "center",
  },
  mostrarSenha: {
    width: 20,
    height: 20,
    marginVertical: 5,
  },

  icone: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },

  iconeOpcao:{
    width: 50,
    height: 50,
  },

  itemOpcao: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingVertical: 20,

    borderWidth: 2,
    borderColor: cores.laranja,
    borderRadius: 10,

    backgroundColor: cores.branco,

    marginVertical: 10,
  },

  areaTextoOpcao: {
    flex: 1,
    marginLeft: 20,
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
     SWITCH
  ============================== */

  itemAtivar: {
    width: 30,
    height: 30,
  },

  /* ==============================
     SAIR
  ============================== */

  btnSalvar: {
    width: "80%",
    height: 30,
    position: "fixed",
    bottom: 50,
    backgroundColor: cores.laranja,

    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 10,

    marginTop: 2,
    marginBottom: 5,
  },

  txtSalvar: {
    fontFamily: fontes.negrito,
    fontSize: 12,
    color: cores.preto,
  },

  btnCancelar: {
    width: "50%",
    height: 30,
    position: "fixed",
    bottom: 10,
    backgroundColor: cores.laranjaClaro,

    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: cores.laranja,
    borderRadius: 10,

    marginTop: 2,
    marginBottom: 5,
  },

  txtCancelar: {
    fontFamily: fontes.negrito,
    fontSize: 12,
    color: cores.preto,
  },
});

export default alterarSenhaStyle;
