import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const cardapioStyle = StyleSheet.create({
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
    marginTop: 30,
  },
  buscarProduto:{
    width: '100%',
    height: 50,
    borderColor: cores.laranja,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: cores.laranjaClaro,
  },
  txtProduto:{
    marginVertical: 'auto',
    color: cores.preto,
    fontSize: 15,
    width: '100%',
  },
  btnBuscar:{
    width: 30,
    height:30,
  },
  imgBuscar:{
    width: '100%',
    height: '100%',
  },
  conteudoCategoria:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    flexWrap: 'wrap',
    gap: 5,
  },
  itemCategoria:{
    width: 100,
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    paddingVertical: 3,
    paddingHorizontal: 2,
    alignItems: 'center',
    backgroundColor: cores.laranja,
  },
  txtCategoria:{
    fontSize: 15,
    fontFamily: fontes.comum,
    color: cores.branco,
  },
  categorias:{
    marginTop: 20,
    width: '100%',    
  },
  tituloCategoria:{
    fontSize: 20,
    fontFamily: fontes.negrito,
  },
  produtos:{
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: '4%',
    marginVertical: 10,
  },
  itemProduto:{
    width: '47%',
    height: 180,
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: cores.branco,
  },
  caixaImagem:{
    width: '100%',
  },
  imgDestaque:{
    width: '100%',
    height: 70,
    borderRadius: 10,
  },
  btnFavorito:{
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    backgroundColor: cores.branco,
    borderRadius: 50,
  },
  iconeFavorito:{
    fontSize: 20,
    color: cores.laranja,
    top: -6,
    right: -2,
  },
  nomeProduto:{
    fontSize: 12,
    fontFamily: fontes.negrito,
    color: cores.preto,
    textAlign: 'center',
  },
  descricaoProduto:{
    fontSize: 10,
    color: cores.cinza,
    textAlign: 'center',
    marginVertical: 5,
    overflow: 'hidden',
  },
  valorContainer:{
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  valorProduto:{
    fontSize: 12,
    fontFamily: fontes.negrito,
    color: cores.laranja,
  },
  btnAdicionar:{
    width: 15,
    height: 15,
  },
  imgAdicionar:{
    width: '100%',
    height: '100%',
  },
  semProduto:{
    width: '100%',
    justifyContent: 'center',
  },
  txtSemProduto:{
    fontFamily: fontes.negrito,
    fontSize: 18,
    color: cores.cinza,
    textAlign: 'center',
  },
});

export default cardapioStyle;