import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/Pizza-illustration-on-transparent-background-PNG.png')} style={styles.pizzaImage} />
            <Text style={styles.title}>Prime Pizzas</Text>
            <Text style={styles.slogan}>Sabor inigualável em cada pedaço!</Text>
        </View>
    );
}
