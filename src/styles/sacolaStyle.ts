import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const sacolaStyle = StyleSheet.create({
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
  itemSacola:{
    width: '100%',
    // height: 90,
    backgroundColor: cores.branco,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    // alignItems: 'center',
  },
  imgItem:{
    width: '27%',
    height: 50,
    borderRadius: 10,
    margin: 'auto',
  },
  centroItem:{
    width: '45%',
  },
  tituloItem:{
    fontSize: 15,
    color: cores.preto,
    fontFamily: fontes.negrito
  },
  descricaoItem:{
    fontSize: 11,
    color: cores.cinza,
    fontFamily: fontes.comum,
  },
  valoresItem:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  valorUnitItem:{
    fontSize: 11,
    color: cores.preto,
    fontFamily: fontes.negrito
  },
  valorTotalItem:{
    fontSize: 15,
    color: cores.preto,
    fontFamily: fontes.negrito
  },
  direitaItem:{
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '25%',
  },
  btnExcluir:{
    width: 20,
    height: 20,
  },
  imgExcluir:{
    width: 20,
    height: 20,
  },
  caixaQtde: {
    flexDirection: "row",
    width: 50,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: cores.laranja,
    padding: 2,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: cores.branco,
  },
  btnQtde: {
    width: 8,
    height: 8,
  },
  imgQtde: {
    width: 8,
    height: 8,
  },
  quantidade: {
    fontSize: 12,
    color: cores.cinza,
  },
  cupom:{
    width: '100%',
    backgroundColor: cores.branco,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  cupomEsquerdo:{
    width: '70%',
    gap: 5,
  },
  tituloCupom:{
    fontSize: 15,
    color: cores.preto,
    fontFamily: fontes.negrito
  },
  txtCupom:{
    fontSize: 11,
    color: cores.preto,
    borderBottomColor: cores.laranja,
    borderBottomWidth: 2,
    borderLeftColor: cores.laranja,
    borderLeftWidth: 2,
    padding: 2,
    height: 20,
    textTransform: 'uppercase',
  },
  txtAplicar:{
    color: cores.laranja,
    fontFamily: fontes.negrito,
    fontSize: 15
  },
  endereco:{
    width: '100%',
    backgroundColor: cores.branco,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  imgEndereco:{
    width: '15%',
  },
  infoEndereco:{
    width: '80%',
  },
  tituloEndereco:{
    fontFamily: fontes.negrito,
    color: cores.laranja,
    fontSize: 15,
    marginBottom: 5,
  },
  enderecoCompleto:{
    fontFamily: fontes.comum,
    color: cores.preto,
    fontSize: 10,
    marginBottom: 5,
  },
  telefone:{
    fontFamily: fontes.comum,
    color: cores.preto,
    fontSize: 10,
    marginBottom: 5,
  },
  entrega:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  tituloEntrega:{
    fontFamily: fontes.comum,
    color: cores.cinza,
    fontSize: 10,
  },
  tempoEntrega:{
    fontFamily: fontes.negrito,
    color: cores.preto,
    fontSize: 10,
  },  
  txtEndereco:{
    fontFamily: fontes.negrito,
    color: cores.laranja,
    fontSize: 11,
    textDecorationLine: 'underline',
    textDecorationColor: cores.laranja,
  },
  subtotal:{
    width: '100%',
    backgroundColor: cores.branco,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  areaSubtotal:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,   
  },
  txtSubtotal:{
    fontSize: 10,
    color: cores.preto,
  },
  valorSubtotal:{
    fontSize: 11,
    color: cores.preto,
    fontFamily: fontes.negrito,
  },
  areaEntrega:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,   
  },
  txtEntrega:{
    fontSize: 10,
    color: cores.preto,
  },
  valorEntrega:{
    fontSize: 11,
    color: cores.preto,
    fontFamily: fontes.negrito,
  },
  areaDesconto:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',    
  },
  txtDesconto:{
    fontSize: 10,
    color: cores.verde,
  },
  cupomDesconto:{
    fontSize: 10,
    color: cores.verde,
    fontFamily: fontes.negrito,
  },
  valorDesconto:{
    fontSize: 11,
    color: cores.verde,
    fontFamily: fontes.negrito,
  },
  areaTotal:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  txtTotal:{
    fontSize: 10,
    color: cores.preto,
    fontFamily: fontes.negrito,
  },
  valorTotal:{
    fontSize: 11,
    color: cores.laranja,
    fontFamily: fontes.negrito,
  },
  btnPagamento:{
    width: '100%',
    height: 30,
    borderRadius: 10,
    backgroundColor: cores.laranja,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtPagamento:{
    fontFamily: fontes.negrito,
    fontSize: 15,
    color: cores.preto,
  },
});

export default sacolaStyle;