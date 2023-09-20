import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { getOrders, deleteOrder, saveOrder, deleteAllOrders, getOrderById, getOrderDetails } from '../../services/dbservices';
import { useFocusEffect } from '@react-navigation/native';


export default function ListSells({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});



  async function loadOrders() {
    try {
      const fetchedOrders = await getOrders();
      console.log("[loadOrders] fetchedOrders ", fetchedOrders);
      
      let details = {};
  
      for (let order of fetchedOrders) {
        const orderDetail = await getOrderDetails(order.orderId);

        let orderTotal = orderDetail.reduce((acc, item) => {
          if (typeof item.price !== 'number' || typeof item.quantity !== 'number') {
            console.error('Erro no cálculo do total do pedido:', item);
            return acc;
          }
          return acc + (item.price * item.quantity);
        }, 0);
        
        details[order.orderId] = { pizzas: orderDetail, total: orderTotal }; // Altere a estrutura aqui
      }
      
      setOrderDetails(details);
  
      setOrders(fetchedOrders);
    } catch (error) {
      Alert.alert("Erro ao recuperar pedidos", error.toString());
    }
  }
  

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque os meses começam de 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
}


  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );


  async function checkGetOrder(){
      const orderFromGet = await getOrders();
      console.log("[checkGetOrder] orderFromGet ", orderFromGet);
    }


  function addExampleItemToCart() {
    const exampleItem = {
      id: 9999999991, 
      // name: "Exemplo de Pizza",
      description: "Esta é uma pizza de exemplo.",
      quantity: 1, // Quantidade de exemplo
    };
  
    console.log("[addExampleItemToCart] exampleItem ", exampleItem);
    // Adicione o item de exemplo ao carrinho
    setCart([...cart, exampleItem]);
  }
  


  const [cart, setCart] = useState([]); 
  
  async function createTestOrder() {
    try {
        const orderDate = new Date().toISOString();

        addExampleItemToCart();
        console.log("cart", cart);

        // Use o método existente para criar o pedido
        const success = await saveOrder(orderDate, cart);

        if (success) {
            Alert.alert("Pedido de teste criado com sucesso!");

            // Verifique o último pedido inserido
            const lastOrder = await getOrders();
            if (lastOrder.length > 0) {
                const orderId = lastOrder[lastOrder.length - 1].orderId;
                const orderDetails = await getOrderById(orderId);
                console.log("[createTestOrder] Last order details: ", orderDetails);
            }

            loadOrders(); // Recarregar a lista de pedidos após a criação
        } else {
            Alert.alert("Erro ao criar pedido de teste");
        }
    } catch (error) {
        Alert.alert("Erro ao criar pedido de teste", error.toString());
    }
}

  async function loadOrderDetails(orderId) {
    try {
        const orderDetails = await getOrderDetails(orderId);
        console.log("[loadOrderDetails] orderDetails for orderId " + orderId, orderDetails);
        return orderDetails;
    } catch (error) {
        Alert.alert("Erro ao recuperar detalhes do pedido", error.toString());
    }
  }


  






  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.titulo}>Histórico de pedidos</Text>

            {orders.length > 0 ? (
                <View>
                    <FlatList 
                        data={orders}
                        keyExtractor={(item, index) => item.orderId.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.pedido}>
                                <Text style={styles.pedidoTitulo}>ID do Pedido: {item.orderId}</Text>
                                <Text style={styles.pedidoTexto}>Data do Pedido: {formatDate(item.orderDate)}</Text>
                                {
                                    orderDetails[item.orderId] && orderDetails[item.orderId].pizzas.map(detail => (
                                        <View key={detail.pizzaId} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.pedidoTexto}>
                                                {detail.name} (Quantidade: {detail.quantity})
                                            </Text>
                                            <Text style={styles.pedidoTexto}>
                                                R$ {(detail.price * detail.quantity).toFixed(2)}
                                            </Text>
                                        </View>
                                    ))
                                }

                                <Text style={[styles.pedidoTexto, styles.total]}>
                                    Valor Total do Pedido: R$ {orderDetails[item.orderId]?.total.toFixed(2)}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            ) : (
                <Text>Nenhum pedido para listar.</Text>
            )}
        </ScrollView>
    </View>
  );

}