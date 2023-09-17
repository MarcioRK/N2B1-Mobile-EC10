import { Text, View, Button, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

import {
  createTable,
  createRecord,
  getAllPizzas,
  addContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} from '../../services/dbservices';
import { useState, useEffect, Alert, useCallback } from 'react';


export default function ListPizzas({addPizza}) {

  const [pizzas, setPizzas] = useState([]);

  async function loadPizzas() {
    try {
      const pizzasList = await getAllPizzas();
      setPizzas(pizzasList);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPizzas();
      return () => {}; // função de retorno opcional para limpar efeitos colaterais.
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ListPizzas!</Text>
      
      {pizzas && pizzas.length > 0 ? (
        <View>
          {pizzas.map((pizza, index) => (
            <View key={index}>
              <Text>ID: {pizza.id}</Text>
              <Text>Name: {pizza.name}</Text>
              <Text>Description: {pizza.description}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>No pizzas available.</Text>
      )}


      <TouchableOpacity style={styles.botao} onPress={() => loadPizzas()}>
        <Text style={styles.textoBotao}>Recarregar Teste</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => createTable()}>
        <Text style={styles.textoBotao}>createTable Teste</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => deleteAllContacts()}>
        <Text style={styles.textoBotao}>deleteAllContacts Teste</Text>
      </TouchableOpacity>


      
    </View>
  );
}
