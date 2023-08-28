import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity,Image, TextInput,ToastAndroid  } from "react-native";
import {appStyle} from "../Styles/Styles";
import { color } from '../Styles/ThemeColor';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function RegisterScreen() {
    const [email, onEmailChange] = React.useState('');
    const [password, onPasswordChange] = React.useState('');
    const [jobTitle, onJobChange] = React.useState('');
    const [userName, onUserNameChange] = React.useState('');
   
    const navigation=useNavigation();
    const baseUrl = 'http://www.kursadozdemir.com';
    const handleLogin=()=>{
        axios.post(`${baseUrl}/User/Register`, {  "display_name": userName,
        "job_title": jobTitle,
        "email": email,
        "password": password})
        .then(response =>{
           if(response.data.DURUM == true){
           ToastAndroid.show(response.data.MESAJ, ToastAndroid.SHORT);
           navigation.navigate("LoginScreen");
           }
           else{
            ToastAndroid.show(response.data.MESAJ, ToastAndroid.SHORT);
           }


        })
    
    }
    

  return (
    <SafeAreaView style={appStyle.container}>
         <View style={{backgroundColor:color.backgroundColor}}>
         <Image style={styles.stretch} source={require("../Assets/logo.png")} />
         </View>
         <View>
         <TextInput
        style={appStyle.loginInput}  onChangeText={onEmailChange}
        value={email} placeholder='Email'
      />
      <TextInput style={appStyle.loginInput} onChangeText={onPasswordChange} 
       value={password}  placeholder='Password'
      />
      <TextInput style={appStyle.loginInput} onChangeText={onUserNameChange} 
       value={userName}  placeholder='İsim Soyisim'
      />
      <TextInput style={appStyle.loginInput} onChangeText={onJobChange} 
       value={jobTitle}  placeholder='Meslek'
      />
         </View>

         <View style={styles.buttonContainer}>
            <TouchableOpacity style={appStyle.loginButtonStyle} onPress={()=>{
                handleLogin();
            }}>
             <Text style={{color:'#fff',
        fontSize:15,}}>Kaydol</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row'}}>
            
           
            </View>
         </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    buttonContainer: {
       flexDirection: "column",
        justifyContent: 'space-around',
     alignItems: "center",
     margin:15,
     },
     text:{
        color:'#fff',
        fontSize:20,
     },
     stretch: {
        width: 100,
        height: 100,
         resizeMode: 'stretch',
      },
      
  
});
