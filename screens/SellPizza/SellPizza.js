import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getAllPizzas } from '../../services/dbservices';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react'; // Adicione esta importação no topo

export default function SellPizza() {
    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);

    useFocusEffect(
      useCallback(() => {
          loadPizzas();
      }, [cart])
    );
  
  

  async function loadPizzas() {
    try {
        const pizzasList = await getAllPizzas();
        setPizzas(pizzasList);

        // Mova a validação do carrinho para cá
        const validCartItems = cart.filter(cartItem => {
            return pizzasList.some(pizza => pizza.id === cartItem.id);
        });

        if (validCartItems.length !== cart.length) {
            Alert.alert("Atenção", "Alguns itens no seu carrinho foram removidos do banco de dados e foram excluídos do carrinho.");
            setCart(validCartItems);
        }
    } catch (e) {
        Alert.alert(e.toString());
    }
  }


    function addToCart(pizzaToAdd) {
        const found = cart.find(pizza => pizza.id === pizzaToAdd.id);
        if (found) {
            setCart(cart.map(pizza => 
                pizza.id === pizzaToAdd.id 
                ? { ...pizza, quantity: pizza.quantity + 1 } 
                : pizza
            ));
        } else {
            setCart([...cart, { ...pizzaToAdd, quantity: 1 }]);
        }
    }

    function removeFromCart(pizzaId) {
        const found = cart.find(pizza => pizza.id === pizzaId);
        if (found && found.quantity > 1) {
            setCart(cart.map(pizza => 
                pizza.id === pizzaId 
                ? { ...pizza, quantity: pizza.quantity - 1 } 
                : pizza
            ));
        } else {
            setCart(cart.filter(pizza => pizza.id !== pizzaId));
        }
    }

    useEffect(() => {
        loadPizzas();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Venda de Pizzas!</Text>

            <FlatList 
                data={pizzas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10 }}>
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Button title="Adicionar ao Carrinho" onPress={() => addToCart(item)} />
                    </View>
                )}
            />

            <View style={{ marginTop: 20 }}>
                <Text>Carrinho:</Text>
                {cart.map((pizza, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>{pizza.name} (x{pizza.quantity})</Text>
                        <Button title="Remover" onPress={() => removeFromCart(pizza.id)} />
                    </View>
                ))}
            </View>
        </View>
    );
}
