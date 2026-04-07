import React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Danger from "../Modules/Danger";
import axios from 'axios';
import { BASE_URL } from "../../constants/Config";


const Forgot = () => {
  const [press, setpress] = useState(0);
  const [email,setemail]=useState('')
    const [error,seterror]=useState('')



  const sub = async () => {
    await axios.post(`${BASE_URL}/email`, { email })
      .then(() => {
        router.push({ pathname: './otp-enter', params: { email } });
      })
      .catch(() => {
        seterror('Failed to send OTP. Please check your email and try again.');
        setTimeout(() => seterror(''), 2000);
      });
  };
  return (
    <View style={{backgroundColor: "#ffffff", height:'100%' }}>
              {error ? <Danger error={error} /> : null}
      <View style={{paddingTop:0,marginTop:150}}><Text style={{textAlign:'center',fontSize:20,textTransform:'capitalize',fontFamily:''}}>
        Enter email ID to send a code {'\n'}
        for recovering password</Text></View>
      <View style={styles.input}>
                 <View style={{display:'flex',flexDirection:'row',width:'80%',justifyContent:'center',alignItems:'center',borderRadius:14,marginTop:10,elevation:3,backgroundColor:'white'}}>
          <MaterialIcons name={'email'} size={24} color={'#0a63bcd5'} style={{}}></MaterialIcons>

        <TextInput
          style={[styles.inp, press == 1 && { opacity: 1 }]}
          onFocus={() => setpress(1)}
          onBlur={() => setpress(0)}
          placeholder="Email Id"
          value={email}
          onChangeText={setemail}
        ></TextInput>
        </View>
        <Pressable
          onPress={()=>sub()}
          style={[
            styles.btn,
            press === 6 && { backgroundColor: "#0a63bccb", opacity: 1 },
          ]}
          onPressIn={() => setpress(6)}
          onPressOut={() => setpress(0)}
        >
          <Text
            style={{
              color: "white",
              textTransform: "capitalize",
              width: 230,
              textAlign: "center",
            }}
          >
            Send OTP to Email
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  inp: {
    width: 250,
    height: 50,
  },
  input: {
    height: 150,
    position: "relative",
    textTransform: "capitalize",
    display: "flex",
    justifyContent: "center",
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
