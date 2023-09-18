import { Text, View, Alert, Button, TouchableOpacity } from 'react-native';
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ListPizzas!</Text>
      
      {pizzas && pizzas.length > 0 ? (
        <View>
          {pizzas.map((pizza, index) => (
            <Pizza 
            key={index} 
            pizza={pizza} 
            removerElemento={removerElemento}
            editar={() => editarPizza(pizza)}
            />
          ))}
        </View>
      ) : (
        <Text>No pizzas available.</Text>
      )}


      <TouchableOpacity style={styles.botao} onPress={() => loadPizzas()}>
        <Text style={styles.textoBotao}>Recarregar Teste</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => createPizzasTable()}>
        <Text style={styles.textoBotao}>createTable Teste</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => deleteAllPizzas()}>
        <Text style={styles.textoBotao}>deleteAllContacts Teste</Text>
      </TouchableOpacity>


      
    </View>
  );
}
