import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Button,ActivityIndicator, FlatList } from 'react-native';
import firebase from '../../../services/connectionFirebase';

export default function Pele(){

    const[titulo, setTitulo] = useState('');
    const[descricao, setDescricao] = useState('');
    const[imagem, setImagem] = useState('');


    return(


        <SafeAreaView style={styles.container}>
            

        <View style={styles.formcontainer}>

        <Text style={styles.text}>
                Cadastro de Post
            </Text>
        <TextInput
                placeholder='Título'
                style={styles.input}
                value={titulo}
                onChangeText={(text) => setTitulo(text)}
                //ref={inputRef}
            />



            <TextInput
                placeholder='Descrição'
                style={styles.input}
                value={descricao}
                onChangeText={(text) => setDescricao(text)}
               // ref={inputRef}
            />



            <TextInput
                placeholder='Imagem'
                style={styles.input}
                value={imagem}
                onChangeText={(text) => setImagem(text)}
               // ref={inputRef}
            />

                <View style={styles.button}>
                    <Button
                        onPress={''}
                        title="Enviar"
                        color="#ceb3f2"
                        accessibilityLabel=""
                    />
                </View>

        </View>

           

            
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: '#ceb3f2',
      padding: 8,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20,
        color: '#000000',
        fontWeight: 'bold'
      },
    
      formcontainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 30,
        backgroundColor:'rgba(255,255,255,0.5)',
        borderRadius: 10,
      },
    
      input: {
        
        backgroundColor: '#ceb3f2',
        borderRadius: 4,
        height: 45,
        width: 300,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#141414',
        flexDirection: 'row',
        maxHeight: 300,
        maxWidth: 300,
    
      },
    
     
    
      button: {
        width: 100,
       flex: 1,
       alignItems: "center",
      },
  
  });

