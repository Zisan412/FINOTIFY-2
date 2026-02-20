import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const bottom = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footerContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.footer}>
        <Pressable
          style={styles.foot}
          onPress={() => router.replace('/desbord/desbord')}
        >
          <MaterialIcons name="home-filled" size={26} color="white" />
          <Text style={styles.fonts}>Home</Text>
        </Pressable>

        <Pressable style={styles.foot} onPress={() => router.replace('/charts/headr')}>
          <Ionicons name="stats-chart" size={26} color="white" />
          <Text style={styles.fonts}>Stats</Text>
        </Pressable>

        <View style={styles.addBtnContainer}>
          <Pressable style={styles.addbtn} onPress={() => router.push('/desbord/adddata')}>
            <Ionicons name="add" size={50} color="white" />
          </Pressable>
        </View>

        <Pressable style={styles.foot} onPress={() => router.replace('/DuePyment/due')}>
          <Ionicons name="time" size={26} color="white" />
          <Text style={styles.fonts}>Due</Text>
        </Pressable>
        <Pressable style={styles.foot} onPress={() => router.replace('/Usersetting/setting')}>
          <Ionicons name="settings-sharp" size={26} color="white" />
          <Text style={styles.fonts}>Setting</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default bottom

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0a63bcd5", // Semi-transparent blue
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 100,
  },
  footer: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  fonts: {
    fontSize: 10,
    textTransform: 'capitalize',
    color: 'white',
    fontFamily: 'serif',
    marginTop: 2,
  },
  foot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  addBtnContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addbtn: {
    marginTop: -45,
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#0a63bc",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 5,
    borderColor: "white",
  },
})