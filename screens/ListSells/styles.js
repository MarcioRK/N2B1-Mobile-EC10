import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f6f6f6',
    padding: 15,
  },
  titulo: {
    fontSize: 26,
    marginBottom: 20,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  pedido: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
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
    marginBottom: 5,
  },
  pedidoTexto: {
    fontSize: 16,
    marginBottom: 5,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  pizzaName: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5
  },
  pizzaDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

});

export default styles;