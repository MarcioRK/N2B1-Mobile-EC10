import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pizzaContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10, 
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    // Android Shadow Property
    elevation: 5,
    width: '45%', // Ajuste para aproximadamente metade da largura da tela
    margin: '2.5%', // Adicione uma pequena margem ao redor para espaço entre as pizzas
  },
  pizzaIcon: {
    width: 100,
    height: 100,
    marginBottom: 10, // espaço entre o ícone e o nome da pizza
  },
  pizzaDetails: {
    alignItems: 'center', // centraliza o nome da pizza horizontalmente
    marginBottom: 15, // Adicione esta linha
  },
  pizzaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',  // Mude para vermelho para testes
    textAlign: 'center',
  },      
  pizzaDescription: {
    color: 'gray', // cor de descrição mais clara
    textAlign: 'center', // centraliza a descrição horizontalmente
    marginTop: 5, // espaço entre o nome e a descrição
  },
  actionButtons: {
    flexDirection: 'row',  // Defina a direção para 'row'
    justifyContent: 'space-between',
    width: 70,  // Ajuste a largura conforme necessário para manter os botões espaçados
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,  // Adiciona espaço entre os botões de ação e o texto da quantidade
  },
  actionButtons: {
    flexDirection: 'row',  // Defina a direção para 'row'
    justifyContent: 'space-between',
    width: 100,  // Ajuste conforme necessário
    alignItems: 'center',  // Centraliza verticalmente
  },



  
});

export default styles;
