import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import Entypo from "react-native-vector-icons/Entypo";

const slider_width = Dimensions.get("window").width;
const item_width = slider_width * 0.6;


class Produtos extends Component {
  doubleTapRef = React.createRef();
  render() {

    const { nome, marca, preco, foto } = this.props.data;
    console.log(this.props.data)

    return (
      <TapGestureHandler
        onHandlerStateChange={this._onSingleTap}
        waitFor={this.doubleTapRef}>
        <TapGestureHandler ref={this.doubleTapRef} numberOfTaps={2} onActivated={()=>{}} >
        
        <View>
        <Entypo name="heart" size={50} color='#ceb3f2'/>
        <View style={styles.card}>
          <Card style={styles.container}>
            <Image source={{ uri: foto }} style={styles.image} />
            <Card.Content>
              <Text style={styles.titleCard}>{nome}</Text>
              <Text style={styles.textCard}>{marca}</Text>
              <Text style={styles.textCard}>{preco}</Text>
            </Card.Content>

          </Card>
        </View>




      </View>
        </TapGestureHandler>
      </TapGestureHandler>
     

    );

  }

}



const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    padding: 10,
    paddingBottom: 2,
    width: item_width,
    height:350,
    alignItems: "center",
    shadowOffset: { width: 0, height: 1 },
    shadowColor: '#000',
    shadowRadius: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
    shadowOpacity: 0.8,
    elevation: 3,
    margin: 60,

  },
  card: {
    height: 350,
  },

  botao: {
    width: 100,
    backgroundColor: '#CEB3F2',
    opacity: 1,
    padding: 8,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  image: {
    height: item_width * 0.9,
    width: item_width * 0.9,
    resizeMode: 'contain',
    margin: 10, 
  },

  titleCard: {
    fontSize: 20,
    color: "#33503d",
    fontWeight: "bold",
  },

  textCard: {
    fontSize: 15,
    color: "#33503d",
    marginRight: 10,
  },
  

});



export default Produtos; 