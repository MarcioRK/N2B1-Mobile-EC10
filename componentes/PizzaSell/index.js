import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import styles from './styles';


export default function PizzaSell({ pizza, quantity, LeftAction, RightAction  }) {

    const images = {
        defaultPizzaImage: require('../../assets/Default.webp')
    };


    return (
        <View style={styles.pizzaContainer}>
            
            {/* Parte da Imagem */}
            <Image style={styles.pizzaIcon} source={ images.defaultPizzaImage } />
            
            {/* Detalhes da Pizza */}
            <View style={styles.pizzaDetails}>
                <Text style={styles.pizzaName}>{pizza.name}</Text>
                <Text style={styles.pizzaDescription}>{pizza.description}</Text>
                <Text style={styles.pizzaDescription}>R$ {pizza.price}</Text>
            </View>

            {/* Botões de Ação */}
            <View style={styles.actionButtons}>
                {LeftAction && <LeftAction pizza={pizza} />}
                <Text style={styles.quantityText}>{quantity}</Text>
                {RightAction && <RightAction pizza={pizza} />}
            </View>
        </View>
    );
}
