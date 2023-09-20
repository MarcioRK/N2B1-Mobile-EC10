import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'orange',
      paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 30,
        marginBottom: 50,
        fontWeight: 'bold',
        color: 'white'
    },
    actionButton: {
      backgroundColor: '#00ffff',
      borderRadius: 25,
      paddingHorizontal: 40,
      paddingVertical: 15,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    }
});

export default styles;
