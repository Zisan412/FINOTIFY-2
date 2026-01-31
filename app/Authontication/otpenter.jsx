import { StyleSheet, Text, View ,Image} from "react-native";
// import React, { useRef } from "react";
import { useState } from "react";
import { TextInput, Pressable } from "react-native";
import Upper from "../Modules/Upper";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Danger from "../Modules/danger";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
const Otpenter = () => {
    const [otp,setotp]=useState('')
  const [press, setpress] = useState(0);
    const [yes,setyes]=useState('')
    const [error,seterror]=useState('')
  let [timer,settimer]=useState(false)

  const sub=()=>{
    if(otp=="")
    {
        alert('please enter a valid detail ')  
      setTimeout(() => {
        seterror('')
      }, 2000)
    }
    else if(otp!='12345')
      {
          alert('no match otp')  
    
      setTimeout(() => {
        seterror('')
      }, 2000)
      }
    
    else{
      router.push('./newpass')
      settimer(true)
    }
  }

  const timerfun=()=>{
      if(timer)
      { 
        setyes('otp resend successfully')
        settimer(false)
      }
      else{
          alert('please wait for timer to end')
      }
    }

 
  return (
    <View style={{backgroundColor: "#ffffff", height:'100%' }}>
          {/* TOP IMAGE */}
          {/* <Image
            source={require("../../assets/Forgget.png")}
            style={styles.container2}
          />   */}
           <View style={{paddingTop:0,marginTop:100}}><Text style={{textAlign:'center',fontSize:20,textTransform:'capitalize',fontFamily:''}}>
               enter code sent on email {'\n'} musabmomin234@gmail.com</Text></View>
      <View style={styles.input}>
                 <View style={{display:'flex',flexDirection:'row',width:'80%',justifyContent:'center',alignItems:'center',borderRadius:14,marginTop:0,elevation:3,backgroundColor:'white'}}>
          <MaterialIcons name={'update'} size={24} color={'#0a63bcd5'} style={{}}></MaterialIcons>

        <TextInput
          style={[styles.inp, press == 1 && { opacity: 1 }]}
          onFocus={() => setpress(1)}
          onBlur={() => setpress(0)}
          keyboardType="numeric"
          placeholder="Enter a otp"
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
       <View style={styles.otpresend}  >
          {timer==true?
          <Pressable onPress={()=>timerfun()}>
          <Text style={{color:'#0a63bcff',fontSize:16,textTransform:'capitalize',width:100}}>resend otp</Text>
                   </Pressable>

          :
          
          <CountdownCircleTimer
    isPlaying

    duration={15}
    remainingTime={10}
    
    size={50}
    strokeWidth={6}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
    onComplete={() => settimer(true)}

            
    

  >
    {({ remainingTime }) => <Text>{remainingTime} :s</Text>
}
</CountdownCircleTimer>}
      </View>

    </View>
    </View>
  );
};

export default Otpenter;

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
    paddingHorizontal: 10
  },
  input: {
    height: 200,
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
  footer: {
    backgroundColor: "skyblue",
    height: 60,
    marginTop: 121,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  ftext: {
    color: "white",
    textTransform: "capitalize",
    width: 190,
  },
  otpresend:{
    paddingTop:0,
    height:70,
    alignItems:'center',
    justifyContent:'center',
    width:'50%',  
      flexDirection:'row',
  
  },
});
