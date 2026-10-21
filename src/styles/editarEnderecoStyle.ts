import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const editarEnderecoStyle = StyleSheet.create({
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

  formulario:{
    width: '100%',
    backgroundColor: cores.branco,
    padding: 20,
    borderColor: cores.laranja,
    borderWidth: 2,
    borderRadius: 10,
    gap: 10,
  },

  areaTexto:{
    width: '100%',
    borderColor: cores.laranja,
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    maxHeight: 50,
  },

  input:{
    marginLeft: 10,
    flex: 1
  },
  
  tituloCaixa:{
    fontFamily: fontes.negrito,
    color: cores.preto,
    fontSize: 10,
  },

  txtCaixa:{
    fontFamily: fontes.comum,
    color: cores.preto,
    fontSize: 10,
  },

  icone: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: 'contain',
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
    position: 'fixed',
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
    position: 'fixed',
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

export default editarEnderecoStyle;
