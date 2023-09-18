import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Cor de fundo branca
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc', // Cor da borda cinza
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8, // Borda arredondada
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  picker: {
    width: '80%',
    height: 40,
    marginBottom: 20,
    borderColor: '#ccc', // Cor da borda cinza
    borderWidth: 1,
    borderRadius: 8, // Borda arredondada
  },
  button: {
    backgroundColor: '#FF6347', // Cor laranja (ou outra de sua escolha)
    width: '80%', // Largura definida
    height: 50, // Altura definida
    justifyContent: 'center', // Centralizar conteúdo verticalmente
    alignItems: 'center', // Centralizar conteúdo horizontalmente
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // Cor do texto branco
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
