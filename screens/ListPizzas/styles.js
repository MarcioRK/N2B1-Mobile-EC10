import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  screenAll: {
    flex: 1,
    backgroundColor: "#ffebcd",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  titulo: {
    fontSize: 30,
    marginBottom: 50,
  },
  botaoVoltar: {
    width: 120,
    height: 60,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center'
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
    marginBottom: 10
  }



});

export default styles;