import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const perfilStyle = StyleSheet.create({
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

    backgroundColor: cores.laranjaClaro,

    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  fotoPerfil: {
    width: 50,
    height: 50,
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

  icone: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },

  itemOpcao: {
    width: "100%",
    minHeight: 45,
    maxHeight: 50,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
    paddingVertical: 10,

    borderWidth: 2,
    borderColor: cores.laranja,
    borderRadius: 10,

    backgroundColor: cores.branco,

    marginVertical: 10,
  },

  areaTextoOpcao: {
    flex: 1,
    marginLeft: 10,
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
  erro: {
    color: "red",
    fontFamily: fontes.comum,
    fontSize: 12,
    top: 10,
    left: 130,
    width: 200,
    position: "absolute",
  },
  erroSalvar: {
    color: "red",
    fontFamily: fontes.comum,
    fontSize: 12,
    textAlign: "center",
  },

  // MODAL AQUI
  fundoModalFoto: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalFoto: {
    width: "85%",
    maxWidth: 400,
    backgroundColor: cores.laranjaClaro,
    borderRadius: 15,
    padding: 20,
    borderWidth: 4,
    borderColor: cores.laranja,
  },
  tituloModalFoto: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: cores.laranja,
    fontFamily: fontes.negrito,
  },
  subtituloModalFoto: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
    fontFamily: fontes.comum,
    color: cores.cinza,
  },
  opcaoFoto: {
    padding: 15,
    borderWidth: 1,
    borderColor: cores.laranja,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoOpcaoFoto: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: fontes.comum,
  },
  cancelarFoto: {
    padding: 12,
    margin: "auto",
    marginTop: 5,
    borderWidth: 1,
    borderColor: cores.laranja,
    borderRadius: 10,
    width: "50%",
  },

  textoCancelarFoto: {
    textAlign: "center",
    color: cores.cinza,
    fontFamily: fontes.comum,
  },
});

export default perfilStyle;
