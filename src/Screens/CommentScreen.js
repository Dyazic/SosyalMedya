import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ToastAndroid, FlatList, TouchableOpacity, RefreshControl, Image, TextInput } from "react-native";
import { appStyle } from "../Styles/Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function CommentScreen() {
    const route = useRoute();
    const [list, setList] = useState([]);
    const [comment, setComment] = useState("");
    const token = route.params.thrownToken;
    const shareId = route.params.shareId;
    const baseUrl = 'http://www.kursadozdemir.com';
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const getData = async () => {
            try {
                const response1 = await axios.post(`${baseUrl}/Share/GetTimeline`, { "token": token });
                setList(response1.data.NESNE);
            } catch (error) {
                ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
                console.error(error);
            }
        };
        getData();
    }, [refresh]);
    const sendComment = async () => {
        try {
            const response1 = await axios.post(`${baseUrl}/Share/SendComment`, { "token": token, "share_id": shareId, "comment": comment });
            setRefresh(!refresh);
            setComment("");
            ToastAndroid.show("Yorum Yapıld", ToastAndroid.LONG);
        } catch (error) {
            ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
            console.error(error);
        }
    };
    const deleteComment = async (commentId) => {
        try {
            const response1 = await axios.post(`${baseUrl}/Share/DeleteComment`, { "token": token, "comment_id": commentId });
            setRefresh(!refresh);
            setComment("");
            ToastAndroid.show("Yorum Silindi", ToastAndroid.LONG);
        } catch (error) {
            ToastAndroid.show("Veri alınamadı. Hata oluştu.", ToastAndroid.LONG);
            console.error(error);
        }
    }
    return (
        <SafeAreaView style={appStyle.container}>
            <View style={{ flex: 1, borderRadius: 30 }}>
                {list?.length > 0 ?
                    <FlatList
                        data={list}
                        extraData={refresh}
                        renderItem={({ item }) => {
                            if (item.share_id === shareId) {
                                return (
                                    <View >
                                        {item.comments && item.comments.length > 0 ? (
                                            <View style={{ marginVertical: 5 }}>
                                                <Text style={appStyle.profiletext}>Yorumlar:</Text>
                                                {item.comments.map(comment => (
                                                    <View key={comment.comment_id} style={appStyle.commentContainer}>
                                                        <Text style={appStyle.profiletext}>Yorum: {comment.comment}</Text>
                                                        <Text style={appStyle.profiletext}>Oluşturulma Tarihi: {comment.create_date}</Text>
                                                        {comment.can_delete === 1 && (
                                                            <View>
                                                                <TouchableOpacity style={{marginTop:8}}
                                                                    onPress={() => deleteComment(comment.comment_id)}>
                                                                    <Image style={styles.stretch} source={require("../Assets/delete.png")} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        )}
                                                    </View>
                                                ))}
                                            </View>
                                        ) : null}
                                    </View>
                                );
                            }
                            return null; // Diğer paylaşımları atla
                        }}
                    />
                    : 
                    <View>
                    <Text style={appStyle.menuText}>Liste Gelmedi</Text>
                    </View>
                    }
            </View>
            <View style={appStyle.commentInputContainer}>
                <Text style={appStyle.sharingText}>Yorum Yap...</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        multiline={true}
                        numberOfLines={1}
                        style={appStyle.commentInput}
                        onChangeText={setComment}
                        value={comment}
                        placeholder="Yorum..."
                        keyboardType='twitter'
                    />
                    <TouchableOpacity
                        onPress={() => sendComment()}
                    >
                        <Image style={styles.stretch} source={require("../Assets/comment.png")} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    stretch: {
        // marginLeft:250,
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
});