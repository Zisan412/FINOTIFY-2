import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Danger from "../Modules/Danger";
import axios from 'axios';
import { BASE_URL } from "../../constants/Config";
const NewPassword = () => {
  const [press, setpress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, seterror] = useState("");
  const [pass, setpass] = useState("");
  const [pass2, setpass2] = useState("");
  const email = useLocalSearchParams().email;

  const hideing = () => {
    setchnage(true);
    sethide(9);
  };
  const show = () => {
    setchnage(false);
    sethide(10);
  };

  const hideing2 = () => {
    setchnage2(true);

    sethide2(11);
  };
  const show2 = () => {
    setchnage2(false);
    sethide2(12);
  };

  const sub = () => {
    if (pass !== pass2) {
      seterror('Passwords do not match');
      setTimeout(() => seterror(''), 2000);
      return;
    }
    axios.post(`${BASE_URL}/newpass/${email}`, { password: pass2 })
      .then(() => router.push('./login'))
      .catch(() => {
        seterror('Failed to update password. Please try again.');
        setTimeout(() => seterror(''), 2000);
      });
  };

  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
      {error ? <Danger error={error} /> : null}

      <View style={{ paddingTop: 0, marginTop: 150 }}>
        <Text style={{ textAlign: "center", fontSize: 20, textTransform: "capitalize" }}>
          Update Password
        </Text>
      </View>

      <View style={styles.input}>
        {/* New Password */}
        <View style={{ flexDirection: "row", width: "80%", alignItems: "center", borderRadius: 14, marginTop: 10, elevation: 3, backgroundColor: "white", paddingHorizontal: 10, height: 55 }}>
          <MaterialIcons name="security" size={24} color="#0a63bcd5" />
          <TextInput
            style={[styles.inp, press == 1 && { opacity: 1 }]}
            onFocus={() => setpress(1)}
            onBlur={() => setpress(0)}
            placeholder="New Password"
            secureTextEntry={!showPassword}
            value={pass2}
            onChangeText={setpass2}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "lock-open" : "lock-closed"} size={22} color="gray" />
          </Pressable>
        </View>

        {/* Confirm Password */}
        <View style={{ flexDirection: "row", width: "80%", alignItems: "center", borderRadius: 14, marginTop: 10, elevation: 3, backgroundColor: "white", paddingHorizontal: 10, height: 55 }}>
          <MaterialIcons name="security" size={24} color="#0a63bcd5" />
          <TextInput
            style={[styles.inp, press == 2 && { opacity: 1 }]}
            onFocus={() => setpress(2)}
            onBlur={() => setpress(0)}
            placeholder="Confirm New Password"
            secureTextEntry={!showConfirmPassword}
            value={pass}
            onChangeText={setpass}
          />
          <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "lock-open" : "lock-closed"} size={22} color="gray" />
          </Pressable>
        </View>

        <Pressable
          onPress={sub}
          style={[styles.btn, press === 6 && { opacity: 0.7 }]}
          onPressIn={() => setpress(6)}
          onPressOut={() => setpress(0)}
        >
          <Text style={{ color: "white", textTransform: "capitalize", width: 230, textAlign: "center" }}>
            Update Password
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  inp: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  input: {
    marginTop: 20,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#0a63bccb",
    height: 40,
    width: 230,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    opacity: 1,
  },
});
