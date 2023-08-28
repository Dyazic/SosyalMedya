import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ToastAndroid, FlatList, TouchableOpacity ,RefreshControl } from "react-native";
import { appStyle, Image } from "../Styles/Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function AllUsersScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [list, setList] = useState([]);
   // const[userId,setUserId]=useState(0);

    const token = route.params.thrownToken;
    const baseUrl = 'http://www.kursadozdemir.com';
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post(`${baseUrl}/User/GetAllUser`, { "token": token });
               // console.log("token isteği == ", token)
              //  console.log("Profile Ekranından API Cevap NESNE:", response.data);
                setList(response.data.NESNE);
            } catch (error) {
                ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
                console.error(error);
            }
        };
        getData();
    }, [refresh]);
    const follow =async (userId,status)=>{
        if(status==1){
            try {
                const response = await axios.post(`${baseUrl}/User/UnFollow`, { "token": token,"follow_user_id":userId });
               console.log("user ıd:",userId,"status :",status);
               ToastAndroid.show("Takipten Çıkıldı.", ToastAndroid.LONG);
                console.log(response.data.MESAJ);
               setRefresh(!refresh);
            } catch (error) {
                ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
                console.error(error);
            }   





        }else{
        try {
            const response = await axios.post(`${baseUrl}/User/Follow`, { "token": token,"follow_user_id":userId });
           console.log("user ıd:",userId,"status :",status);
           ToastAndroid.show("Takip edildi.", ToastAndroid.LONG);
            console.log(response.data.MESAJ);
           setRefresh(!refresh);
        } catch (error) {
            ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
            console.error(error);
        }
    }

    };

    return (
        <SafeAreaView style={appStyle.container}>
            <View style={{ flex: 1, borderRadius: 30 }}>
                {list?.length > 0 ?
                    <FlatList
                        data={list}
                        extraData={refresh}
                        renderItem={({ item }) => (
                            <View style={appStyle.sharingContainer}>
                                <Text style={appStyle.profiletext}>Kullanıcı Id : {item["user_id"]} </Text>
                                <Text style={appStyle.profiletext}>Kullanıcı Adı : {item["display_name"]} </Text>
                                <Text style={appStyle.profiletext}>Mesleği : {item["job_title"]} </Text>
                                <Text style={appStyle.profiletext}>Email : {item["email"]} </Text>
                                <Text style={appStyle.profiletext}>Kayıt Tarihi : {item["created_date"]} </Text>
                                <TouchableOpacity style={appStyle.followButtonStyle}
                               onPress={() => follow(item["user_id"],item["follow_status"])}
                                >

                                    <Text style={appStyle.buttonText}>{item["follow_status"] == 1 ?
                                        "Takibi Bırak" :
                                        "Takip Et"}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    : <View>
                    <Text style={appStyle.menuText}>Liste Gelmedi</Text>
                    </View>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    stretch: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },



});