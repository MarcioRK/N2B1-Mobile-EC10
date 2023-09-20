import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffebcd',  // A light color for background
    },
    title: {
        fontSize: 40,  // Increased font size
        marginBottom: 20,
        color: 'orange',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',  // Shadow color
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    slogan: {
        fontSize: 20,
        color: '#d35400',  // A darker shade of orange
        fontStyle: 'italic',
    },
    pizzaImage: {
        width: 220,  // Slightly increased size
        height: 220,
        resizeMode: 'contain',
        marginBottom: 30,
    }
});

export default styles;
