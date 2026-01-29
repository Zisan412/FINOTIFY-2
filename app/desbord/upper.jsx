import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Income from './income';
import { ScreenStackHeaderLeftView } from 'react-native-screens';
import { Screen } from 'expo-router/build/views/Screen';
const upper = () => {
  return (
    <View>
          <View style={styles.upper}>
        <View style={styles.text}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "white",
              fontFamily: "sens-serif",
            }}
          >
            Overall balance
          </Text>
        </View>
        <View style={styles.user}>
          <Ionicons
            name="person"
            style={{ position: "relative", left: 10 }}
            color={"white"}
            size={20}
          ></Ionicons>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: "sens-serif",
              marginLeft: 20,
              textTransform: "capitalize",
            }}
          >
            hello, mominmusab123
          </Text>
          <Ionicons
            name="notifications"
            size={30}
            color={"white"}
            style={{ marginLeft: 90, top: -2 }}
          ></Ionicons>
          <Text
            style={{
              backgroundColor: "rgb(255, 198, 9)",
              height: 20,
              width: 20,
              textAlign: "center",
              position: "relative",
              top: -5,
              left: -15,
              borderRadius: 50,
              color:'white'
            }}
          >
            2
          </Text>
        </View>
      </View>
      <View style={styles.miidel}>
          <View style={styles.iconsearch}>
          <Ionicons
            name="search"
            style={{ position: "static" }}
            size={22}
            color={"#0a63bcd5"}
          ></Ionicons>
          </View>
          <View style={styles.search}>

          <TextInput
            placeholder={"Search a By Date & Category"}
            style={styles.textinp}
          ></TextInput>
        </View>
      </View>
  
    </View>
  )
}

export default upper

const styles = StyleSheet.create({
      upper: {
    height: 150,
    backgroundColor: "#0a63bcd5",
    marginTop: 0,
  },
  text: {
    // backgroundColor:'red',
    // position:'relative',
    // left:0,
    // top:30,
    marginTop: 30,
  },
  user: {
    // backgroundColor:'red',
    // position:'relative',
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  miidel:{
    display: "flex",
    flexDirection:"row",
    // justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "white",
    width: 280,
    borderRadius: 10,
    elevation: 10,
    height: 50,
    top:-20,
    left: 40,

  },
  iconsearch:{
  width:40,height:'100%',justifyContent:'center',alignItems:'center'},
    search: {
  },
})