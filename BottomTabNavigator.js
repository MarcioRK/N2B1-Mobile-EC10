import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home/Home'; // Importe seu componente Home
import ListPizzas from './screens/ListPizzas/ListPizzas'; // Importe seus outros componentes de tela

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ListPizzas" component={ListPizzas} />
      {/* Adicione mais telas aqui */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
