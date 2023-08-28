import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ToastAndroid, FlatList, TouchableOpacity } from "react-native";
import { appStyle } from "../Styles/Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [list, setList] = useState([]);

  const token = route.params.thrownToken;
  const baseUrl = 'http://www.kursadozdemir.com';
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${baseUrl}/User/GetMyProfile`, { "token": token });
        console.log("token isteği == ", token)
        console.log("Profile Ekranından API Cevap NESNE:", response.data);
        setList(response.data.NESNE);

      } catch (error) {
        ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <SafeAreaView style={appStyle.container}>
      <View style={{ flex: 0.90, borderRadius: 30 }}>
        {list?.length > 0 ?
          <FlatList
            data={list}
            renderItem={({ item }) => (

              <View style={appStyle.sharingContainer}>
                <Text style={appStyle.profiletext}>Kullanıcı Id : {item["user_id"]} </Text>
                <Text style={appStyle.profiletext}>Kullanıcı Adı : {item["display_name"]} </Text>
                <Text style={appStyle.profiletext}>Mesleği : {item["job_title"]} </Text>
                <Text style={appStyle.profiletext}>Email : {item["email"]} </Text>
                <Text style={appStyle.profiletext}>Kayıt Tarihi : {item["created_date"]} </Text>

              </View>
            )}

          />
          :
          <View>
            <Text style={appStyle.menuText}>Liste Gelmedi</Text>
          </View>}

      </View>
      <TouchableOpacity style={appStyle.loginButtonStyle} onPress={
        () => { navigation.navigate("UpdateProfileScreen", { thrownToken: token }) }
      }>
        <Text style={appStyle.buttonText}>Profili Güncelle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={appStyle.loginButtonStyle} onPress={
        () => { navigation.navigate("UpdatePassword", { thrownToken: token }) }
      }>
        <Text style={appStyle.buttonText}>Şifre güncelle</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({




});