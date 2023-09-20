import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  Keyboard,
} from 'react-native';
import {
  addCategorie,
  getCategorie,
  updateCategorie,
  deleteCategorie,
  deleteAllCategories,
  getAllCategories,
} from '../../services/dbservices';
import styles from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


export default function RegisterCategory() {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    carregar();
    console.log('useEffect');
  }, []);

  function createUniqueId() {
    return Date.now();
  }

  async function carregar() {
    try {
      const categoriesData = await getAllCategories();
      console.log("Dados Recebidos do Banco de Dados");
      console.log("[carregar] categoriesData ", categoriesData);
      setCategories(categoriesData);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  const limparCampos = () => {
    setId(null);
    setName('');
    setDescription('');
  };

  async function salvaDados() {
    if (!name || !description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    let novoRegistro = id === null;

    let obj = {
      id: novoRegistro ? createUniqueId() : id,
      name: name,
      description: description,
    };
    console.log("[salvaDados] id ", id)
    let categoriaPesquisada = await getCategorie(id)
    console.log("Cat Pesquisada e retornada:")
    console.log("[salvaDados] categoriaPesquisada ", categoriaPesquisada)
    if (categoriaPesquisada.length === 0) {
      try {
        if (novoRegistro) {
          let resposta = await addCategorie(obj);
          if (resposta) {
            Alert.alert('Sucesso', 'Categoria cadastrada com sucesso!');
            console.log("Cadastrou a Categoria");
            console.log(obj);
            setName('');
            setDescription('');
            setId(null);
            Keyboard.dismiss();
            carregar(); 
          } else {
            Alert.alert('Erro', 'Falha ao cadastrar a categoria.');
          }
        }
      } catch (e) {
        Alert.alert('Erro', e.toString());
      }
    }
    else {
      try {
        let resposta = await updateCategorie(obj);
        if (resposta) {
          Alert.alert('Sucesso', 'Categoria atualizada com sucesso!');
          console.log("Atualizou a Categoria");
          console.log(obj);
          setName('');
          setDescription('');
          setId(null);
          Keyboard.dismiss();
          carregar();
        } else {
          Alert.alert('Erro', 'Falha ao atualizar a categoria.');
        }
      } catch (e) {
        Alert.alert('Erro', e.toString());
      }
    }
  }

  async function apagarTudo() {
    try {
      deleteAllCategories();
      carregar(); 
    } catch (e) {
      Alert.alert('Erro', e.toString());
    }
  }

  async function removerElemento(id) {
    try {
      deleteCategorie(id);
      carregar(); 
    } catch (e) {
      Alert.alert('Erro', e.toString());
    }
  }

  function editar(id) {
    const categorie = categories.find(categorie => categorie.id === id);
    if (categorie) {
      setId(categorie.id);
      setName(categorie.name);
      setDescription(categorie.description);
    }

    console.log("[editar] categorie ", categorie);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}>Gerencie suas Categorias!</Text>

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

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botaoSalvar} onPress={() => salvaDados()}>
          <Text style={styles.legendaBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoApagarTudo} onPress={() => apagarTudo()}>
          <Text style={styles.textoBotao}>Apagar Tudo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaUsuarios}>
        <View style={styles.tabelaHeader}>
          <Text style={styles.listaPrimeiroCampo}>Nome</Text>
          <Text style={styles.listaSegundoCampo}>Descrição</Text>
        </View>

        {categories.map((categorie, index) => (
          <View style={styles.usuario} key={index.toString()}>
            <Text style={styles.listaPrimeiroCampo}>{categorie.name}</Text>
            <Text style={styles.listaUsuariosDados}>{categorie.description}</Text>
            <View style={styles.botoesEdicaoUsuario}>
              <TouchableOpacity onPress={() => removerElemento(categorie.id)}>
                <Ionicons name="md-remove-circle" size={32} color="red" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => editar(categorie.id)}>
                <Entypo name="edit" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
