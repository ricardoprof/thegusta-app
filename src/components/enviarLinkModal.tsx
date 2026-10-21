import { Modal, View, Text, ScrollView, Pressable } from "react-native";

import enviarLinkStyle from "@/styles/enviarLinkStyle";

interface EnviarLinkProps {
  visible: boolean;
  onClose: () => void;
}

export default function EnviarLinkModal({
     visible, onClose 
    }: EnviarLinkProps) {
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={enviarLinkStyle.sobrepor}>
        <View style={enviarLinkStyle.conteudo}>
          <Text style={enviarLinkStyle.titulo}>Enviar link</Text>

          <ScrollView style={enviarLinkStyle.scroll}>
              <Text style={enviarLinkStyle.texto}>Caso este e-mail esteja cadastrado em nosso sistema, você receberá um link de redefinição por e-mail.</Text>

              <Text style={enviarLinkStyle.subtitulo}>Validade do link (10 minutos).</Text>                
          </ScrollView>

          <Pressable style={enviarLinkStyle.btnOK} onPress={onClose}>
            <Text style={enviarLinkStyle.txtOK}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
