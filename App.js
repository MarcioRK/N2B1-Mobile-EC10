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


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="ListPizzas" component={ListPizzas} />
      <Stack.Screen name="RegisterPizza" component={RegisterPizza} />
      <Stack.Screen name="DisplayPizza" component={DisplayPizza} />
      <Stack.Screen name="SellPizza" component={SellPizza} />
      <Stack.Screen name="ListSells" component={ListSells} />
      <Stack.Screen name="RegisterCategory" component={RegisterCategory} />
      <Stack.Screen name="Cart" component={Cart} />
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
          name="Cart"
          component={Cart}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-add-circle-outline" color={color} size={size} />
            ),
            headerShown: false  
          }}
        />
        
        <Tab.Screen
          name="SellPizza"
          component={SellPizza}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-add-circle-outline" color={color} size={size} />
            ),
            headerShown: false  
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;


