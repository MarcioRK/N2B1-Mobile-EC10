import {react} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Home({navigation}){
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Prime Pizzas</Text>

            <TouchableOpacity style={styles.Button}
                onPress={()=>navigation.navigate('ListPizzas')}>
                <Text>Listar pizzas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button}
                onPress={()=>navigation.navigate('RegisterPizza')}>
                <Text>Cadastrar pizza</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button}
                onPress={()=>navigation.navigate('RegisterCategory')}>
                <Text>Registrar categoria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button}
                onPress={()=>navigation.navigate('SellPizza')}>
                <Text>Realizar venda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button}
                onPress={()=>navigation.navigate('ListSells')}>
                <Text>Listar vendas</Text>
            </TouchableOpacity>

        </View>

    );
}