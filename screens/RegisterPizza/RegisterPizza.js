import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { createPizzasTable, addPizza, getAllCategories } from '../../services/dbservices';
import { useFocusEffect } from '@react-navigation/native';

export default function RegisterPizza() {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [preco, setPreco] = useState('');
  const [categorias, setCategorias] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  async function loadCategories() {
    try {
      const categories = await getNamesOfCategories();
      setCategorias(categories);
      console.log(categories);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }
  
  function createUniqueId() {
    return Date.now();
  }

  async function salvaDados() {
    if (!name || !description || !categoriaSelecionada || !preco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos, incluindo a categoria e o preço.');
      return;
    }

    let novoRegistro = id === null;

    let obj = {
      id: novoRegistro ? createUniqueId() : id,
      name: name,
      description: description,
      categorie: categoriaSelecionada,
      price: preco,
    };

    try {
      createPizzasTable();
      if (novoRegistro) {
        let resposta = await addPizza(obj);
        if (resposta) {
          Alert.alert('Sucesso', 'Pizza cadastrada com sucesso!');
          console.log("Cadastrou a pizza");
          console.log(obj);
          setName('');
          setDescription('');
          setCategoriaSelecionada('');
          setPreco('');
          setId(null); // Limpar o campo "Id" após o cadastro
          loadCategories();
          Keyboard.dismiss();
        } else {
          Alert.alert('Erro', 'Falha ao cadastrar a pizza.');
        }
      }
    } catch (e) {
      Alert.alert('Erro', e.toString());
    }
  }

  async function getNamesOfCategories() {
    try {
      const categories = await getAllCategories();
      const names = categories.map(category => category.name);
      return names;
    } catch (error) {
      console.error('Erro ao obter nomes das categorias:', error);
      return [];
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

      <TextInput
        placeholder="Preço"
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

      <TouchableOpacity style={styles.button} onPress={() => salvaDados()}>
        <Text style={styles.buttonText}>Salvar Pizza</Text>
      </TouchableOpacity>
    </View>
  );
}
