import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { createPizzasTable, addPizza } from '../../services/dbservices';

export default function RegisterPizza() {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const categorias = ['Categoria 1', 'Categoria 2', 'Categoria 3']; // Substitua com as categorias reais da pizza que você deseja consumir

  function createUniqueId() {
    return Date.now();
  }

  async function salvaDados() {
    if (!name || !description || !categoriaSelecionada) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos, incluindo a categoria.');
      return;
    }

    let novoRegistro = id === null;

    let obj = {
      id: novoRegistro ? createUniqueId() : id,
      name: name,
      description: description,
      categoria: categoriaSelecionada,
    };
    
    try {
      createPizzasTable()
      if (novoRegistro) {
        let resposta = await addPizza(obj);
        if (resposta) {
          Alert.alert('Sucesso', 'Pizza cadastrada com sucesso!');
          console.log("cadastrou a pizza")
          console.log(obj)
          setName('');
          setDescription('');
          setCategoriaSelecionada('');
          setId(null); // Limpar o campo "Id" após o cadastro
        } else {
          Alert.alert('Erro', 'Falha ao cadastrar a pizza.');
        }
      }
    } catch (e) {
      Alert.alert('Erro', e.toString());
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}>Registre sua Pizza!</Text>

      <TextInput
        placeholder="Nome"
        onChangeText={(texto) => setName(texto)}
        value={name}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição"
        onChangeText={(texto) => setDescription(texto)}
        value={description}
        style={styles.input}
      />

      <Text style={styles.label}>Categoria:</Text>
      <Picker
        selectedValue={categoriaSelecionada}
        onValueChange={(itemValue) => setCategoriaSelecionada(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        {categorias.map((categoria, index) => (
          <Picker.Item key={index} label={categoria} value={categoria} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={() => salvaDados()}>
        <Text style={styles.buttonText}>Salvar Pizza</Text>
      </TouchableOpacity>
    </View>
  );
}
