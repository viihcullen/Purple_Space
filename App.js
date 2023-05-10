import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login/login';
import Cadastro from './src/components/Cadastro/cadastro';
import Menu from './src/components/Menu/menu';
import {useState} from 'react';

const Stack = createStackNavigator();

export default function App(){

  const [isLogged, setIsLogged] = useState(false)
 
  

      if(isLogged){
        return (
          <NavigationContainer>
          <Menu/>
        </NavigationContainer>
        );
      }else{
        return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="login">
            
              {(props)=><Login setIsLogged={setIsLogged}/>}
            
          </Stack.Screen>
          <Stack.Screen name="cadastro" component={Cadastro}/>
        </Stack.Navigator>
      </NavigationContainer>
      );
    }

    
        

  }

