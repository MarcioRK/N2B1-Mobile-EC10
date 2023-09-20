import {StyleSheet, StatusBar} from 'react-native';

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
    botaoVoltar:{
      width: 120,
      height: 60,
        backgroundColor: '#00ffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
      marginVertical: 20,
      borderColor: '#000', // Cor da borda
      borderWidth: 1, // Largura da borda
      borderRadius: 10, // Raio da borda para arredondar os cantos
      overflow: 'hidden' // Garante que o conteúdo interno não ultrapasse os cantos arredondados
  },
  pickerStyle: {
      height: 50,
      width: 250,  // Aumente a largura se necessário
      backgroundColor: '#f0f0f0'  // Cor de fundo para o picker
  }
  
  });
  
  export default styles;