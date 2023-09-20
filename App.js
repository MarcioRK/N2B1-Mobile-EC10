import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect, Alert } from 'react';

import HomeScreen from './screens/Home/HomeScreen';
import ListPizzas from './screens/ListPizzas/ListPizzas';
import RegisterPizza from './screens/RegisterPizza/RegisterPizza';
import SellPizza from './screens/SellPizza/SellPizza';
import ListSells from './screens/ListSells/ListSells';
import RegisterCategory from './screens/RegisterCategory/RegisterCategory';
import Cart from './screens/Cart/Cart';
import Order from './screens/Order/Order';

import { createTable } from './services/dbservices';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ListPizzas" component={ListPizzas} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterPizza" component={RegisterPizza} options={{ headerShown: false }} />
      <Stack.Screen name="SellPizza" component={SellPizza} options={{ headerShown: false }} />
      <Stack.Screen name="ListSells" component={ListSells} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterCategory" component={RegisterCategory} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [tablesCreated, setTablesCreated] = useState(false);

  useEffect(() => {
    async function setupDatabase() {
      if (!tablesCreated) {
        await createTable();
        setTablesCreated(true);
      }
    }

    setupDatabase();
  }, [tablesCreated]);


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="List Pizzas"
          component={ListPizzas}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="list-outline" color={color} size={size} />
            ),
            headerShown: false  
          }}
        />

        <Tab.Screen
          name="Order"
          component={Order}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="card-outline" color={color} size={size} />
            ),
            headerShown: false  
          }}
        />

        <Tab.Screen
          name="Add Pizza"
          component={RegisterPizza}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="save-outline" color={color} size={size} />
            ),
            headerShown: false  
          }}
        />

        <Tab.Screen
          name="Add Category"
          component={RegisterCategory}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="save-outline" color={color} size={size} />
            ),
            headerShown: false  
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
