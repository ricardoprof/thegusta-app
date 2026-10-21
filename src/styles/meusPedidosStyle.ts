import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const meusPedidosStyle = StyleSheet.create({
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
  posicaoPedido:{
    width: '100%',
    height: 30,
    flexDirection: 'row',
    marginBottom: 10,
  },
  btnAndamento:{
    width: '50%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    backgroundColor: cores.laranja,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtAndamento:{
    fontFamily: fontes.negrito,
    color: cores.preto
  },
  btnEntregue:{
    width: '50%',
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    backgroundColor: cores.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtEntregue:{
    fontFamily: fontes.comum,
    color: cores.preto,
  },
  subtotal:{
    width: '100%',
    backgroundColor: cores.branco,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  topoSubtotal:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  imgSubtotal:{
    width: 30,
    height: 30,
  },
  resumoPedido:{
    justifyContent: 'flex-start',
    width: '85%',
  },
  topoPedido:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tituloSubtotal:{
    fontFamily: fontes.negrito,
    color: cores.laranja,
    fontSize: 15,
    marginBottom: 5,
  },
  statusPedido:{
    flexDirection: 'row',
    backgroundColor: cores.laranjaClaro,
    width: 120,
    height: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,    
  },
  imgStatus:{
    width: 15,
    height: 15,
  },
  txtStatus:{
    fontFamily: fontes.comum,
    fontSize: 11,
    color: cores.laranja,
  },
  areaResumo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resumo:{
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  itemResumo:{
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgProduto:{
    width: 25,
    height: 15,
  },
  nomeProduto:{
    fontSize: 11,
    color: cores.preto,
    fontFamily: fontes.negrito,
  }, 
  imgResumo:{
    width: 50,
    height: 50,
    marginRight: 25,
  },
  rodapeResumo:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  areaTotal:{
    justifyContent: 'space-between',
    width: '30%',
  },
  txtTotal:{
    fontSize: 11,
    color: cores.preto,
    fontFamily: fontes.negrito,
  },
  valorTotal:{
    fontSize: 15,
    color: cores.laranja,
    fontFamily: fontes.negrito,
  },
  areaPrevisao:{
    justifyContent: 'space-between',
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgPrevisao:{
    width: 20,
    height: 20,
  },
  tempoPrevisao:{
    marginLeft: 10,
  },
  txtPrevisao:{
    fontSize: 11,
    color: cores.cinza,
    fontFamily: fontes.comum,
  },
  txtTempoPrevisao:{
    fontSize: 11,
    color: cores.preto,
    fontFamily: fontes.negrito,
  },
  btnPedido:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnDetalhes:{
    width: '30%',
    height: 20,
    borderRadius: 5,
    backgroundColor: cores.branco,
    borderColor: cores.laranja,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtDetalhes:{
    fontFamily: fontes.comum,
    fontSize: 11,
    color: cores.laranja,
  },
  btnRastrear:{
    width: '30%',
    height: 20,
    borderRadius: 5,
    backgroundColor: cores.laranja,
    borderColor: cores.laranja,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtRastrear:{
    fontFamily: fontes.comum,
    fontSize: 11,
    color: cores.preto,
  },
});

export default meusPedidosStyle;