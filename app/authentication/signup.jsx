import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Danger from "../Modules/Danger";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../constants/Config";

const Signup = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const confirmPasswordRef = useRef(null);

  const sendData = () => {
    if (!username || !mobile || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setTimeout(() => setError(''), 2000);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => setError(''), 2000);
      return;
    }
    setError('');
    axios.post(`${BASE_URL}/register`, {
      name: username,
      phonenumber: mobile,
      email,
      password,
    }).then(async (res) => {
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('userName', res.data.name);
      await AsyncStorage.setItem('userEmail', res.data.email);
      await AsyncStorage.setItem('userId', res.data._id);
      router.replace('../dashboard/dashboard');
    }).catch(() => {
      setError('Registration failed. Please try again.');
      setTimeout(() => setError(''), 2000);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image style={styles.logo} source={require("../../assets/signup.png")} />
        </View>

        {error ? <Danger error={error} /> : null}

        <View style={{ paddingTop: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 20, textTransform: "capitalize", marginTop: -20 }}>
            Register Here
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {/* Username */}
          <View style={styles.inputRow}>
            <Ionicons name="person" size={24} color="#0a63bcd5" />
            <TextInput
              style={styles.inp}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
              placeholder=" Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Mobile */}
          <View style={[styles.inputRow, { marginTop: 10 }]}>
            <Ionicons name="call" size={24} color="#0a63bcd5" />
            <TextInput
              style={styles.inp}
              onFocus={() => setFocusedInput('mobile')}
              onBlur={() => setFocusedInput(null)}
              placeholder=" Mobile No"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email */}
          <View style={[styles.inputRow, { marginTop: 10 }]}>
            <MaterialIcons name="email" size={24} color="#0a63bcd5" />
            <TextInput
              style={styles.inp}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Email id"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={[styles.inputRow, { marginTop: 10 }]}>
            <MaterialIcons name="security" size={24} color="#0a63bcd5" />
            <TextInput
              style={styles.inp}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              placeholder=" Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              blurOnSubmit={false}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "lock-open" : "lock-closed"} size={22} color="gray" />
            </Pressable>
          </View>

          {/* Confirm Password */}
          <View style={[styles.inputRow, { marginTop: 10 }]}>
            <MaterialIcons name="security" size={24} color="#0a63bcd5" />
            <TextInput
              ref={confirmPasswordRef}
              style={styles.inp}
              onFocus={() => setFocusedInput('confirm')}
              onBlur={() => setFocusedInput(null)}
              placeholder=" Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              returnKeyType="done"
            />
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? "lock-open" : "lock-closed"} size={22} color="gray" />
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}
            onPress={sendData}
          >
            <Text style={{ color: "white", textTransform: "capitalize" }}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Pressable onPress={() => router.push("./login")}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? Login</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  logo: {
    width: 250, height: 250, alignSelf: 'center', mixBlendMode: 'multiply',
  },
  inp: {
    flex: 1,
    height: 50,
  },
  inputContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  inputRow: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    borderRadius: 14,
    elevation: 3,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: "#0a63bccb",
    height: 42,
    width: 230,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  footer: {
    backgroundColor: "#0a63bcd5",
    height: 68,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "white",
    textTransform: "capitalize",
    width: 210,
    textAlign: "center",
  },
});