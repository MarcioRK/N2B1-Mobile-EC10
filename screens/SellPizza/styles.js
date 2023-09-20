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
      height: 55,
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
    finalizeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    pickerContainer: {
      marginVertical: 20,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      overflow: 'hidden'
  },
  pickerStyle: {
      height: 50,
      width: 250,
      backgroundColor: '#f0f0f0'
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20
  },
  pickerItemStyle: {
      height: 50,
      color: 'black',
      fontSize: 16
  },
  finalizeButton: {
    width: windowWidth * 0.8, // 80% da largura da tela
    height: 55,
    backgroundColor: '#FF6347', 
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Para alinhar ícones e texto horizontalmente
    marginVertical: 20, // Adiciona uma margem vertical para separá-lo da lista
    elevation: 3, // Adiciona sombra no Android
    shadowOffset: { width: 0, height: 3 }, // Adiciona sombra no iOS
    shadowOpacity: 0.3, // Transparência da sombra
    shadowRadius: 3, // Raio da sombra
}

  
});

export default styles;
