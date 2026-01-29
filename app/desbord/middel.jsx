import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import All from './all'
import Income from './income'
import Expenss from './expenss'
import Total from './total'
const middel = () => {
    const [hover,sethover]=useState(1)
    const [set,setset]=useState(1)
        const [data,setdata]=React.useState(new Date());

    
       const datas=[
        {
            date:data,
            cat:'food 🍴',
            amm:200,
            des:'this fo food',
            it:'expenss'
        },
        {
            date:data,
            cat:'salary 💸',
            amm:2000,
            des:'this is salary',
            it:'income'
        },
          {
            date:data,
            cat:'salary 💸',
            amm:20000,
            des:'this is salary',
            it:'income'
        },
          {
            date:data,
            cat:'other ',
            amm:20,
            des:'mene pese diye chai me',
            it:'expenss'
        },
           {
            date:data,
            cat:'other ',
            amm:80,
            des:'dost ne pese diye',
            it:'income'
        },
        {
            date:data,
            cat:'shopping 🛍️',
            amm:800,
            des:'hum kharidi karne guy',
            it:'expenss'
        },
    ]

  return (
    <View>
      <View style={styles.allbtn}>
        <Pressable style={[styles.btn,hover==1 && {backgroundColor:'#0a63bcd5'}]}  onPress={()=>{sethover(1),setset(1)}}>
          <Text
            style={[styles.innerText,{width:50},hover==1 && {color:'white'}]}
            
          >
            All
          </Text>
        </Pressable>
        <Pressable style={[styles.btn,hover==2 && {backgroundColor:'#0a63bcd5'}]}  onPress={()=>{sethover(2),setset(2)}}>
          <Text
            style={[styles.innerText,{width:90},hover==2 && {color:'white'}]}
          >
            Income
          </Text>
        </Pressable>
        <Pressable style={[styles.btn,hover==3 && {backgroundColor:'#0a63bcd5'}]}  onPress={()=>{sethover(3),setset(3)}}>
          <Text
            style={[styles.innerText,{width:90},hover==3 && {color:'white'}]}
          >
            Expenss
          </Text>
        </Pressable>
        <Pressable style={[styles.btn,hover==4 && {backgroundColor:'#0a63bcd5'}]}  onPress={()=>{sethover(4),setset(4)}}>
          <Text
            style={[styles.innerText,{width:60},hover==4 && {color:'white'}]}
          >
           Total
          </Text> 
        </Pressable>

      </View>
      <View>

        {hover==1 && <All datas={datas}/>}
        {hover==2 && <Income go={datas}/>}
        {hover==3 && <Expenss go={datas}/>}
        {hover==4 && <Total go={datas}/>}
      </View>

    </View>
  );
};

export default middel;

const styles = StyleSheet.create({
  allbtn: {
    height: 40,
    marginTop: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    // borderWidth:1,
    width: "auto",
    borderRadius:5,
    // borderColor:'#ffffffd5',
    // width:100,
       elevation:5,
              backgroundColor: "white",
               height:32,
  },
  innerText:{
      textAlign: "center",
              fontSize: 16,
              fontFamily: "serif",
              color: "#0a63bcd5",     
             top:5
  }
});
