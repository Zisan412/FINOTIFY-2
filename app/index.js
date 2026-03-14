import {
  StyleSheet, Text, View, Image, Pressable, ImageBackground, BackHandler
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mainpage = () => {
  const [loading, setLoading] = useState(true);

  // Back button block karo
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => true // back press block
  //   );
  //   // return () => backHandler.remove();
  // }, []);

  // Token check
  useEffect(() => {
    async function getdata() {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);
        if (token) {
          router.replace('./desbord/desbord'); // ✅ replace use karo push nahi
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    getdata();
  }, []);

  if (loading) return null;

  return (
    <ImageBackground style={styles.container}>
      <Image source={require("../assets/ic.png")} style={styles.logo} />
      <Text style={styles.title}>FINOTIFY</Text>

      <Pressable
        style={[styles.button, styles.primaryBtn]}
        onPress={() => router.push("./Authontication/singup")}
      >
        <Text style={styles.primaryBtnText}>WELCOME TO FINOTIFY</Text>
        <View style={styles.arrowBox}>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </View>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondaryBtn]}
        onPress={() => router.push("./Authontication/login")}
      >
        <Text style={styles.secondaryBtnText}>Already have an account? Login</Text>
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
    elevation: 4,
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