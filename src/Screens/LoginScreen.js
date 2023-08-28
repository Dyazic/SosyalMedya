import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ToastAndroid } from "react-native";
import { appStyle } from "../Styles/Styles";
import { color } from '../Styles/ThemeColor';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function LoginScreen() {
    const [email, onEmailChange] = React.useState('');
    const [password, onPasswordChange] = React.useState('');
    const navigation = useNavigation();
    const baseUrl = 'http://www.kursadozdemir.com';
    const handleLogin = () => {
        if(email !="" && password!=""){
        axios.post(`${baseUrl}/User/Login`, { "email":email, "password":password })
        // denizhan@mail.com
        //123
            .then(response => {
                if (response.data.DURUM == true) {
                    ToastAndroid.show(response.data.MESAJ, ToastAndroid.SHORT);
                    navigation.navigate("MainScreen", { thrownToken: response.data.NESNE.token })
                }
                else {
                    ToastAndroid.show(response.data.MESAJ, ToastAndroid.SHORT);
                }
            })
        }else{
            ToastAndroid.show("Alanlar Boş Olamaz", ToastAndroid.SHORT); 
        }
    }
    return (
        <SafeAreaView style={appStyle.container}>
            <View style={{ backgroundColor: color.backgroundColor }}>
                <Image style={styles.stretch} source={require("../Assets/logo.png")} />
            </View>
            <View>
                <TextInput
                    style={appStyle.loginInput} onChangeText={onEmailChange}
                    value={email} keyboardType='email-address' placeholder='Email'
                />
                <TextInput style={appStyle.loginInput} onChangeText={onPasswordChange}
                    value={password} keyboardType='visible-password' placeholder='Password' 
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={appStyle.loginButtonStyle} onPress={() => {
                    handleLogin();
                }}>
                    <Text style={appStyle.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        color: '#000',
                        fontSize: 15,fontFamily:'Nunito-VariableFont_wght',
                    }} >Üye Değil misiniz? </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("RegisterScreen");
                    }}>
                        <Text style={{
                            color: color.statusBarColor,
                            fontSize: 15, fontWeight: 'bold',fontFamily:'Nunito-VariableFont_wght',
                        }}>Kaydol</Text>
                    </TouchableOpacity>
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
        margin: 15,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    stretch: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
});
