import React, { useState, useEffect } from 'react';
import {TextInput,Text, View, StyleSheet, SafeAreaView, ToastAndroid, FlatList, TouchableOpacity } from "react-native";
import { appStyle } from "../Styles/Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function UpdateProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [displayName, onDisplayNameChange] = useState('');
  const [jobName, onJobChange] = useState('');

  const token = route.params.thrownToken;

  const baseUrl = 'http://www.kursadozdemir.com';
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${baseUrl}/User/GetMyProfile`, { "token": token });
      console.log("token isteği == " ,token)
        console.log("Update ekranından API Cevap NESNE:", response.data);
                
    } catch (error) {
        ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
        console.error(error);
    }
    };

    getData();
  }, []);
  const updateProfile = async () => {
    try {
      if(displayName!='' && jobName!='' ){
        const response = await axios.post(`${baseUrl}/User/UpdateProfile`, { "token": token,"display_name": displayName,
      "job_title": jobName });
    if(response.data.DURUM==true){
      ToastAndroid.show("İsminiz Güncellendi", ToastAndroid.LONG);
      navigation.navigate("ProfileScreen",{ thrownToken:token }) 
    }else{
      ToastAndroid.show("İsminiz Güncellenirken Hata Oluştu", ToastAndroid.LONG);
      console.log(response.data.MESAJ);
    }
  }else{
    ToastAndroid.show("Alanlar boş olamaz", ToastAndroid.LONG);
  }
      
      

    } catch (error) {
      ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={appStyle.container}>
      
      <View>
        <TextInput
          style={appStyle.loginInput} onChangeText={onDisplayNameChange}
          value={displayName} placeholder='İsim Soyisim'
        />
        <TextInput style={appStyle.loginInput} onChangeText={onJobChange}
          value={jobName} placeholder='Meslek'
        />
        <TouchableOpacity style={appStyle.loginButtonStyle} onPress={
          () => {updateProfile()  }
        }>
          <Text style={appStyle.buttonText}>Profilini güncelle</Text>
        </TouchableOpacity>

      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({




});