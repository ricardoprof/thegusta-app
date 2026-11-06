import { StyleSheet, Dimensions } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";
import { Color } from "expo-router";

const enderecosStyle = StyleSheet.create({
  conteudo:{
    marginTop: 50,
    marginBottom: 30,
  },
  header:{
    width: '80%',
    margin: "auto",
  },
  conteudoHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: '100%',
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: cores.preto,
    textAlign: "center",
    fontFamily: fontes.negrito,
  },  
  logo: {
    width: 80,
    height: 75,
  },
  subtitulo: {
    marginTop: 10,
    fontSize: 18,
    color: cores.cinza,
  },
  main:{
    width: '80%',
    margin: "auto",
    marginTop: 15,
  },
  areaEndereco:{
    width: '100%',
    backgroundColor: cores.branco,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  endereco:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  areaIcone:{
    width: '17%',
    aspectRatio: 1,
    borderRadius: '50%',
    borderWidth: 2,
    borderColor: cores.laranja,
    padding: 10,
    backgroundColor: cores.laranjaClaro,
  },
  icone:{
    width: '100%',
    height: '100%',
  },
  infoEndereco:{
    marginHorizontal: 10,
    width: '45%',
  },
  nomeEndereco:{
    fontFamily: fontes.negrito,
    color: cores.preto,
    fontSize: 20,
    marginBottom: 5,  
  },
  localCompleto:{
    fontFamily: fontes.comum,
    color: cores.cinza,
    fontSize: 11,
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  btnFavorito:{
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '28%',
    height: '100%',
    alignItems: 'flex-end'
  },
  iconeFavoritoAtivo:{
    height: 20,
    fontSize: 50,
    marginTop: -20,
    color: cores.laranja
  },
  txtFavoritoAtivo:{    
    fontFamily: fontes.negrito,
    textAlign: 'center',
    paddingVertical: 5,    
    width: '100%',
    color: cores.verde,
    backgroundColor: cores.verdeClaro,
    borderColor: cores.verde,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 11,
    marginBottom: 5,
  },    
  iconeFavoritoInativo:{
    height: 20,
    fontSize: 50,
    marginTop: -20,
    color: cores.laranja
  },
  txtFavoritoInativo:{    
    fontFamily: fontes.comum,
    textAlign: 'center',
    paddingVertical: 5,    
    width: '100%',
    color: cores.laranja,
    backgroundColor: cores.laranjaClaro,
    borderColor: cores.laranja,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 11,
    marginBottom: 5,
  },
  botoes:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  btnEditar:{
    width: 100,
    height: 30,
    borderRadius: 5,
    borderColor: cores.laranja,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtEditar:{
    color: cores.laranja,
    fontFamily: fontes.comum,
    fontSize: 15,
  },
  btnExcluir:{
    width: 100,
    height: 30,
    borderRadius: 5,
    borderColor: cores.cinza,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtExcluir:{
    color: cores.cinza,
    fontFamily: fontes.comum,
    fontSize: 15,
  },
  btnCadastrar:{
    width: 200,
    height: 30,
    borderRadius: 5,
    borderColor: cores.laranja,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 10,
    backgroundColor: cores.laranja
  },
  txtCadastrar:{
    color: cores.preto,
    fontFamily: fontes.comum,
    fontSize: 15,
  },
});

export default enderecosStyle;