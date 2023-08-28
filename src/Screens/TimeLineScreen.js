import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ToastAndroid, FlatList, TouchableOpacity, RefreshControl, Image, TextInput } from "react-native";
import { appStyle } from "../Styles/Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function TimeLineScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [list, setList] = useState([]);
    const [descriptinon, setDescription] = useState("");
    const token = route.params.thrownToken;
    const baseUrl = 'http://www.kursadozdemir.com';
    const [refresh, setRefresh] = useState(false);
    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const getData = async () => {
            try {
                const response1 = await axios.post(`${baseUrl}/Share/GetTimeline`, { "token": token });
                setList(response1.data.NESNE);
                const response2 = await axios.post(`${baseUrl}/User/GetMyProfile`, { "token": token });
                const user = response2.data.NESNE[0];
                setUserName(user.display_name);
                setUserId(user.user_id);
            } catch (error) {
                ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
                console.error(error);
            }
        };
        getData();
    }, [refresh]);
    const share = async () => {
        if (descriptinon != '') {
            try {
                const response = await axios.post(`${baseUrl}/Share/Share`, { "token": token, "description": descriptinon });
                ToastAndroid.show("Paylaşıldı", ToastAndroid.LONG);
                console.log(response.data.MESAJ);
                setRefresh(!refresh);
                setDescription("");
            } catch (error) {
                ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.SHORT);
                console.error(error);
            }
        } else {
            ToastAndroid.show("Alan Boş Olamaz", ToastAndroid.SHORT);
        }
    };
    const deleteShare = async (shareId) => {
        try {
            const response = await axios.post(`${baseUrl}/Share/DeleteShare`, { "token": token, "share_id": shareId });
            ToastAndroid.show("Paylaşıldı", ToastAndroid.LONG);
            console.log(response.data.MESAJ);
            setRefresh(!refresh);
        } catch (error) {
            ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
            console.error(error);
        }
    };

    const like = async (shareId, getUserId) => {
        if (getUserId != userId) {
            try {
                const response = await axios.post(`${baseUrl}/Share/Like`, { "token": token, "share_id": shareId });
                ToastAndroid.show("Beğendin", ToastAndroid.SHORT);
                console.log(response.data.MESAJ);
                setRefresh(!refresh);
            } catch (error) {
                ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.SHORT);
                console.error(error);
            }
        } else if (getUserId == userId) {
            ToastAndroid.show("Kendi Gönderini Beğenemezsin", ToastAndroid.SHORT);
        }
    };
    const unLike = async (shareId, getUserId) => {
        if (getUserId != userId) {
            try {
                const response = await axios.post(`${baseUrl}/Share/UnLike`, { "token": token, "share_id": shareId });
                ToastAndroid.show("Beğenmedin", ToastAndroid.SHORT);
                console.log(response.data.MESAJ);
                setRefresh(!refresh);
            } catch (error) {
                ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.SHORT);
                console.error(error);
            }
        } else if (getUserId == userId) {
            ToastAndroid.show("Kendi Gönderini Beğenemezsin", ToastAndroid.SHORT);
        }
    };
    const warn = () => {
        ToastAndroid.show("silemezsin", ToastAndroid.SHORT);
    };
    

    return (
        <SafeAreaView style={appStyle.container}>
            <View style={{ flex: 1, borderRadius: 30 }}>
                {list?.length >= 0 ?
                    <FlatList
                        ListHeaderComponent={
                            <View style={appStyle.timeLineContainer}>
                                <Text style={appStyle.sharingText}>{userName}</Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={5}
                                    style={appStyle.sharingInput}
                                    onChangeText={setDescription}
                                    value={descriptinon}
                                    placeholder="Paylaş..."
                                    keyboardType='twitter'
                                />
                                <TouchableOpacity style={appStyle.followButtonStyle}
                                    onPress={() => share()}
                                >
                                    <Text style={appStyle.buttonText}>Paylaş</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        data={list}
                        extraData={refresh}
                        renderItem={({ item }) => (
                            <View style={appStyle.timeLineContainer}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Text style={appStyle.sharingText}>{item["user_display_name"]} </Text>
                                    {item["user_id"] == userId  && (
                                   <TouchableOpacity  style={{ marginLeft: 250 }}
                                     
                                     onPress={() => deleteShare(item["share_id"])}>
                                     <Image style={styles.stretch} source={require("../Assets/delete.png")} />
                                   </TouchableOpacity>
                                 )}
                                </View>
                                <View style={appStyle.sharingInput}>
                                    <Text style={appStyle.sharingText}> {item["description"]} </Text>
                                </View>
                                <Text style={appStyle.sharingText}> {item["create_date"]} </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <Text style={appStyle.sharingText}>{item["like_count"]} </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            item["like_status"] == 1 ?
                                                unLike(item["share_id"], item["user_id"]) :
                                                like(item["share_id"], item["user_id"])
                                        }}
                                    >
                                        <Image style={styles.stretch} source={
                                            item["like_status"] == 1 ?
                                                require("../Assets/unlike.png") :
                                                require("../Assets/like.png")
                                        } />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        alignItems: 'center', padding: 5,
                                    }}
                                        onPress={() => {
                                            navigation.navigate("CommentScreen",{ thrownToken:token,shareId:item["share_id"] })
                                        }}>
                                        <Image style={styles.stretch} source={require("../Assets/comment.png")} />
                                    </TouchableOpacity>
                                </View>


                            </View>
                        )}
                    />
                    : 
                    <View>
                    <Text style={appStyle.menuText}>Liste Gelmedi</Text>
                    </View>
                    }
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    stretch: {
        width: 35,
        height: 35,
        resizeMode: 'stretch',
    },
});