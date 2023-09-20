import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getAllPizzas, saveOrder, getAllCategories } from '../../services/dbservices';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react'; // Adicione esta importação no topo
import PizzaSell from '../../componentes/PizzaSell/index'; // Ajuste o caminho conforme a estrutura do seu projeto.
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Certifique-se de ter essa importação



export default function SellPizza() {
    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]); // Estado para armazenar todas as categorias
    const [selectedCategory, setSelectedCategory] = useState(null); // Estado para armazenar a categoria selecionada


    const navigation = useNavigation();


    useFocusEffect(
      useCallback(() => {
          loadPizzas();
          loadCategories();
      }, [cart])
    );

    async function loadCategories() {
        try {
            const categoriesList = await getAllCategories();
            setCategories(categoriesList);
        } catch (e) {
            console.error(e);
        }
    }

    async function finalizeOrder() {
        const orderDate = new Date().toISOString();
        // Verificar se o carrinho está vazio
        if (cart.length === 0) {
            Alert.alert('Atenção', 'Adicione ao menos uma pizza ao carrinho antes de finalizar o pedido.');
            return;
        }
    
        try {
            await saveOrder(orderDate, cart);
            Alert.alert('Pedido salvo com sucesso!');
            setCart([]); // clear the cart after saving
        } catch (error) {
            Alert.alert('Erro ao salvar o pedido.', error.toString());
        }
    }
    
  
  

    async function loadPizzas(category) {
        try {
            const allPizzas = await getAllPizzas();
            let filteredPizzas = allPizzas;
    
            if (category) {
                filteredPizzas = allPizzas.filter(pizza => pizza.categorie === category);
            }
    
            if (filteredPizzas.length % 2 !== 0) { // Se o número de pizzas é ímpar
                filteredPizzas.push({ id: 'empty', empty: true }); // Adicione um item vazio
            }
    
            setPizzas(filteredPizzas);
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
        <FlatList 
            data={pizzas}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item }) => {
                if (item.empty) { // Se o item é vazio
                    return <View style={{ width: '50%', height: 200 }} />; // Este tamanho deve ser igual ao tamanho de um item de pizza
                }
    
                const cartItem = cart.find(pizza => pizza.id === item.id);
                const quantity = cartItem ? cartItem.quantity : 0;
    
                return (
                    <PizzaSell 
                        pizza={item}
                        quantity={quantity}
                        LeftAction={(props) => (
                            <TouchableOpacity onPress={() => removeFromCart(props.pizza.id)}>
                                <Ionicons name="md-remove-circle" size={32} />
                            </TouchableOpacity>
                        )}
                        RightAction={(props) => (
                            <TouchableOpacity onPress={() => addToCart(props.pizza)}>
                                <Ionicons name="md-add-circle" size={32} />
                            </TouchableOpacity>
                        )}
                    />
                );
            }}
        />
    );
    
}
