import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffebcd',
    },
    title: {
        fontSize: 40,
        marginBottom: 20,
        color: 'orange',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    slogan: {
        fontSize: 20,
        color: '#d35400', 
        fontStyle: 'italic',
    },
    pizzaImage: {
        width: 220,  
        height: 220,
        resizeMode: 'contain',
        marginBottom: 30,
    }
});

export default styles;
