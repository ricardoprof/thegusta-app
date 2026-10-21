import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const homeStyle = StyleSheet.create({
  conteudo:{
    marginTop: 60,
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
  bordaPerfil: {
    padding: 15,
    borderColor: cores.laranja,
    borderRadius: "50%",
    borderWidth: 2,
    backgroundColor: cores.laranjaClaro,
  },
  perfil: {
    width: 50,
    height: 50,
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
  banner:{
    width: '100%',
    height: 160,
    borderRadius: 20,
    marginTop: 30,
  },
  categoria:{
    width: '100%',
    marginTop: 30,
  },
  tituloSecao:{
    fontSize: 30,
    fontFamily: fontes.negrito,
    marginBottom: 10,
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
  destaque:{
    width: '100%',
    marginTop: 30,
  },  
  conteudoDestaque:{
    width: '100%',
    gap: 10,
    flexGrow: 1,
  },
  itemDestaque:{
    width: 110,
    height: 150,
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: cores.laranjaClaro,
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
    color: cores.preto,
  },
  btnAdicionar:{
    width: 15,
    height: 15,
  },
  imgAdicionar:{
    width: '100%',
    height: '100%',
  },
  semDestaque:{
    width: '100%',
    justifyContent: 'center',
  },
  txtSemDestaque:{
    fontFamily: fontes.negrito,
    fontSize: 18,
    color: cores.cinza,
    textAlign: 'center',
  },

});
export default homeStyle;
