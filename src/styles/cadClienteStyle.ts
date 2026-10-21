import { StyleSheet } from "react-native";

import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const cadClienteStyle = StyleSheet.create({
    conteudo:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },    
    titulo:{
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
        color: cores.preto,
        textAlign: 'center',
        fontFamily: fontes.negrito,
    },
    subtitulo:{
        marginTop: 10,
        fontSize: 18,
        color: cores.cinza,
    },
    form:{
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: '5%'
    },
    input:{
        height: 50,
        flexDirection: 'row',
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        width: '100%',
        marginVertical: 10,
        justifyContent: 'space-between',
        backgroundColor: cores.laranjaClaro,
    },
    icone:{
        width: 30,
        height: 30,
        marginRight: 10,
    },
    textInput:{
        width: '100%'
    },
    btnMostrarSenha:{
        justifyContent: 'center'
    },
    mostrarSenha:{
        width: 20,
        height: 20,
        marginVertical: 5,
    },
    termosUso:{
        flexDirection: 'row',
        width: '100%',
    },
    btnTermos:{
        width: 20,
        height: 20,
        marginRight: 10,
    },
    checkTermos:{
        width: '100%',
        height: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 1,
        borderRadius: 5,
    },
    termoAceito:{
        backgroundColor: cores.laranja,
    },
    checkOk:{
        fontSize: 15,
        marginTop: -3,
        marginLeft: -1,
    },
    txtTermos:{
        fontSize: 15,
        color: cores.cinza,
    },
    linkTermos:{
        fontSize: 15,
        color: cores.laranja,
        textDecorationLine: 'underline',
    },
    btnCriar:{
        width: '80%',
        height: 50,
        backgroundColor: cores.laranja,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    textoCriar:{
        fontSize: 25,
        color: cores.preto,
        fontWeight: 'bold',
    },
    btnCriarPressed:{
        opacity: 0.8
    },
    separador:{
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10,
    },
    linha:{
        flex: 1,
        height: 2,
        backgroundColor: cores.laranja,
    },
    textoSeparador:{
        fontSize: 15,
        color: cores.cinza,
    },
    btnTenhoConta:{
        width: '80%',
        height: 50,
        backgroundColor: cores.laranjaClaro,
        borderColor: cores.laranja,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textoTenhoConta:{
        fontSize: 25,
        color: cores.preto,
        fontWeight: 'bold',
    },
    btnTenhoContaPressed:{
        backgroundColor: cores.laranja,
    },

});

export default cadClienteStyle;