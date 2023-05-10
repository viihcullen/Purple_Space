import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Keyboard } from 'react-native';
import { TextInput, Dialog, Portal, Provider, Button } from 'react-native-paper';
import firebase from '../../../services/connectionFirebase';
import Listagem from '../../Listar/listagem';
import {TextInputMask} from 'react-native-masked-text';


const Separator = () => {
  return <View style={styles.separator} />;
}

export default function GerenciarProdutos() {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [key, setKey] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagem, setImagem] = useState('');

  const [selectedForDelete, setSelectedForDelete] = useState("");

  const inputRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);


  useEffect(() => {

    async function search() {
      await firebase.database().ref('produtos').on('value', (snapshot) => {

        setProdutos([]);

        snapshot.forEach((chilItem) => {
          let data = {

            key: chilItem.key,
            nome: chilItem.val().nome,
            marca: chilItem.val().marca,
            preco: chilItem.val().preco,
            categoria: chilItem.val().categoria,
            imagem: chilItem.val().imagem,

          };

          setProdutos(oldArray => [...oldArray, data].reverse());

        })

        setLoading(false);

      })

    }

    search();

  }, []);

  async function insertUpdate() {
    //editar dados
    if (nome !== '' & marca !== '' & preco !== '' & categoria !== '' & imagem !== '' & key !== '') {
      firebase.database().ref('produtos').child(key).update({
        nome: nome, marca: marca, preco: preco, categoria: categoria
      })
      Keyboard.dismiss();
      alert('Produto Editado!');
      clearData();
      setKey('');
      return; ''
    }
    //cadastrar dados
    let produtos = await firebase.database().ref('produtos');
    let chave = produtos.push().key;



    produtos.child(chave).set({
      nome: nome,
      marca: marca,
      preco: preco,
      categoria: categoria,
      imagem: imagem
    });



    alert('Produto Cadastrado!');
    clearData();
  }


  function clearData() {
    setNome(''); setCategoria(''); setMarca(''); setPreco(''); setImagem('');
  }

  function handleDelete(key) {

   setVisible(true);
    setSelectedForDelete(key);
    /*firebase.database().ref('produtos').child(key).remove() 
      .then(() => { 
 
        const findProdutos = produtos.filter(item => item.key !== key) 
        setProdutos(findProdutos) 
 
      }) */

  }

  function deleteByKey(key){
    firebase.database().ref('produtos').child(key).remove() 
      .then(() => { 
 
        const findProdutos = produtos.filter(item => item.key !== key) 
        setProdutos(findProdutos) 
        hideDialog();
      })
  }



  //função para editar  

  function handleEdit(data) {

    setKey(data.key),
      setNome(data.nome),
      setMarca(data.marca),
      setPreco(data.preco),
      setCategoria(data.categoria),
      setImagem(data.imagem)

  }

  return (
    <Provider>
    <View style={styles.container}>
      <Portal>
       <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyMedium">Deseja deletar este produto?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Não</Button>
          <Button onPress={() => deleteByKey(selectedForDelete)}>Sim</Button>
        </Dialog.Actions>
      </Dialog>
      </Portal>
      <View style={styles.viewinput}>
        <Text style={styles.titulos}>Cadastrar Produtos</Text>

        <TextInputMask
          placeholder='Nome'
          maxLength={40}
          style={styles.input}
          onChangeText={(texto) => setNome(texto)}
          value={nome}
          ref={inputRef}
          type={"custom"}
          options={{
            mask: '*******************************'
          }}

        />
        <Separator />
        <TextInputMask
          placeholder='Marca'
          style={styles.input}
          onChangeText={(texto) => setMarca(texto)}
          value={marca}
          ref={inputRef}
          type={"custom"}
          options={{
            mask: '*******************************'
          }}

        />
        <Separator />
        <TextInputMask
          placeholder='Preço'
          style={styles.input}
          onChangeText={(texto) => setPreco(texto)}
          value={preco}
          ref={inputRef}
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: ''
          }}

        />
        <Separator />
        <TextInputMask
         placeholder='Categoria'
         style={styles.input}
         onChangeText={(texto) => setCategoria(texto)}
         value={categoria}
         ref={inputRef}
          type={"custom"}
          options={{
            mask: '*******************************'
          }}

        />
        <Separator />
        <TextInputMask
         placeholder='Imagem'
         style={styles.input}
         onChangeText={(texto) => setImagem(texto)}
         value={imagem}
         ref={inputRef}
          type={"custom"}
          options={{
            mask: '*******************************'
          }}

        />
        <Separator />

        <TouchableOpacity onPress={() => insertUpdate()}
          style={styles.button}
          activeOpacity={0.5}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listar}>

          <Text style={styles.titulos}>Listagem de Produto</Text>

      </View>



      {loading ?

        (

          <ActivityIndicator color="#8C60C6" size={30} />

        ) :

        (

          <FlatList

            keyExtractor={item => item.key}

            data={produtos}

            renderItem={({ item }) => (

              <Listagem data={item} deleteItem={handleDelete}

                editItem={handleEdit} />

            )}

          />

        )

      }

    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff',
    padding: 8,
  },
  viewinput:{
    backgroundColor:'rgba(206,179,242,0.3)',
    margin: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor:'#fff',
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 'bold',

  },
  separator: {
    marginVertical: 5,
  },

  titulos: {
    margin: 30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#020202",
    fontFamily: "",

  },
  button: {
    padding: 10,
    borderRadius: 10,
    height: 40,
    margin: 20,
    backgroundColor: '#ceb3f2',
    borderColor: 'black',
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 100,
    fontSize: 20
  },
  listar: {
    fontSize: 20,
    textAlign: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '104%',
    height: '104%',
    marginLeft: '-2%',
    marginTop: '-2%'
  },

});