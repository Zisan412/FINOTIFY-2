import React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View,Image } from "react-native";
import Upper from "../Modules/Upper";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Danger from "../Modules/danger";



const Forgget = () => {
  const [press, setpress] = useState(0);
  const [email,setemail]=useState('')
    const [error,seterror]=useState('')


  const sub=()=>{
      if(email=="")
      {
        // seterror('please enter a valid detail')  
        alert('please enter a valid detail ')    
      setTimeout(() => {
       seterror('')
      }, 2000)
      }
      else{
        router.push('./otpenter')
      }
  }

  return (
    <View style={{backgroundColor: "#ffffff", height:'100%' }}>
          {/* TOP IMAGE */}
          {/* <Image
            source={require("../../assets/Forgget.png")}
            style={styles.container2}
          /> */}
      <View style={{paddingTop:0,marginTop:100}}><Text style={{textAlign:'center',fontSize:20,textTransform:'capitalize',fontFamily:''}}>
        enter email id to send a code {'\n'}
        for recover password</Text></View>
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
            send otp on email
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Forgget;

const styles = StyleSheet.create({
  container2: {
    height:250,
    width: 250,
    alignSelf:'center',
    justifyContent:'center',
    marginTop: 50,
    resizeMode: "cover",
  },
  inp: {
    width: 250,
    height: 50,
    marginTop: 0,
    
  },
  input: {
    height: 150,
    position: "relative",
    textTransform: "capitalize",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    position: "absolute",
    left: 45,
    top: 20,
    backgroundColor: "white",
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
