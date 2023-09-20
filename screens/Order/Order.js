import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Order({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Order Pizza!</Text>

      <TouchableOpacity style={styles.actionButton} onPress={()=>navigation.navigate('SellPizza')}>
        <View style={styles.buttonContent}>
          <Icon name="pizza" size={24} color="white" style={{ marginRight: 10 }} /> 
          <Text style={styles.buttonText}>Sell Pizza</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={()=>navigation.navigate('ListSells')}>
        <View style={styles.buttonContent}>
          <Icon name="list" size={24} color="white" style={{ marginRight: 10 }} /> 
          <Text style={styles.buttonText}>List Sells</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
