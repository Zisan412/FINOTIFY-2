import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const expenss = ({go}) => {
    const [data, setdata] = React.useState(new Date());
  
  return (
    <>
       <ScrollView style={{ height: 450 }}>
      {go.map((i, key) => (
        <View>
          {i.it=='expenss'?              
           <View style={[styles.list,i.it=='income' && {borderLeftColor:'green',borderLeftWidth:5},i.it=='expenss' && {borderLeftColor:'red',borderLeftWidth:5}]}>
          <View style={styles.first}>
            <View style={styles.date}>
              <Text style={{ color: "white" }}>{data.getDate()}-</Text>
              <Text
                style={{
                  backgroundColor: "black",
                  width: 32,
                  color: "white",
                  height: 20,
                  textAlign: "center",
                }}
              >
                {data.toLocaleString("default", { month: "short" })}
              </Text>
              <Text>-</Text>
              <Text style={{ color: "white" }}>{data.getFullYear()}</Text>
            </View>
          </View>
          <View style={styles.second}>
            <View style={styles.cat}>
              <Text
                style={{
                  textTransform: "capitalize",
                  paddingTop: 5,
                  fontFamily: "serif",
                  fontStyle: "italic",
                  fontSize: 18,
                }}
              >
                {i.cat}
              </Text>
            </View>
                 <View style={styles.income}>
                <Text>-</Text>
              </View>
              <View style={styles.income}>
                <Text style={{ color: "red", fontSize: 18 }}>{i.amm}</Text>
              </View>
             
           

            <View
              style={{
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="trash-sharp" size={22} color={"red"}></Ionicons>
            </View>
          </View>
          <View style={styles.last}>
            <View style={styles.des}>
              <Text style={{ textTransform: "capitalize" }}>{i.des}</Text>
            </View>
          </View>
        </View>
:<Text></Text>}
        </View>

))}
    </ScrollView>
    </>
  );
  
}

export default expenss

const styles = StyleSheet.create({
  list:{
         elevation:3,

        borderRadius:5,
        height:130,
        backgroundColor:'white',
        margin:10,
        // display:'flex',
        // flexDirection:'row',
        // justifyContent:'space-around',
        // backgroundColor:'#07ff1b3d',
    },
    first:{
        height:32,
        width:'100%',
         paddingLeft:5,
         paddingBottom:5,
         alignItems:'center',
         borderTopLeftRadius:5,
         borderTopRightRadius:5,
         
    },
    date:{
        paddingTop:5,
        paddingLeft:5,
        // backgroundColor:'yellow',
        marginBottom:20,
        height:30,
        width:100,
        textTransform:'capitalize',
        display:'flex',flexDirection:'row', gap:4
    },
    cat:{
        paddingLeft:5,
        fontFamily:'serif',
    },
    des:{
        width:300,
        fontFamily:'sens-serif',fontSize:20,
        paddingLeft:5,
        paddingTop:5
    },
    second:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        // paddingTop:2,backgroundColor:'yellow',
        height:35,padding:3,
    },
    last:{
        display:'flex',
        flexDirection:'row', gap:10,
        paddingTop:10 ,  
        paddingLeft:10,
        paddingBottom:10,
        // backgroundColor:'red'
    },
    income:{
        paddingTop:5,


        
    }
})