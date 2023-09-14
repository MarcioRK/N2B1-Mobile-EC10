import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screen/Home/index';
import ListPizzas from './screen/ListPizzas/index';
import RegisterPizza from './screen/RegisterPizza/index';
import DisplayPizza from './screen/DisplayPizza/index';
import SellPizza from './screen/SellPizza/index';
import ListSells from './screen/ListSells/index';
import RegisterCategory from './screen/RegisterCategory/index';


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

