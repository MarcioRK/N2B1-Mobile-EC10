import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  finalizeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
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
  finalizeButton: {
    width: windowWidth * 0.8,
    height: 55,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});

export default styles;
