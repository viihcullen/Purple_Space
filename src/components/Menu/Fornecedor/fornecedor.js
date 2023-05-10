import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Keyboard } from 'react-native';
import { Dialog, Portal, Provider, Button } from 'react-native-paper';
import firebase from '../../../services/connectionFirebase';
import ListagemFornecedor from '../../Listar/listagemFornecedor';
import {TextInputMask} from 'react-native-masked-text';



const Separator = () => {
  return <View style={styles.separator} />;
}

export default function Fornecedor() {
  const [razaosocial, setRazaoSocial] = useState('');
  const [nomefantasia, setNomeFantasia] = useState('');
  const [cnpj, setcnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedForDelete, setSelectedForDelete] = useState("");

  const inputRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);


  useEffect(() => {

    async function search() {
      await firebase.database().ref('fornecedor').on('value', (snapshot) => {

        setFornecedor([]);

        snapshot.forEach((chilItem) => {
          let data = {

            key: chilItem.key,
            razaosocial: chilItem.val().razaosocial,
            cnpj: chilItem.val().cnpj,
            email: chilItem.val().email,
            nomefantasia: chilItem.val().nomefantasia,
           telefone: chilItem.val().telefone,

          };

          setFornecedor(oldArray => [...oldArray, data].reverse());

        })

        setLoading(false);

      })

    }

    search();

  }, []);

  async function insertUpdate() {

    //editar dados
    if (razaosocial !== '' & cnpj !== '' & email !== '' & nomefantasia !== '' & telefone !== '' & key !== '') {
      firebase.database().ref('fornecedor').child(key).update({
        razaosocial: razaosocial, cnpj: cnpj, email: email, nomefantasia: nomefantasia, telefone: telefone
      })
      Keyboard.dismiss();
      alert('Fornecedor Editado!');
      clearData();
      setKey('');
      return; 
    }
    else if(razaosocial == '' & email  == '' & nomefantasia == '' & telefone == ''){
        alert("Informe os dados!");
        return;
    }
    //cadastrar dados
    let fornecedor = await firebase.database().ref('fornecedor');
    let chave = fornecedor.push().key;



    fornecedor.child(chave).set({
      razaosocial: razaosocial,
      cnpj: cnpj,
      email: email,
     nomefantasia:nomefantasia,
      telefone: telefone
    });



    alert('Fornecedor Cadastrado!');
    clearData();
  }


  function clearData() {
    setRazaoSocial(''); setcnpj(''); setEmail(''); setNomeFantasia(''); setTelefone(''); 
  }

  function handleDelete(key) {

   setVisible(true);
    setSelectedForDelete(key);
    /*firebase.database().ref('produtos').child(key).remove() 
      .then(() => { 
 
        const findProdutos =nomefantasias.filter(item => item.key !== key) 
        setProdutos(findProdutos) 
 
      }) */

  }

  function deleteByKey(key){
    firebase.database().ref('fornecedor').child(key).remove() 
      .then(() => { 
 
        const findFornecedor = fornecedor.filter(item => item.key !== key) 
        setFornecedor(findFornecedor) 
        hideDialog();
      })
  }



  //função para editar  

  function handleEdit(data) {

    setKey(data.key),
      setRazaoSocial(data.razaosocial),
      setcnpj(data.cnpj),
      setEmail(data.email),
      setNomeFantasia(data.nomefantasia),
      setTelefone(data.telefone)
      
      

  }

  return (
    <Provider>
    <View style={styles.container}>
      <Portal>
       <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyMedium">Deseja deletar este fornecedor?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Não</Button>
          <Button onPress={() => deleteByKey(selectedForDelete)}>Sim</Button>
        </Dialog.Actions>
      </Dialog>
      </Portal>
      <View style={styles.viewinput}>
        <Text style={styles.titulos}>Cadastrar Fornecedores</Text>
        
        <TextInputMask
          placeholder='Razão Social'
          maxLength={40}
          style={styles.input}
          onChangeText={(texto) => setRazaoSocial(texto)}
          value={razaosocial}
          ref={inputRef}
          type={"custom"}
          options={{
            mask: '*******************************'
          }}

        />
        <Separator />

        <TextInputMask
          placeholder='Nome Fantasia'
          style={styles.input}
          onChangeText={(texto) => setNomeFantasia(texto)}
          value={nomefantasia}
          ref={inputRef}
          type={"custom"}
          options={{
            mask: '*******************************'
          }}
        />
        <Separator />

        <TextInputMask
          placeholder='CNPJ'
          maxLength={40}
          style={styles.input}
          onChangeText={(texto) => setcnpj(texto)}
          value={cnpj}
          ref={inputRef}
          type={'cnpj'}

        />
        <Separator />

        <TextInputMask
          placeholder='Email'
          style={styles.input}
          onChangeText={(texto) => setEmail(texto)}
          value={email}
          ref={inputRef}
          type={"custom"}
          options={{
            mask: '*******************************'
          }}
        />
        <Separator />

        <TextInputMask
          placeholder='Telefone'
          style={styles.input}
          onChangeText={(texto) => setTelefone(texto)}
          value={telefone}
          ref={inputRef}
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
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

        <Text style={styles.titulos}>Listagem de Fornecedores</Text>

      </View>


      <View style={styles.list}>

      {loading ?

        (

          <ActivityIndicator color="#8C60C6" size={45} />

        ) :

        (

          <FlatList
            horizontal
            keyExtractor={item => item.key}
            showsHorizontalScrollIndicator={false}
            data={fornecedor}
            renderItem={({ item }) => (

              <ListagemFornecedor 
              data={item} 
              deleteItem={handleDelete}
              editItem={handleEdit} />

            )}

          />

        )

      }
</View>
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
    margin: 10,
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
    textAlign: 'center',
    

  },
  list:{
    height: 200,
    padding: 10,
    margin: 10,
    marginBottom: 10,
    maxHeight: 300,
    flexDirection: 'row',
   
  }

});