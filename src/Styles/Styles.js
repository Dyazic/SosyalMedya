import { StyleSheet } from "react-native";
import { color } from "./ThemeColor";
export const appStyle = StyleSheet.create({
  loginButtonStyle: {
    padding: 10,
    width: 300,
    backgroundColor: color.statusBarColor,
    alignItems: "center",
    borderRadius:5,
    margin: 12,
  },
  loginInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: color.statusBarColor,
    borderRadius: 5,
    fontFamily:'Nunito-VariableFont_wght',
    
  },

  sharingContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    flexDirection: "column",
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: color.cardBackGroundColor,
    alignItems: "flex-start",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
    alignItems: 'center',
    paddingTop: 10,
  },
  profiletext: {
    color: color.textColor,
    
    fontSize: 17,
    fontFamily:'Nunito-VariableFont_wght',
    
  },
  statusbar: {
    backgroundColor: color.statusBarColor,
    padding: 10,
    flexDirection: "row",
    justifyContent: 'flex-start',

    alignItems: 'center',
  },
  menuContainer: {
    padding: 5,
    width: 240,
    flexDirection: "column",
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: color.cardBackGroundColor,
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
  },
  menuText: {
    color: "#000",
    fontSize: 20,
    
    fontFamily:'Nunito-VariableFont_wght',
  },
  sharingInput: {
   
    width: 300,
    fontFamily:'Nunito-VariableFont_wght',
    borderWidth: 1,
    padding: 10,
    borderColor: color.statusBarColor,
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  timeLineContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    flexDirection: "column",
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: color.cardBackGroundColor,
    alignItems: "flex-start",
    borderRadius: 5,
  },
  commentInput: {
    fontFamily:'Nunito-VariableFont_wght',
    width: 290,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: color.statusBarColor,
    borderRadius: 5,
   // textAlignVertical: 'top',
    fontSize: 15,

  },
  commentContainer: {
    
    minHeight:100,
    flex: 0.4,
    margin: 5,
    padding: 10,
    flexDirection: "column",
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: color.cardBackGroundColor,
    alignItems: "flex-start",
    borderRadius: 5,
  },
  sharingText: {
    color: color.textColor,
    color:"#000",
    fontSize: 15,
    fontFamily:'Nunito-VariableFont_wght',
  },
  followButtonStyle: {
    padding: 10,
    
    backgroundColor: color.statusBarColor,
    alignItems: "center",
    borderRadius:5,
    margin: 12,
  },
  buttonText:{
    color: '#fff',
    fontSize: 15,
    fontFamily:'Nunito-VariableFont_wght',
    
  },
  commentInputContainer: {
    maxHeight:100,
    minHeight:100,
    flex: 0.4,
    margin: 5,
    padding: 10,
    flexDirection: "column",
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: color.cardBackGroundColor,
    alignItems: "flex-start",
    borderRadius: 5,
  },
});