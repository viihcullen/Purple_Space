import Constants from 'expo-constants';
import { Text, StyleSheet, ScrollView } from "react-native";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";

export default function Home(){
    return(
        <View style={[styles.container]}>
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation="flipInY"
            source={require("../../../../assets/img/logoapp.png")}
            style={{ width: "100%" }}
            resizeMode="contain"
          />
        </View>

        
        <View>

        </View>
        
        </View>
       
        
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
        
      },
      containerLogo: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
      },
      containerForm: {
        flex: 1,
        backgroundColor: "#ECDFFC",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
        marginLeft: "2%",
        marginRight: "2%",
        alignItems: "center",
      },
      title: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: "20%",
        marginBottom: 10,
        color: "#8C60C6",
        textAlign: "center"
      },
      text: {
        color: "#CEB3F2",
      },
      

});