import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Upper = ({singup}) => {
  return (
    <View>
         <View style={styles.container2}>
             <Text style={styles.text}>{"\n"}{singup}</Text>
        </View>
    </View>
  )
}

export default Upper

const styles = StyleSheet.create({
    container2: {
    backgroundColor: "#0a63bcd5",
    width: 400,
    borderRadius: 220,
    height: 420,
    marginTop: -230,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "185deg" }],
    // elevation:10,
    left: -10,
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "arial",
    transform: [{ rotate: "175deg" }],
    marginTop: -200,
    marginRight:-10,
    // textAlign:'center',
    textTransform:'capitalize',
  },
})