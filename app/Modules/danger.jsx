import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const danger = ({errror}) => {
  return (
    <View style={styles.danger}>
        <Text style={{textTransform:'capitalize',color:'white',backgroundColor:'transparent'}}>{errror} <Ionicons name="arrow-up-right-box-sharp"></Ionicons></Text>
    </View>
  )
}

export default danger

const styles = StyleSheet.create({
    danger:{
        backgroundColor:'#235f23f5',
        height:35,
    
        width:205,
        color:'white',
        position:'absolute',
        borderColor:'green',
        borderWidth:1,
        left:70,
        top:80,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        elevation:10,
        
        
    }
})