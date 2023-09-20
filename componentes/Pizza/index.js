import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import styles from './styles';


export default function Pizza({ pizza, removerElemento, editar }) {

    const images = {
        defaultPizzaImage: require('../../assets/Default.webp')
    };


    return (
        <View style={styles.pizzaContainer}>
            <Image style={styles.pizzaIcon} source={images.defaultPizzaImage} />
            <View style={styles.pizzaDetails}>
                <Text style={styles.pizzaName}>{pizza.name}</Text>
                <Text style={styles.pizzaDescription}>{pizza.description}</Text>
                <Text style={styles.pizzaPrice}>R$ {pizza.price}</Text>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => removerElemento(pizza.id)}>
                    <Ionicons style={styles.deleteIcon} name="md-remove-circle" size={32} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editar(pizza.id)}>
                    <Entypo style={styles.editIcon} name="edit" size={32} />
                </TouchableOpacity>
            </View>
        </View>
    );
    
}
