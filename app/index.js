import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Mainpage = () => {
  return (
    <ImageBackground
      // source={require("../assets/ChatGPT Image Jan 21, 2026, 07_34_58 PM.png")}
      style={styles.container}
    >
      {/* Logo */}
      <Image
        source={require("../assets/ic.png")}
        style={styles.logo}
      />

      {/* App Name */}
      <Text style={styles.title}>FINOTIFY</Text>

      {/* Signup Button */}
      <Pressable
        style={[styles.button, styles.primaryBtn]}
        onPress={() => router.push("./Authontication/singup")}
      >
        <Text style={styles.primaryBtnText}>WELCOME TO FINOTIFY</Text>

        <View style={styles.arrowBox}>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </View>
      </Pressable>

      {/* Login Button */}
      <Pressable
        style={[styles.button, styles.secondaryBtn]}
        onPress={() => router.push("./Authontication/login")}
      >
        <Text style={styles.secondaryBtnText}>
          Already have an account? Login
        </Text>
      </Pressable>
    </ImageBackground>
  );
};

export default Mainpage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a63bcb4",
  },

  logo: {
    height: 100,
    width: 100,
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 60,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
    
  },
  
  button: {
    height: 45,
    width: 260,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 4, // Android shadow
  },

  primaryBtn: {
    backgroundColor: "#0a63bc",
  },

  primaryBtnText: {
    color: "#fff",
    fontSize: 13,
    letterSpacing: 1,
    fontWeight: "600",
  },

  arrowBox: {
    backgroundColor: "#ffc609",
    height: 22,
    width: 28,
    borderRadius: 6,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryBtn: {
    backgroundColor: "#ffffffd9",
    borderWidth: 1,
    borderColor: "#fff",
  },

  secondaryBtnText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
  },
});
