import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";


const bottom = () => {
  return (
    <View>
      <View style={styles.footer}>
        <Pressable style={styles.foot} onPress={() => router.push('../desbord')} >
          <MaterialIcons name="home-filled" size={26} color="white" />
          <Text style={styles.fonts}>Home</Text>
        </Pressable>

        <Pressable style={styles.foot} onPress={() => router.push('../charts/headr')}>
          <Ionicons name="stats-chart" size={26} color="white" />
          <Text style={styles.fonts}>Stats</Text>
        </Pressable>
        <Pressable style={styles.addbtn} onPress={() => router.push('../desbord/adddata')}>
          <Ionicons name="add" size={60} color="white" style={styles.addbtns} />

        </Pressable>
        <Pressable style={styles.foot} onPress={() => router.push('../DuePyment/due')}>
          <Ionicons name="time" size={26} color="white" />
          <Text style={styles.fonts}>Due</Text>
        </Pressable>
        <Pressable style={styles.foot} onPress={() => router.push('../Usersetting/setting')}>
          <Ionicons name="settings-sharp" size={26} color="white" />
          <Text style={styles.fonts}>Setting</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default bottom

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#0a63bcd5",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

  },
  fonts: {
    fontSize: 12,
    textTransform: 'capitalize',
    color: 'white', fontFamily: 'serif'
  },
  foot: {
    justifyContent: 'center', alignItems: 'center'
  },
  addbtn: {
    marginTop: -50,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#0a63bc",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#0a63bc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    borderWidth: 4,
    borderColor: "white",
  },
  addbtns: {

  }

})