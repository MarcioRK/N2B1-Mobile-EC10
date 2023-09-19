import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import styles from './styles';
import { getOrders, deleteOrder, saveOrder, deleteAllOrders, getOrderById, getOrderDetails } from '../../services/dbservices';
import { useFocusEffect } from '@react-navigation/native';



export default function ListSells({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);



  async function loadOrders() {
    try {
      const fetchedOrders = await getOrders();
      console.log("[loadOrders] fetchedOrders ", fetchedOrders);
      
      let details = {};
      let grandTotal = 0; // Para armazenar o valor total de todos os pedidos
  
      for (let order of fetchedOrders) {
        const orderDetail = await getOrderDetails(order.orderId);

        let orderTotal = orderDetail.reduce((acc, item) => {
          if (typeof item.price !== 'number' || typeof item.quantity !== 'number') {
            console.error('Erro no cálculo do total do pedido:', item);
            return acc;
          }
          return acc + (item.price * item.quantity);
        }, 0);
        

        grandTotal += orderTotal; // Adicione ao valor total de todos os pedidos
        details[order.orderId] = { pizzas: orderDetail, total: orderTotal }; // Altere a estrutura aqui
      }
      
      setOrderDetails(details);
      setGrandTotal(grandTotal); // Atualize o estado com o valor total de todos os pedidos
  
      setOrders(fetchedOrders);
    } catch (error) {
      Alert.alert("Erro ao recuperar pedidos", error.toString());
    }
  }
  

  async function handleDeleteOrder(orderId) {
    console.log("[handleDeleteOrder] orderId ", orderId);
    try {
      const success = await deleteOrder(orderId);
      if (success) {
        Alert.alert("Pedido deletado com sucesso!");
        loadOrders(); // Recarregar os pedidos após a exclusão.
      } else {
        Alert.alert("Erro ao deletar pedido");
      }
    } catch (error) {
      Alert.alert("Erro ao deletar pedido", error.toString());
    }
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ListSells!</Text>

      <Button title="Criar Pedido de Teste" onPress={createTestOrder} />
      <Button title="Deletar Pedidos" onPress={deleteAllOrders} />
      <Button title="GET CHECK ORDERS" onPress={checkGetOrder} />
      
      {/* Listando os IDs dos pedidos e seus itens */}
      {orders.length > 0 ? (
  <View>
    <FlatList 
      data={orders}
      keyExtractor={(item, index) => item.orderId.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10 }}>
            <Text>ID do Pedido: {item.orderId}</Text>
            <Text>Data do Pedido: {item.orderDate}</Text>
            {
                orderDetails[item.orderId] && orderDetails[item.orderId].pizzas.map(detail => (
                    <Text key={detail.pizzaId}>
                        {detail.name} (Quantidade: {detail.quantity})
                    </Text>
                ))
            }
            <Text>Valor Total do Pedido: R$ {orderDetails[item.orderId]?.total.toFixed(2)}</Text>
        </View>
      )}
    />
    <Text>Valor Total de Todos os Pedidos: R$ {grandTotal.toFixed(2)}</Text>
  </View>
    ) : (
      <Text>Nenhum pedido para listar.</Text>
    )}

  </View>

  );
}