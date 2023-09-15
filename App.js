import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home/Home';
import ListPizzas from './screens/ListPizzas/ListPizzas';
import RegisterPizza from './screens/RegisterPizza/RegisterPizza';
import DisplayPizza from './screens/DisplayPizza/DisplayPizza';
import SellPizza from './screens/SellPizza/SellPizza';
import ListSells from './screens/ListSells/ListSells';
import RegisterCategory from './screens/RegisterCategory/RegisterCategory';
import Cart from './screens/Cart/Cart';
import Order from './screens/Order/Order';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ListPizzas" component={ListPizzas} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterPizza" component={RegisterPizza} options={{ headerShown: false }} />
      <Stack.Screen name="DisplayPizza" component={DisplayPizza} options={{ headerShown: false }} />
      <Stack.Screen name="SellPizza" component={SellPizza} options={{ headerShown: false }} />
      <Stack.Screen name="ListSells" component={ListSells} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterCategory" component={RegisterCategory} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="ListPizzas" component={ListPizzas} />
//       <Tab.Screen name="RegisterPizza" component={RegisterPizza} />
//       <Tab.Screen name="DisplayPizza" component={DisplayPizza} />
//       <Tab.Screen name="SellPizza" component={SellPizza} />
//       <Tab.Screen name="ListSells" component={ListSells} />
//       <Tab.Screen name="RegisterCategory" component={RegisterCategory} />
//     </Tab.Navigator>
//   );
// }

const App = () => {
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
            headerShown: false  
          }}
        />

        <Tab.Screen
          name="ListPizzas"
          component={ListPizzas}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-add-circle-outline" color={color} size={size} />
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
              <Icon name="ios-add-circle-outline" color={color} size={size} />
              ),
              headerShown: false  
            }}
            />
        
        {/* <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-add-circle-outline" color={color} size={size} />
            ),
            headerShown: false  
          }}
        /> */}
            
        {/* <Tab.Screen
          name="ListSells"
          component={ListSells}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-add-circle-outline" color={color} size={size} />
            ),
            headerShown: false  
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;


