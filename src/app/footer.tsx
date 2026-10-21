import { router, usePathname } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import globalStyle from "@/styles/globalStyle";

export default function FooterScreen() {
  const pathname = usePathname();
  function menuAtivo(rota: string){
    return pathname === rota;
  }

  return (
    <View style={globalStyle.footer}>
      <Pressable 
        style={globalStyle.btnFooter}
        onPress={() => router.navigate('/home')}>
        <Image
          source={require("@/assets/images/img/icones/home.png")}
          style={globalStyle.iconeFooter}
        />
        <Text style={[globalStyle.txtFooter, menuAtivo("/home") && globalStyle.txtFooterAtivo]}>Home</Text>
      </Pressable>
      <Pressable 
        style={globalStyle.btnFooter}
        onPress={() => router.navigate('/cardapio')}>
        <Image
          source={require("@/assets/images/img/icones/cardapio.png")}
          style={globalStyle.iconeFooter}
        />
        <Text style={[globalStyle.txtFooter, menuAtivo("/cardapio") && globalStyle.txtFooterAtivo]}>Cardápio</Text>
      </Pressable>
      <Pressable 
        style={globalStyle.btnFooter}
        onPress={() => router.navigate('/sacola')}>
        <Image
          source={require("@/assets/images/img/icones/sacola.png")}
          style={globalStyle.iconeFooter}
        />
        <Text style={[globalStyle.txtFooter, menuAtivo("/sacola") && globalStyle.txtFooterAtivo]}>Sacola</Text>
      </Pressable>
      <Pressable 
        style={globalStyle.btnFooter}
        onPress={() => router.navigate('/meus-pedidos')}>
        <Image
          source={require("@/assets/images/img/icones/pedido.png")}
          style={globalStyle.iconeFooter}
        />
        <Text style={[globalStyle.txtFooter, menuAtivo("/meus-pedidos") && globalStyle.txtFooterAtivo]}>Pedidos</Text>
      </Pressable>
      <Pressable 
        style={globalStyle.btnFooter}
        onPress={() => router.navigate('/config')}>
        <Image
          source={require("@/assets/images/img/icones/config.png")}
          style={globalStyle.iconeFooter}
        />
        <Text style={[globalStyle.txtFooter, menuAtivo("/config") && globalStyle.txtFooterAtivo]}>Config</Text>
      </Pressable>
    </View>
  );
}
