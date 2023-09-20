import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#d32f2f',
        marginBottom: 20,
        textAlign: 'center'
    },
    cartItem: {
      flexDirection: 'column', // Mude para 'column'
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      marginVertical: 5,
      borderColor: '#e0e0e0',
      borderWidth: 1
  },
  itemName: {
      fontSize: 18,
      fontWeight: '500'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24 
},
quantityText: {
  fontSize: 16,
  marginHorizontal: 10  // Adiciona margens uniformes em ambos os lados
},
  iconButton: {
    height: 24,  // Ajustado para corresponder ao tamanho dos ícones
    justifyContent: 'center' // Alinha o ícone verticalmente no centro
},
    finalizeButton: {
        backgroundColor: '#d32f2f',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    finalizeText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    detailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5 
  },
  priceText: {
    fontSize: 16,
    color: '#555',
    marginRight: 10
},
  totalText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#d32f2f',
      marginBottom: 20,
      marginTop: 10,
      textAlign: 'center'
  }
});

export default styles;
