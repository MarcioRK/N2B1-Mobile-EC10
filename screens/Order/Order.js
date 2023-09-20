import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Order({navigation}) {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Order Pizza!</Text>

        <TouchableOpacity style={styles.actionButton}
            onPress={()=>navigation.navigate('SellPizza')}>
            <Text style={styles.buttonText}>Sell Pizza</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}
            onPress={()=>navigation.navigate('ListSells')}>
            <Text style={styles.buttonText}>List Sells</Text>
        </TouchableOpacity>
    </View>
  );
}
