import React, { useState, useCallback } from 'react';
import { Text, View, FlatList, Alert, ScrollView } from 'react-native';
import styles from './styles';
import { getOrders, saveOrder, getOrderById, getOrderDetails } from '../../services/dbservices';
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

        details[order.orderId] = { pizzas: orderDetail, total: orderTotal };
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
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
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
                      <View key={detail.pizzaId}>
                        <Text style={styles.pizzaName}>{detail.name}</Text>
                        <View style={styles.pizzaDetails}>
                          <Text style={styles.pedidoTexto}>
                            Quantidade: {detail.quantity}
                          </Text>
                          <Text style={styles.pedidoTexto}>
                            R$ {detail.price.toFixed(2)} cada
                          </Text>
                        </View>
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