import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import styles from './styles';


export default function Pizza({ pizza, removerElemento, editar }) {

    const images = {
        defaultPizzaImage: require('../../assets/Default.webp'),
        pizzaItaliana: require('../../assets/ai-pizza-italiana-generativa-em-branco_87742-28304.webp'),
        pizzaItaliana: require('../../assets/ai-pizza-italiana-generativa-em-branco_87742-28304.webp'),
        pizzaComFrangoTomateEQueijo: require('../../assets/deliciosa-pizza-com-frango-tomate-e-queijo-com-sal-e-molho-sobre-um-fundo-escuro-de-concreto_73989-49842.webp'),
        pizzaItalianaClassicaComMozzarella: require('../../assets/deliciosa-pizza-italiana-classica-com-mozzarella_79762-2653.webp'),
        pizzaItalianaClassicaComMozzarella2: require('../../assets/deliciosa-pizza-italiana-classica-com-mozzarella_79762-2656.webp'),
        pizzaItalianaComTomateAzeitonasCalabresaECogumelos: require('../../assets/deliciosa-pizza-italiana-com-tomate-azeitonas-calabresa-e-cogumelos-vista-superior-isolada-no-fundo-branco-ainda-vida-copiar-espaco_639032-291.webp'),
        pizzaItalianaComTomateAzeitonasCalabresaECogumelos2: require('../../assets/deliciosa-pizza-italiana-com-tomate-azeitonas-calabresa-e-cogumelos-vista-superior-isolada-no-fundo-branco-ainda-vida-copiar-espaco.jpg')
    };


  return (
    <View style={styles.pizzaContainer}>
        <Image style={styles.pizzaIcon} source={images[pizza.imagePath] || images.defaultPizzaImage} />
        <View style={styles.pizzaDetails}>
            <Text style={styles.pizzaName}>{pizza.name}</Text>
            <Text style={styles.pizzaDescription}>{pizza.description}</Text>
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
