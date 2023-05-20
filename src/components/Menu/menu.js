import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home/home';
import Pesquisar from './Pesquisar/pesquisar';
import Fornecedor from './Fornecedor/fornecedor';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import GerenciarProdutos from "./Produtos/gerenciarprodutos";
import ScreenProdutos from '../Produto/screenprodutos'; 



const Tab = createBottomTabNavigator();

export default function Menu(){
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="home" component={Home} options={{tabBarIcon:(props)=><FontAwesome name="home" size={25} color={props.focused?'#ceb3f2':'black'} />, title:() => null}}/>
            <Tab.Screen name="pesquisar" component={Pesquisar} options={{tabBarIcon:(props)=><Feather name="search" size={25} color={props.focused?'#ceb3f2':'black'}/>, title:() => null}}/>
            <Tab.Screen name="gerenciarprodutos" component={GerenciarProdutos} options={{tabBarIcon:(props)=><Ionicons name="add-circle-sharp" size={25} color={props.focused?'#ceb3f2':'black'}/>, title:() => null}}/>
            <Tab.Screen name="fornecedor" component={Fornecedor} options={{tabBarIcon:(props)=><FontAwesome name="user" size={25} color={props.focused?'#ceb3f2':'black'}/>, title:() => null}}/>
            <Tab.Screen name="screenprodutos" component={ScreenProdutos} options={{tabBarIcon:(props)=><FontAwesome name="user" size={25} color={props.focused?'#ceb3f2':'black'}/>, title:() => null}}/>
        </Tab.Navigator>
    );
}
