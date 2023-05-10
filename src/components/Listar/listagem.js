import React from 'react'; 

import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 

import Icon from 'react-native-vector-icons/Ionicons'; 

  

export default function Listagem({ data, deleteItem, editItem }){ 

  return( 

    <View style={styles.container}> 

      <Text style={styles.text}>Nome: {data.nome}</Text> 

      <Text style={styles.text}>Marca: {data.marca}</Text> 

      <Text style={styles.text}>Preço: {data.preco}</Text>

      <Text style={styles.text}>Categoria: {data.categoria}</Text> 

      <Text style={styles.text}>Imagem: {data.imagem}</Text> 

  

      <View style={styles.item}> 

        <TouchableOpacity onPress={()=> deleteItem(data.key)}> 

          <Icon name="trash" color="black" size={20}>Excluir</Icon> 

        </TouchableOpacity> 

        <TouchableOpacity onPress={() => editItem(data)}> 

          <Icon name="create" color="#8C60C6" size={20}>Editar</Icon> 

        </TouchableOpacity> 

      </View> 

    </View> 

  ) 

} 

  

const styles = StyleSheet.create({ 

  container:{ 

    flex:1, 

    margin: 10,

    padding: 10, 

    backgroundColor: 'rgba(206,179,242,0.3)',

    borderRadius: 10
  }, 

  text:{ 

    color:'black', 

    fontSize: 17 

  }, 

  item: { 

    flex:1, 

    flexDirection:'row', 

    justifyContent: 'space-around' 

  } 

}); 