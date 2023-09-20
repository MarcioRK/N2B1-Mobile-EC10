import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

function Cart({ route, navigation }) {
    const { cart, finalizeOrder } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Carrinho:</Text>
            <FlatList 
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>{item.name} (x{item.quantity})</Text>
                        {/* Aqui, você pode adicionar botões para aumentar, diminuir e remover o item */}
                    </View>
                )}
            />
            <Button title="Finalizar Compra" onPress={() => {
              finalizeOrder();
              navigation.goBack(); // Volta para a tela SellPizza após finalizar a compra
            }} />
        </View>
    );
}

export default Cart;
