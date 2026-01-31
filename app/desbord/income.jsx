import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const income = ({go}) => {
  const [data, setdata] = React.useState(new Date());



  return (
    <>
    <ScrollView style={{ height: 450 }}>
      {go.map((i, key) => ( 
        <View>
          {i.it=='income'?
          <View style={styles.list}>
              <View style={styles.innerfirst}>
                  <Text style={styles.cat}>{i.cat}</Text>
                  <Text style={styles.amm}><Ionicons name='arrow-up-circle' style={styles.icn} color={'#69df72'} size={20}></Ionicons> ₹{i.amm}</Text>
                  <Pressable style={styles.delete}>
                    <Ionicons name='trash-outline' color={'red'} size={20}></Ionicons>
                  </Pressable>
                </View>
                <View style={styles.des}>
                  <Text style={styles.des}>{i.des}</Text>
                  </View>
            </View>
:<Text></Text>}
        </View>

))}
    </ScrollView>
    </>
  );
  
};

export default income;

const styles = StyleSheet.create({
  list: {
    elevation:4,
    borderRadius:20,
    height: 100,
    backgroundColor: "white",
    margin: 10,
    borderLeftColor:'#69df72',
    borderLeftWidth:5
  },
  innerfirst:{
    // backgroundColor:'red',
    height:50,display:'flex',flexDirection:'row',justifyContent:'space-between'
  },
  cat:{
    // backgroundColor:'green',
    width:'49%',
    margin:12,
    fontSize:18,
    textTransform:'capitalize'
  },
  amm:{
    marginTop:13,
    color:'#69df72',
    fontSize:18,
    fontWeight:800
  },
  icn:{
    
  },
  delete:{
    margin:15
  },
  des:{
    marginLeft:6,
    fontWeight:100 
  
  }
  
});
