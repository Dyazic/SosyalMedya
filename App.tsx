import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from './src/Screens/LoginScreen';
import {color} from './src/Styles/ThemeColor';
import RegisterScreen from './src/Screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from'./src/Screens/MainScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import UpdateProfileScreen from './src/Screens/UpdateProfileScreen';

const stack=createNativeStackNavigator();


function App(): JSX.Element {



  return (
    <NavigationContainer >
    
     <stack.Navigator initialRouteName='LoginScreen' screenOptions={{headerShown:false}}>
     <stack.Screen name='MainScreen' component={MainScreen}/>
     <stack.Screen name='LoginScreen' component={LoginScreen}/>
     <stack.Screen name='RegisterScreen' component={RegisterScreen}/>
     
      </stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 

});

export default App;
