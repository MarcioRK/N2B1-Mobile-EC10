<<<<<<< HEAD
// RegisterPizza.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles'; // Importe o arquivo de estilos diretamente

export default function RegisterPizza() {
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const categorias = ['Categoria 1', 'Categoria 2', 'Categoria 3']; // Substitua com as categorias reais da pizza que você deseja consumir

  const handleCadastro = () => {
    if (!codigo || !descricao || !preco || !categoriaSelecionada) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      // Aqui você pode enviar os dados para o backend ou realizar outra ação desejada
      Alert.alert('Sucesso', 'Pizza cadastrada com sucesso!');
      // Limpar os campos após o cadastro
      setCodigo('');
      setDescricao('');
      setPreco('');
      setCategoriaSelecionada('');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Código:</Text>
      <TextInput
        style={styles.input}
        value={codigo}
        onChangeText={(text) => setCodigo(text)}
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={(text) => setDescricao(text)}
      />

      <Text style={styles.label}>Preço Unitário:</Text>
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={(text) => setPreco(text)}
        keyboardType="numeric"
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

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Pizza</Text>
=======
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
>>>>>>> 1768384f59edb3914ecce1592c0548d6dc2feb9b
      </TouchableOpacity>
    </View>
  );
}
