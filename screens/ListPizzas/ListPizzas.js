import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import {
  getAllPizzas,
  deletePizza,
  getAllCategories,
} from '../../services/dbservices';

import { useState, useCallback } from 'react';
import Pizza from '../../componentes/Pizza/index';
import { useNavigation } from '@react-navigation/native';

export default function ListPizzas({ addPizza }) {

  const navigation = useNavigation();

  const [pizzas, setPizzas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  async function loadCategories() {
    try {
      const categoriesList = await getAllCategories();
      console.log("Fetched categories:", categoriesList);
      setCategories(categoriesList);
    } catch (e) {
      console.error(e);
    }
  }

  function editarPizza(pizza) {
    navigation.navigate('RegisterPizza', { pizza });
  }

  async function loadPizzas(category) {
    try {
      let pizzasList = await getAllPizzas();

      console.log("Todas as pizzas:", pizzasList);
      console.log("Categoria selecionada:", category);

      if (category) {
        pizzasList = pizzasList.filter(pizza => pizza.categorie === category);
      }

      console.log("Pizzas filtradas:", pizzasList);

      setPizzas(pizzasList);
    } catch (e) {
      console.error(e);
    }
  }

  useFocusEffect(
    useCallback(() => {
      setSelectedCategory(null);
      loadPizzas();
      loadCategories();
      return () => { };
    }, [])
  );

  function removerElemento(identificador) {
    efetivaRemoverContato(identificador)
  }

  async function efetivaRemoverContato(identificador) {
    try {
      await deletePizza(identificador);
      await loadPizzas();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pizzas}
        ListHeaderComponent={
          <>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={styles.pickerTitle}>Filtrar por categoria</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCategory}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedCategory(itemValue);
                    loadPizzas(itemValue);
                  }}
                >
                  <Picker.Item label="All" value={null} />
                  {categories.map(cat => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
                  ))}
                </Picker>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <Pizza
            pizza={item}
            removerElemento={removerElemento}
            editar={() => editarPizza(item)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
}
