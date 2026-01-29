import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const category = ({catt}) => {

  const [closed,setclosed]=useState(0)

const cat=()=>{
      console.log(catt)
}

  return (
    <View>
    <View style={[styles.main]} >
      <View style={styles.text}>
    <Text style={{color:'black',fontSize:18,textTransform:'capitalize',textAlign:'center'}}>select category</Text>
    <Ionicons name='close' size={20} style={{position:'relative',left:40}}></Ionicons>
    </View>
     <ScrollView style={{display:'flex',flexDirection:'column',height:150}}>
      <Text style={styles.cat}>food 🍴</Text>
      <Text style={styles.cat}>shooping 🛍️</Text>
      <Text style={styles.cat}>traveling 🧳</Text>
      <Text style={styles.cat}>household 🏠</Text>
      <Text style={styles.cat}>sports 🥎</Text>
      <Text style={styles.cat} onPress={()=>cat()} >other </Text>
     </ScrollView>

    </View>
    </View>
  )
}

export default category

const styles = StyleSheet.create({
    main:{
        backgroundColor:'white',
        position:'absolute',
        height:300,
        width:250,
        margin:50,
        marginTop:200,
        borderRadius:20
        },
        text:{
          height:45,
          display:'flex',
          justifyContent:'center',
          flexDirection:'row',
          alignItems:'center',
          width:250,
          paddingTop:0,
          backgroundColor:'#2c59d68a',
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          

        },
        cat:{
         
          marginTop:20,
          height:40,textAlign:'center',
          fontFamily:'serif',
          textTransform:'uppercase',

          
        }
})