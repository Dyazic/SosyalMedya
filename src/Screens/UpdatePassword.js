import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, StyleSheet, SafeAreaView, ToastAndroid, FlatList, TouchableOpacity } from "react-native";
import { appStyle } from "../Styles/Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function UpdatePassword() {
  const navigation = useNavigation();
  const route = useRoute();

  const [oldPassword, onOldPasswordChange] = useState('');
  const [newPassword, onNewPasswordChange] = useState('');
  const [againPassword, onAgainPasswordChange] = useState('');
  const [tryEmail, setTryEmail] = useState('');

  const token = route.params.thrownToken;

  const baseUrl = 'http://www.kursadozdemir.com';
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${baseUrl}/User/GetMyProfile`, { "token": token });
        const user = response.data.NESNE[0];
        const email = user.email;

        console.log("Update ekranından API Cevap NESNE:", email);
        setTryEmail(email);

      } catch (error) {
        ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
        console.error(error);
      }
    };

    getData();
  }, []);
  const passwordCheck = () => {
    axios.post(`${baseUrl}/User/Login`, { "email": tryEmail, "password": oldPassword })
      .then(response => {
        if (response.data.DURUM == true) {
          updatePassword();
        }
        else {
          ToastAndroid.show("İlk Parolanız yanlış", ToastAndroid.SHORT);
        }
      })




  }
  const updatePassword = async () => {
  
        try {
          const response = await axios.post(`${baseUrl}/User/UpdatePassword`, {
            "token": token,
            "password": newPassword
          });
          if (response.data.DURUM == true) {
            ToastAndroid.show("Parolanız Güncellendi", ToastAndroid.LONG);
            navigation.navigate("ProfileScreen", { thrownToken: token })
          } else {
            ToastAndroid.show("Parolanız Güncellenirken Hata Oluştu", ToastAndroid.LONG);
            console.log(response.data.MESAJ);
          }

        } catch (error) {
          ToastAndroid.show("Hata Oluştu", ToastAndroid.LONG);
          console.error(error);
        }
        
      
  };

  return (
    <SafeAreaView style={appStyle.container}>

      <View>
        <TextInput
          style={appStyle.loginInput} onChangeText={onOldPasswordChange}
          value={oldPassword} placeholder='Eski Parolanız'
        />
        <TextInput style={appStyle.loginInput} onChangeText={onNewPasswordChange}
          value={newPassword} placeholder='Yeni Parola'
        />
        <TextInput style={appStyle.loginInput} onChangeText={onAgainPasswordChange}
          value={againPassword} placeholder='Parola Tekrarı'
        />

        <TouchableOpacity style={appStyle.loginButtonStyle} onPress={
          () => { passwordCheck() }
        }>
          <Text style={appStyle.buttonText}>Parola güncelle</Text>
        </TouchableOpacity>

      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({




});