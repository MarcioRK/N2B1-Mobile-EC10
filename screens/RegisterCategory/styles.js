import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  areaBotoes: {
    flexDirection: 'row',
  },
  botaoSalvar: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  botaoLimpar: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  botaoApagarTudo: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  legendaBotao: {
    color: 'white',
  },
  listaUsuarios: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    marginTop: 20,
  },
  tabelaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FF6347',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  usuario: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  listaUsuariosDados: {
    flex: 1,
    fontSize: 16,
    paddingRight: 5,
  },
  listaPrimeiroCampo: {
    width: '30%',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listaSegundoCampo: {
    width: '70%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botoesEdicaoUsuario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    paddingRight: 5,
  }
});

export default styles;
