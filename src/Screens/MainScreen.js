import React, { useRef,useEffect } from 'react';
import {
  Text, View, StyleSheet,
  DrawerLayoutAndroid, TouchableOpacity, Image
} from "react-native";
import { color } from '../Styles/ThemeColor';
import { useNavigation, useRoute } from "@react-navigation/native";
import { appStyle } from '../Styles/Styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import TimeLineScreen from './TimeLineScreen';
import UpdatePassword from './UpdatePassword';
import UpdateProfileScreen from './UpdateProfileScreen';
import AllUsersScreen from './AllUsersScreen';
import CommentScreen from './CommentScreen';


const stack = createNativeStackNavigator();

export default function MainScreen() {
  const drawer = useRef(null);
  const navigation = useNavigation();

  const route = useRoute();
  const token=route.params.thrownToken;

  useEffect(() => {
    // Sayfa ilk yüklendiğinde otomatik olarak ProfileScreen'e gitmek
    console.log("token maine geldi" ,token);
    navigation.navigate("TimeLineScreen", { thrownToken: token });
  }, []);

  const navigationView = () => {
    return <View style={styles.container}>
      <View style={appStyle.statusbar}>
        <TouchableOpacity style={{ //burası geri tuşu
          alignItems: 'center', padding: 5,
        }}
          onPress={() => { drawer.current?.closeDrawer() }}>
          <Image style={styles.stretch} source={require("../Assets/back.png")} />
        </TouchableOpacity>
        <Text style={{ paddingStart: 20, color: "#fff", fontSize: 20, fontFamily:'Nunito-VariableFont_wght', }}>FakedIn</Text>

      </View>
      <View style={{alignItems:'center',flex:1}}>
      <TouchableOpacity style={appStyle.menuContainer}
        onPress={() => { navigation.navigate("ProfileScreen",{thrownToken:token}); drawer.current.closeDrawer(); }}>
        <Text style={appStyle.menuText}>Profil                        →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={appStyle.menuContainer}
        onPress={() => { navigation.navigate("AllUsersScreen",{thrownToken:token}); drawer.current.closeDrawer(); }}>
        <Text style={appStyle.menuText}>Tüm Kullanıcılar        →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={appStyle.menuContainer}
        onPress={() => { navigation.navigate("TimeLineScreen",{thrownToken:token}); drawer.current.closeDrawer(); }}>
        <Text style={appStyle.menuText}>Akışlar                       →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={appStyle.menuContainer}
        onPress={() => { navigation.navigate("LoginScreen",{thrownToken:token}); drawer.current.closeDrawer(); }}>
        <Text style={appStyle.menuText}>Çıkış                       →</Text>
      </TouchableOpacity>


      </View>
    </View>
  };



  return (
     <View style={{flex:1}}>
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={280}
      drawerPosition={'left'}
      style={{ flex: 1, }}
      renderNavigationView={navigationView}>
      <View style={appStyle.statusbar}>
        <TouchableOpacity style={{
          alignItems: 'center', padding: 5,
        }}
          onPress={() => { drawer.current?.openDrawer() }}>
          <Text style={{ color: "#fff", fontSize: 20 }}>Menü</Text>
        </TouchableOpacity>
        <Text style={{ paddingStart: 20, color: "#fff", fontSize: 20, fontStyle: 'italic' }}>FakedIn</Text>

      </View>

      <stack.Navigator screenOptions={{ headerShown: false }}>

        <stack.Screen name='MainPage' component={MainComponent} />
        <stack.Screen name='ProfileScreen' component={ProfileScreen} />
        <stack.Screen name='TimeLineScreen' component={TimeLineScreen} />
        <stack.Screen name='UpdateProfileScreen' component={UpdateProfileScreen} />
        <stack.Screen name='UpdatePassword' component={UpdatePassword} />
        <stack.Screen name='AllUsersScreen' component={AllUsersScreen} />
        <stack.Screen name='CommentScreen' component={CommentScreen} />
        
      </stack.Navigator>
    </DrawerLayoutAndroid>
    </View>







  );
}

/**
 * 
 * @returns 
 
    
 */

const MainComponent = () => { return <View style={{ flex: 1 }}></View> }

const styles = StyleSheet.create({
  stretch: {
    width: 25,
    height: 25,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
   

  },


});
