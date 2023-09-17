import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useState, useEffect, Alert } from 'react';
import { addContact } from '../../services/dbservices';

export default function RegisterPizza() {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function createUniqueId() {
    return Date.now();
  }



  async function salvaDados() {
    let novoRegistro = id == undefined;

    let obj = {
      id: createUniqueId(),
      name: name,
      description: description,
    };

    try {
      if (novoRegistro) {
        let resposta = await addContact(obj);
        if (resposta)
          Alert.alert('adicionado com sucesso!');
        else
          Alert.alert('Falhou miseravelmente!');
      }
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>RegisterPizza!</Text>

      <TextInput
        onChangeText={(texto) => setName(texto)}
        value={name}
      />

      <TextInput
        onChangeText={(texto) => setDescription(texto)}
        value={description}
      />

      <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
        <Text style={styles.textoBotao}>Salvar Pizza</Text>
      </TouchableOpacity>
    </View>
  );
}
