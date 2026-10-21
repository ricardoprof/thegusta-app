import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: cores.branco,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    maxWidth: 440,
  },
  logoMaior: {
    width: 160,
    height: 150,
  },
  btnVoltar:{
    top: 30,
    left: '10%',
    width: 55,
    height: 55,
    backgroundColor: cores.laranjaClaro,
    borderRadius: '50%',
    zIndex: 1,
  },
  imgVoltar:{
    width: 50,
    height: 50,
    margin: 'auto',
  },
  areaConteudo: {
    flex: 1,
  },
  scrollConteudo: {
    flexGrow: 1,
  },    
  separador:{
    backgroundColor: cores.laranja,
    height: 2,
    width: '100%',
    marginVertical: 5,
  },
  footer:{
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderTopColor: cores.laranja,
    borderTopWidth: 2,
    backgroundColor: cores.branco,
  },
  btnFooter:{
    alignItems: 'center',
  },
  iconeFooter:{
    width: 30,
    height: 30,
  },
  txtFooter:{
    fontSize: 11,
    color: cores.cinza,
  },
  txtFooterAtivo:{
    color: cores.laranja
  },
});

export default globalStyle;
