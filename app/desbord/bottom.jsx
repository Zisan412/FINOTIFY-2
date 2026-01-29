import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";


const bottom = () => {
  return (
    <View>
         <View style={styles.footer}>
          <View style={styles.innerfooter}>
        <Ionicons
          name="home"
          size={26}
          color={"white"}
          marginTop={-30}
        >
          <Text>{'\n'}</Text>
          <Text style={styles.fonts}>Home</Text>
          
        
        </Ionicons>
        </View>                 
         <View style={styles.innerfooter}>
        <Ionicons
        onPress={()=>router.push("../charts/headr")}
          name="stats-chart"
          size={26}
          color={"white"}
          marginTop={-30}
          
        >
          <Text>{'\n'}</Text>
          <Text style={styles.fonts}>Stats</Text>
        </Ionicons>
        </View>
        <Ionicons
          onPress={() => router.push("./adddata")}
          name="add"
          size={46}
          style={{
            position: "relative",
            top: -40,
            backgroundColor: "#0a63bcd5",
            color: "white",
            borderRadius: 50,
            borderColor: "white",
            borderWidth: 2,
          }}
        >
          
        </Ionicons>
        </View>
          <View style={styles.innerfooter}>
        <Ionicons
          name="wallet"
          size={26}
          color={"white"}
          marginTop={-30}
        >
          <Text>{'\n'}</Text>
          <Text style={styles.fonts}>due Entry</Text>
        </Ionicons>
        </View>
          <View style={styles.innerfooter}>
        <Ionicons
          name="settings"
          size={26}
          color={"white"}
          marginTop={-30}
        >
          <Text>{'\n'}</Text>
          <Text style={styles.fonts}>Setting</Text>
        </Ionicons>
      </View>
      <View>
        </View>
      </View>
 
  )
}

export default bottom

const styles = StyleSheet.create({
      footer: {
    backgroundColor: "#0a63bcd5",
    height:90,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  fonts:{
    fontSize:15,
  },
  innerfooter:{
    backgroundColor:'yellow',
    
  }

})