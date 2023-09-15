import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Order({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Order Pizza!</Text>

        <TouchableOpacity style={styles.Button}
            onPress={()=>navigation.navigate('SellPizza')}>
            <Text>SellPizza</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button}
            onPress={()=>navigation.navigate('ListSells')}>
            <Text>ListSells</Text>
        </TouchableOpacity>
    </View>
  );
}