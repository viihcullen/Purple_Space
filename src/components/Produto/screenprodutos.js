import { Component } from 'react';
import { Text } from 'react-native';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'; 

  

import api from '../../services/api'; 

import Produtos from './produtos'; 

  

class App extends Component { 

  

  constructor(props){ 

    super(props); 

    this.state = { 

      produtos: [], 

      loading: true 

    }; 

  } 
  async componentDidMount(){ 

    const response = await api.get('b/6467f65a9d312622a3616823');

    this.setState({ 

      produtos: response.data.record.rosto, 

      loading: false 

    }); 

  } 

  render() { 

    if(this.state.loading){ 

      return( 

        <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}> 

          <ActivityIndicator color="#09A6FF" size={40}/> 

        </View> 

      ) 

    }else{ 
      console.log(this.state.produtos);

      return( 

        <View style={styles.container}> 
        <Text style={styles.titleCard}>Base</Text>
          <FlatList 
          horizontal
          data={this.state.produtos} 
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString() } 

          renderItem={ ({item}) => <Produtos data={item} /> } 

          /> 

          </View> 

      ) 

    } 

  } 

} 

const styles = StyleSheet.create({ 

    container:{ 
  
      flex:1, 
  
    },
    titleCard: {
      fontSize: 20,
      color: "#33503d",
      fontWeight: "bold",
      margin: 20
    }
  
  }); 
  
    
  
  export default App; 