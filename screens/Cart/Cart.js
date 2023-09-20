import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

function Cart({ route, navigation }) {
    const { cart, finalizeOrder } = route.params;
    const [cartState, setCartState] = React.useState(cart);
    const total = cartState.reduce((acc, pizza) => acc + (pizza.price * pizza.quantity), 0);

    function increaseQuantity(itemId) {
        const newCart = cartState.map(pizza => {
            if (pizza.id === itemId) {
                return { ...pizza, quantity: pizza.quantity + 1 };
            }
            return pizza;
        });
        setCartState(newCart);
    }

    function decreaseQuantity(itemId) {
        let newCart = cartState.map(pizza => {
            if (pizza.id === itemId && pizza.quantity > 1) {
                return { ...pizza, quantity: pizza.quantity - 1 };
            }
            return pizza;
        });
        newCart = newCart.filter(pizza => !(pizza.id === itemId && pizza.quantity === 1));
        setCartState(newCart);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Carrinho de Pizzas</Text>
            <FlatList
                data={cartState}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.detailContainer}>
                            <Text style={styles.priceText}>Und. R$ {item.price.toFixed(2)}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity style={styles.iconButton} onPress={() => decreaseQuantity(item.id)}>
                                    <Ionicons name="remove-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>x{item.quantity}</Text>
                                <TouchableOpacity style={styles.iconButton} onPress={() => increaseQuantity(item.id)}>
                                    <Ionicons name="add-circle-outline" size={24} color="green" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.finalizeButton} onPress={() => {
                finalizeOrder(cartState);
                if (route.params.updateCart) {
                    route.params.updateCart(cartState);
                }
                navigation.goBack();
            }}>
                <Text style={styles.finalizeText}>Finalizar Compra</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Cart;
