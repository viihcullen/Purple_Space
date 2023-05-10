import * as React from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, Pressable, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import { View } from 'react-native';
import firebase from "../../services/connectionFirebase";
import { useNavigation } from '@react-navigation/native';

export default function  Login({setIsLogged}) {

 const [email, setEmail] = React.useState('');
 const [password, setPassword] = React.useState('');
 const navigation = useNavigation();

 const entrar = async () =>{

  const auth = firebase.auth();
  const credencial = await auth.signInWithEmailAndPassword(email, password);

  if(credencial.user){

    setIsLogged(true);


  }

 }


    return (
      
      <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../../assets/img/fundo.png')} resizeMode="cover" style={styles.image}>

      <View style={styles.fundo}>
      

        <Text style={styles.titulos}>
          Entrar no PurpleSpace
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Senha"
        />
        <Pressable style={styles.botao} onPress={()=>{entrar()}}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </Pressable>

        <Text style={styles.paragraph}>
          Esqueci minha senha
        </Text>

        <Pressable onPress={()=> { navigation.navigate('cadastro')}}>
          <Text style={styles.botaoCadastro} >
            Não tenho uma conta!
          </Text>
        </Pressable>
       
        </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff',
    padding: 8,
  },
  fundo: {
    backgroundColor:'rgba(255,255,255,0.5)',
    margin: 20,
    borderRadius: 10,
    
  },
  titulos: {
    margin: 30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#020202",
    fontFamily: "",

  },
  paragraph: {
    margin: 10,
    fontSize: 14,
    textAlign: 'center',
    color: "#020202",

  },
  botaoCadastro: {
    margin: 40,
    fontSize: 14,
    textAlign: 'center',
    color: "#020202",
  },
  botao: {
    padding: 10,
    borderRadius: 10,
    height: 40,
    margin: 12,
    backgroundColor: '#ceb3f2',
    borderColor: 'black',
    
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
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