import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './screens/Home/Home';
import ListPizzas from './screens/ListPizzas/ListPizzas';
import RegisterPizza from './screens/RegisterPizza/RegisterPizza';
import DisplayPizza from './screens/DisplayPizza/DisplayPizza';
import SellPizza from './screens/SellPizza/SellPizza';
import ListSells from './screens/ListSells/ListSells';
import RegisterCategory from './screens/RegisterCategory/RegisterCategory';


const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    ListPizzas,
    RegisterPizza,
    DisplayPizza,
    SellPizza,
    ListSells,
    RegisterCategory,
  })
);

export default function App() {
  return (
      <Routes/>     
  );
}

