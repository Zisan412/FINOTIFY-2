import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Login = () => {
  const [activeInput, setActiveInput] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "123456";

  const submit = () => {
    if (!mobile || !password) {
      setError("Please enter valid details");
      clearError();
      return;
    }

    if (password !== correctPassword) {
      setError("Wrong password");
      clearError();
      return;
    }

    router.push("/singup");
  };

  const clearError = () => {
    setTimeout(() => setError(""), 2000);
  };

  return (
    <View style={{backgroundColor: "#ffffff" }}>
      {/* TOP IMAGE */}
      <Image
        source={require("../../assets/Login.png")}
        style={styles.container2}
      />

      {/* {error ? <Danger errror={error} /> : null} */}

      <Text style={styles.heading}>Login Here</Text>

      {/* INPUTS */}
      <View style={styles.inputWrap}>
        {/* MOBILE */}
        <View style={styles.inputBox}>
          <Ionicons name="call" size={24} color="#0a63bcd5" />
          <TextInput
            style={styles.inp}
            placeholder="Mobile no"
            keyboardType="numeric"
            value={mobile}
            onChangeText={setMobile}
            onFocus={() => setActiveInput(1)}
            onBlur={() => setActiveInput(0)}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputBox}>
          <MaterialIcons name="security" size={24} color="#0a63bcd5" />
          <TextInput
            style={styles.inp}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setActiveInput(2)}
            onBlur={() => setActiveInput(0)}
          />

          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "lock-open" : "lock-closed"}
              size={22}
              color="gray"
            />
          </Pressable>
        </View>

        {/* LOGIN BUTTON */}
        <Pressable
          style={styles.btn}
          onPress={submit}
          onPressIn={() => setActiveInput(6)}
          onPressOut={() => setActiveInput(0)}
        >
          <Text style={{ color: "white" }}>Login Here</Text>
        </Pressable>

        {/* FORGOT */}
        <Pressable onPress={() => router.push("./forgget")}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>
      </View>

      {/* FOOTER */}
      <Pressable onPress={() => router.push("./singup")}>
        <View style={styles.footer}>
          <Text style={styles.ftext}>No account? Register</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Login;

// /* ================= STYLES ================= */
/* styesls */

const styles = StyleSheet.create({
  container2: {
    height:250,
    width: 250,
    alignSelf:'center',
    justifyContent:'center',
    marginTop: 50,
    resizeMode: "cover",
  Radius:20,
   
  },

  heading: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    textTransform: "capitalize",
  },

  inputWrap: {
    marginTop: 20,
    alignItems: "center",
  },

  inputBox: {
    flexDirection: "row",
    width: "80%",
    height: 55,
    alignItems: "center",
    borderRadius: 14,
    marginTop: 12,
    paddingHorizontal: 10,
    elevation: 3,
    backgroundColor: "white",
  },

  inp: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },

  btn: {
    backgroundColor: "#0a63bccb",
    height: 40,
    width: 230,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  forgot: {
    marginTop: 12,
    opacity: 0.7,
  },

  footer: {
    backgroundColor: "#0a63bcd5",
    height: 60,
    marginTop:113,
    justifyContent: "center",
    alignItems: "center",
  },

  ftext: {
    color: "white",
    textTransform: "capitalize",
  },
});
