import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Alterado para 'flex-start' para começar do topo
    backgroundColor: '#f6f6f6', // Fundo neutro
    padding: 15, // Padding em todos os lados
  },
  titulo: {
      fontSize: 26,
      marginBottom: 20,
      color: '#d32f2f', // Vermelho escuro
      fontWeight: 'bold',
  },
  botao: {
    width: '100%', // Ocupar toda a largura disponível
    height: 50,
    backgroundColor: '#d32f2f', // Vermelho escuro
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Bordas arredondadas
    marginVertical: 5, // Margem vertical entre botões
  },
  botaoTexto: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  pedido: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15, // Espaço entre os pedidos
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pedidoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5, // Espaço entre o título e o conteúdo do pedido
  },
  pedidoTexto: {
    fontSize: 16,
    marginBottom: 5, // Espaço entre linhas de texto
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c', // Verde escuro (cor de manjericão)
  }
});
  
  export default styles;