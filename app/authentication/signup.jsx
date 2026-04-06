import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Upper from "../Modules/Upper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Danger from "../Modules/Danger";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../constants/Config";

const Signup = () => {
  const [press, setpress] = useState(0);
  const [chnage, setchnage] = useState(false);
  const [hide, sethide] = useState(10);
  const [hide2, sethide2] = useState(11);
  const [chnage2, setchnage2] = useState(false);

  const [username, setusername] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [paas2, setpass2] = useState('');
  const [pass, setpass] = useState('');

  const [error, seterror] = useState('');

  const confirmPasswordRef = useRef(null);

  const senddata = () => {
    if (username == '' || mobile == '' || email == '' || paas2 == '' || pass == '') {
      return;
    } else if (pass != paas2) {
      return;
    } else {
      console.log('yess');
      seterror('');
      axios.post(`${BASE_URL}/register`, {
        name: username,
        phonenumber: mobile,
        email: email,
        password: pass
      }).then(async (res) => {
        console.log(JSON.stringify(res.data.message));
        await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('userName', res.data.name);
        await AsyncStorage.setItem('userEmail', res.data.email);
        await AsyncStorage.setItem('userId', res.data._id);
        router.replace('../dashboard/dashboard');
      }).catch((error) => {
        seterror('Registration failed. Please try again.');
        setTimeout(() => {
          seterror('');
        }, 2000);
      });
    }
  };

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
    if (username == '' || mobile == '' || email == '' || paas2 == '' || pass == '') {
      seterror('please enter a valid detail');
      setTimeout(() => { seterror(''); }, 2000);
    } else if (pass != paas2) {
      seterror('no match password');
      setTimeout(() => { seterror(''); }, 2000);
    } else {
      router.replace('/dashboard/dashboard');
    }
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

        {error ? <Danger error={error} /> : ''}

        <View style={{ paddingTop: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 20, textTransform: "capitalize", marginTop: -20 }}>
            Register Here
          </Text>
        </View>

        <View style={styles.input}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 14, elevation: 3, backgroundColor: 'white' }}>
            <Ionicons name={'person'} size={24} color={'#0a63bcd5'} />
            <TextInput
              style={[styles.inp, press == 1 && { opacity: 1 }]}
              onFocus={() => setpress(1)}
              onBlur={() => setpress(0)}
              placeholder=" Username"
              value={username}
              onChangeText={setusername}
            />
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 14, marginTop: 10, elevation: 3, backgroundColor: 'white' }}>
            <Ionicons name={'call'} size={24} color={'#0a63bcd5'} />
            <TextInput
              style={[styles.inp, press == 2 && { opacity: 1 }]}
              onFocus={() => setpress(2)}
              onBlur={() => setpress(0)}
              placeholder=" Mobile No"
              value={mobile}
              onChangeText={setmobile}
            />
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 14, marginTop: 10, elevation: 3, backgroundColor: 'white' }}>
            <MaterialIcons name={'email'} size={24} color={'#0a63bcd5'} />
            <TextInput
              style={[styles.inp, press == 3 && { opacity: 1 }]}
              onFocus={() => setpress(3)}
              onBlur={() => setpress(0)}
              placeholder="Email id"
              value={email}
              onChangeText={setemail}
            />
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 14, marginTop: 10, elevation: 3, backgroundColor: 'white' }}>
            <MaterialIcons name={'security'} size={24} color={'#0a63bcd5'} />
            <TextInput
              style={[styles.inp, press == 4 && { opacity: 1 }]}
              onFocus={() => setpress(4)}
              onBlur={() => setpress(0)}
              placeholder=" Password"
              secureTextEntry={chnage}
              value={paas2}
              onChangeText={setpass2}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
          <Pressable onPress={() => hideing()}>
            {hide == 10 && <Ionicons name="lock-open" size={24} color="gray" style={{ position: "relative", right: -100, top: -40 }} />}
            {hide == 9 && <Ionicons name="lock-closed" size={24} color="gray" style={{ position: "relative", display: "none", right: -100, top: -40 }} />}
          </Pressable>
          <Pressable onPress={() => show()}>
            {hide == 10 && <Ionicons name="lock-open" size={24} color="gray" style={{ position: "relative", display: "none", right: -100, top: -40 }} />}
            {hide == 9 && <Ionicons name="lock-closed" size={24} color="gray" style={{ position: "relative", right: -100, top: -40 }} />}
          </Pressable>

          <View style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 14, marginTop: -10, elevation: 3, backgroundColor: 'white', height: '12%' }}>
            <MaterialIcons name={'security'} size={24} color={'#0a63bcd5'} />
            <TextInput
              ref={confirmPasswordRef}
              style={[styles.inp, press == 5 && { opacity: 1 }, { paddingTop: 12 }]}
              onFocus={() => setpress(5)}
              onBlur={() => setpress(0)}
              placeholder=" Confirm Password"
              secureTextEntry={chnage2}
              value={pass}
              onChangeText={setpass}
              returnKeyType="done"
            />
          </View>
          <Pressable onPress={() => hideing2()}>
            {hide2 == 12 && <Ionicons name="lock-open" size={24} color="gray" style={{ position: "relative", right: -100, top: -40 }} />}
            {hide2 == 11 && <Ionicons name="lock-closed" size={24} color="gray" style={{ position: "relative", display: "none", right: -100, top: -40 }} />}
          </Pressable>
          <Pressable onPress={() => show2()}>
            {hide2 == 12 && <Ionicons name="lock-open" size={24} color="gray" style={{ position: "relative", display: "none", right: -100, top: -40 }} />}
            {hide2 == 11 && <Ionicons name="lock-closed" size={24} color="gray" style={{ position: "relative", right: -100, top: -40 }} />}
          </Pressable>

          <Pressable
            style={[styles.btn, press === 6 && { backgroundColor: "rgba(2, 91, 151, 0.49)", opacity: 1 }]}
            onPressIn={() => setpress(6)}
            onPressOut={() => setpress(0)}
            onPress={() => senddata()}
          >
            <Text style={{ color: "white", textTransform: "capitalize" }}>Signup Here</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Pressable onPress={() => router.push("./login")}>
        <View style={styles.footer}>
          <Text style={styles.ftext}>Already have an account? Login</Text>
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
    width: 250,
    height: 50,
    marginTop: 0,
    position: "relative",
    opacity: 1,
  },
  input: {
    marginTop: 25,
    alignItems: "center",
    position: "relative",
    textTransform: "capitalize",
  },
  label: {
    position: "absolute",
    left: 45,
    top: 20,
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: "#0a63bccb",
    height: 42,
    width: 230,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    opacity: 1,
  },
  hr: {
    borderBottomWidth: 1,
    marginTop: 20,
    borderBottomColor: "skyblue",
    width: 300,
    alignSelf: "center",
  },
  footer: {
    backgroundColor: "#0a63bcd5",
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  ftext: {
    color: "white",
    textTransform: "capitalize",
    width: 210,
    textAlign: "center",
  },
});