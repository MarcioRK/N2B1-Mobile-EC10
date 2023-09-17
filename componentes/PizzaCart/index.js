import {
    Text,TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function PizzaCart({pizza, removerElemento, editar}) {
   return (
       <View style={styles.pizza} >

           <Text style={styles.listaNome}> {pizza.nome}</Text>
           
            <Text style={styles.listaTelefone} >{pizza.description} </Text>

           <View style={styles.dadosBotoesAcao}>
               <TouchableOpacity onPress={() => removerElemento(pizza.id)}>
                   <Ionicons name="md-remove-circle" size={32} color="red" />
               </TouchableOpacity>

               <TouchableOpacity onPress={() => adicionarElemento(pizza.id)}>
                   <Entypo name="plus" size={32} color="black" />
               </TouchableOpacity>

           </View>
       </View>
   );

};