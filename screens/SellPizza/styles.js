import {StyleSheet, StatusBar, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'orange',
    },
    titulo:{
        fontSize: 30,
        marginBottom: 50,
    },
    botaoVoltar: {
      width: 200, // Defina uma largura fixa, como 200, ou ajuste conforme desejado
      height: 60,
      backgroundColor: '#FF6347', 
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textoBotao: {
        fontSize: 18,
        color: 'black', // ou qualquer outra cor que você queira para o texto
        fontWeight: 'bold'
    },
    finalizarTexto: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default styles;
