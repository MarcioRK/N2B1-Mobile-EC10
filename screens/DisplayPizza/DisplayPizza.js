import { Text, View } from 'react-native';
import styles from './styles';
// Importe o hook `useRoute` no início do arquivo
import { useRoute } from '@react-navigation/native';

// ...

export default function DisplayPizza() {
  // Use o hook useRoute para obter os parâmetros da rota
  const route = useRoute();
  const { pizza } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{pizza.name}</Text>
      <Text>{pizza.description}</Text>
      {/* Adicione quaisquer outros detalhes que deseja exibir */}
    </View>
  );
}
