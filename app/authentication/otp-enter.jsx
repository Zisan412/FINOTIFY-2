import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Danger from "../Modules/Danger";
import axios from 'axios';
import { BASE_URL } from "../../constants/Config";

const OtpEnter = () => {
  const [otp, setotp] = useState('');
  const [press, setpress] = useState(0);
  const [error, seterror] = useState('');
  const email = useLocalSearchParams().email;


  const sub = async () => {
    await axios.post(`${BASE_URL}/otp`, { otp })
      .then(() => {
        router.push({ pathname: './new-password', params: { email } });
      })
      .catch(() => {
        seterror('OTP is incorrect. Please try again.');
        setTimeout(() => seterror(''), 2000);
      });
  };



 
  return (
    <View style={{backgroundColor: "#ffffff", height:'100%' }}>

              {error ? <Danger error={error} /> : null}
           <View style={{paddingTop:0,marginTop:150}}><Text style={{textAlign:'center',fontSize:20,fontFamily:''}}>
               Enter code sent by this email {'\n'} Finotify.in@gmail.com</Text></View>
      <View style={styles.input}>
                 <View style={{display:'flex',flexDirection:'row',width:'80%',justifyContent:'center',alignItems:'center',borderRadius:14,marginTop:0,elevation:3,backgroundColor:'white'}}>
          <MaterialIcons name={'update'} size={24} color={'#0a63bcd5'} style={{}}></MaterialIcons>

        <TextInput
          style={[styles.inp, press == 1 && { opacity: 1 }]}
          onFocus={() => setpress(1)}
          onBlur={() => setpress(0)}
          keyboardType="numeric"
          placeholder="Enter the OTP"
            value={otp}
            onChangeText={setotp}
            MaxLength={5}
            autoFocus={true}
            
        ></TextInput>
        </View>
        <Pressable
        
          style={[
            styles.btn,
            press === 6 && { backgroundColor: "#0a63bcff", opacity: 1 },
          ]}
          onPressIn={() => setpress(6)}
          onPressOut={() => setpress(0)}
            onPress={()=>sub()}
        >
          <Text
            style={{
              color: "white",
              textTransform: "capitalize",
              width: 230,
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </Pressable>
       

    </View>
    </View>
  );
};

export default OtpEnter;

const styles = StyleSheet.create({
  inp: {
    width: 250,
    height: 50,
    paddingHorizontal: 10,
  },
  input: {
    height: 200,
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
