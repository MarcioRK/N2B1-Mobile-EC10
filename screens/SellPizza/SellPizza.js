import React, { useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getAllPizzas, saveOrder, getAllCategories } from '../../services/dbservices';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PizzaSell from '../../componentes/PizzaSell/index';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function SellPizza() {
    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            setSelectedCategory(null);
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

    async function finalizeOrder(updatedCart) {
        const orderDate = new Date().toISOString();
        if (updatedCart.length === 0) {
            Alert.alert('Atenção', 'Adicione ao menos uma pizza ao carrinho antes de finalizar o pedido.');
            return;
        }

        try {
            await saveOrder(orderDate, updatedCart);
            Alert.alert('Pedido salvo com sucesso!');
            setCart([]);
        } catch (error) {
            Alert.alert('Erro ao salvar o pedido.', error.toString());
        }
    }

    function handleCartUpdate(updatedCart) {
        setCart(updatedCart);
    }

    async function loadPizzas(category) {
        try {
            const allPizzas = await getAllPizzas();
            let filteredPizzas = allPizzas;

            if (category) {
                filteredPizzas = allPizzas.filter(pizza => pizza.categorie === category);
            }

            if (filteredPizzas.length % 2 !== 0) {
                filteredPizzas.push({ id: 'placeholder', placeholder: true });
            }

            setPizzas(filteredPizzas);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    function addToCart(pizzaToAdd) {
        const newCart = [...cart];
        const found = newCart.find(pizza => pizza.id === pizzaToAdd.id);
        if (found) {
            found.quantity += 1;
        } else {
            newCart.push({ ...pizzaToAdd, quantity: 1 });
        }
        setCart(newCart);
    }

    function removeFromCart(pizzaId) {
        const newCart = [...cart];
        const found = newCart.find(pizza => pizza.id === pizzaId);
        if (found) {
            if (found.quantity > 1) {
                found.quantity -= 1;
            } else {
                const index = newCart.indexOf(found);
                newCart.splice(index, 1);
            }
        }
        setCart(newCart);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

            <FlatList
                data={pizzas}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item }) => {
                    if (item.placeholder) {
                        return <View style={{ width: '50%', height: 150 }} />;
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

            <TouchableOpacity
                style={styles.finalizeButton}
                onPress={() => {
                    navigation.navigate('Cart', {
                        cart: cart,
                        finalizeOrder: finalizeOrder,
                        updateCart: handleCartUpdate
                    });
                }}
            >
                <Text style={styles.finalizeText}>Finalizar Compra</Text>
            </TouchableOpacity>

        </View>
    );
}
