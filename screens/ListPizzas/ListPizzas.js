import { Text, View, Alert, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

import {
  createPizzasTable,
  createRecord,
  getAllPizzas,
  addPizza,
  updatePizza,
  deletePizza,
  deleteAllPizzas,
} from '../../services/dbservices';
import { useState, useEffect, useCallback } from 'react';
import Pizza from '../../componentes/Pizza/index';
import { useNavigation } from '@react-navigation/native';



export default function ListPizzas({addPizza}) {

  const navigation = useNavigation();

  const [pizzas, setPizzas] = useState([]);

  function editarPizza(pizza) {
    navigation.navigate('DisplayPizza', { pizza });
  }

  async function loadPizzas() {
    try {
      const pizzasList = await getAllPizzas();
      setPizzas(pizzasList);
    } catch (e) {
      // Alert.alert(e.toString());
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPizzas();
      return () => {}; // função de retorno opcional para limpar efeitos colaterais.
    }, [])
  );

  function removerElemento(identificador) {
    //Alert.alert('Atenção', 'Confirma a remoção do contato?',
      // [
      //   {
      //     text: 'Sim',
      //     onPress: () => efetivaRemoverContato(identificador),
      //   },
      //   {
      //     text: 'Não',
      //     style: 'cancel',
      //   }
      // ]);

      efetivaRemoverContato(identificador)
  }

  async function efetivaRemoverContato(identificador) {
    try {
      await deletePizza(identificador);
      // Keyboard.dismiss();
      // limparCampos();
      await loadPizzas();
      //Alert.alert('Contato apagado com sucesso!!!');
    } catch (e) {
      //Alert.alert(e);
    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <Text>ListPizzas!</Text>
        
        <FlatList 
          data={pizzas}
          renderItem={({ item }) => (
            <Pizza
              pizza={item}
              removerElemento={removerElemento}
              editar={() => editarPizza(item)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Configuração para exibir 2 itens por linha
          contentContainerStyle={{ alignItems: 'center' }} 
        />

        {/* Restante do seu código ... */}
      </View>
    </ScrollView>
  );
}
