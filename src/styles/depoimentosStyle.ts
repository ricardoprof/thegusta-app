import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const depoimentosStyle = StyleSheet.create({
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
    marginBottom: 10,
  },

  areaTitulo:{
    flexDirection: 'row',
    alignItems: 'center',    
  },

  iconeTitulo:{
    width: 40,
    height: 40,
    marginRight: 25,
  },  

  tituloForm:{
    fontSize: 20,
    fontFamily: fontes.negrito,
    color: cores.laranja,
  },

  areaAvaliacao:{
    width: '100%',

  },
  
  tituloCaixa:{
    fontFamily: fontes.negrito,
    color: cores.preto,
    fontSize: 15,
    marginBottom: 10,
  },

  estrelas:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  
  estrela:{
    color: cores.laranja,
    fontSize: 40,
    marginTop: -20,
  },
  estrelasAvaliacao:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  estrelaAvaliacao:{
    color: cores.laranja,
    fontSize: 25,
    marginTop: -15,
  },
  areaDepoimento:{
    width: '100%',
  },
  areaTexto:{
    width: '100%',
    borderColor: cores.laranja,
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
  },

  input:{
    marginLeft: 10,
    flex: 1
  },  

  txtCaixa:{
    fontFamily: fontes.comum,
    color: cores.preto,
    fontSize: 10,
    width: '100%',
    minHeight: 100,
    maxHeight: 100,
    textAlignVertical: 'top',
  },

  txtCaixaAvaliacao:{
    fontFamily: fontes.comum,
    color: cores.preto,
    fontSize: 10,
    width: '100%',
    textAlignVertical: 'top',
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

export default depoimentosStyle;
