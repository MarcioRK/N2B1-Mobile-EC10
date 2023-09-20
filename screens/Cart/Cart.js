import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons'; // Para ícones

function Cart({ route, navigation }) {
    const { cart, finalizeOrder } = route.params;
    const total = cart.reduce((acc, pizza) => acc + (pizza.price * pizza.quantity), 0);


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Carrinho de Pizzas</Text>
            <FlatList 
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.detailContainer}>
                            <Text style={styles.priceText}>Und. R$ {item.price.toFixed(2)}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Ionicons name="remove-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>x{item.quantity}</Text>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Ionicons name="add-circle-outline" size={24} color="green" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />


            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.finalizeButton} onPress={() => {
              finalizeOrder();
              navigation.goBack();
            }}>
                <Text style={styles.finalizeText}>Finalizar Compra</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Cart;
