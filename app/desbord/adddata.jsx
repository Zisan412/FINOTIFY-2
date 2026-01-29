import { Pressable, StyleSheet, Text, TextInput, View,ScrollView, ImageBackground } from "react-native";
import React, { use, useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import Danger from '../Modules/danger'

const adddata = () => {

  const [close,setclosde]=useState(0)
  const [other,setother]=useState(0)
  const [item,setitem]=useState('')
  const [income,setincome]=useState('income')
    const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [amm,setamm]=useState('')
  const [desc,setdesc]=useState('')
const [expenss,setexpenss]=useState('expenss')
const [error,seterror]=useState('')
const [due,setdue]=useState('due data')
  const onChange = (event, selectedDate) => {
    setShow(false)
    if (selectedDate) {
      setDate(selectedDate)
    }
  }
  

  const food='food 🍴'
  const shopping='salary 💸'
  const traveling='traveling 🧳'
  const household='household 🏠'
  const spoort='sports 🥎'
  const other2='other '



  const main=()=>{
    setclosde(0)
    setitem(food)
  }

  const datefatch=(yes)=>{
    if(date=="" || amm==""||item==""||desc=="")
    {
      
         alert('Enter A valid Data ❌')
       
    }
    else{
    console.log(date)
    console.log(amm)
    console.log(item)
    console.log(desc)
    console.log(yes)

    seterror('data enterd succesfully')
       setTimeout(() => {
        seterror('')
    }, 2000);
    }

    setDate(new Date())
    setamm('')
    setdesc('')
    setitem('')

 
  }


 
   
  return (
      
    <ImageBackground source={require('../../assets/ChatGPT Image Jan 21, 2026, 07_34_58 PM.png')} style={{flex:1}}>
        {error?<Danger errror={error}/>:''}
      <View style={[styles.addincomeexpensse,close===2 && {opacity:0.5}]} >
        <View style={styles.text1}>
          <Text style={styles.innertext}>income & expenss</Text>
        </View>
        <View style={styles.inputs}>
          <Pressable onPress={() => setShow(true)} style={[styles.inp,{display:'flex',flexDirection:"row"}]}>
  <Text style={{paddingTop:25}}>{date.toLocaleDateString()}</Text>
    <Ionicons name="calendar" style={{position:'relative',left:220,top:26}} size={18}></Ionicons>
</Pressable>

          
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={onChange}
        />
      )}
          <TextInput style={styles.inp} placeholder="2000" keyboardType="numeric" value={amm} onChangeText={setamm}></TextInput>
          <TextInput
            style={styles.inp}
            placeholder="Food,Traveling,shopping"
            onPress={()=>setclosde(2)}
          >
            <Text>{item}</Text>
          </TextInput>
          <TextInput
            style={styles.inp}
            placeholder="Description For Income Or Expenss"
            value={desc}
            onChangeText={setdesc}
          ></TextInput>
          <View style={styles.mainbtn}>
            <Pressable style={[styles.btn, { backgroundColor: "#0a63bc" },close==10 && {backgroundColor:'#0b42b9'}]} onPress={()=>datefatch(income)}
             onPressIn={()=>setclosde(10)} onPressOut={()=>setclosde(0)} >
              <Text
                style={{
                  color: "white",
                  textTransform: "capitalize",
                  fontFamily: "serif",
                  fontSize: 16,
                }}
              >
                {income}
              </Text>
            </Pressable>
            <Pressable style={[styles.btn, { backgroundColor: "#ff0303c2" },close==11 && {backgroundColor:'#ff0000'}]} onPress={()=>datefatch(expenss)}  onPressIn={()=>setclosde(11)} onPressOut={()=>setclosde(0)}  >
              <Text
                style={{
                  color: "white",
                  textTransform: "capitalize",
                  fontFamily: "serif",
                  fontSize: 16,
                }}
              >
                Expenss
              </Text>
            </Pressable>
          </View>
           <Pressable style={[styles.btn, { backgroundColor: "#1343ace3",width:250,position:'relative',left:35,top:20 },close==12 && {backgroundColor:'#1343acc0'}]} onPress={()=>datefatch(due)} onPressIn={()=>setclosde(12)} onPressOut={()=>setclosde(0)}  >
              <Text
                style={{
                  color: "white",
                  textTransform: "capitalize",
                  fontFamily: "serif",
                  fontSize: 16,
                  width:200,
                }}
              >
                Add data for due pyment
              </Text>
            </Pressable>
        </View>
      </View>
        <View style={[{position:'absolute'}]}>
      {/* <Category cat={cat(yes)}/> */}
         <View style={[styles.main,close==2 && {display:'block'}]} >
            <View style={styles.text}>
          <Text style={{color:'black',fontSize:18,textTransform:'capitalize',textAlign:'center'}}>select category</Text>
          <Ionicons name='close' size={20} style={{position:'relative',left:40}} onPress={()=>setclosde(0)} ></Ionicons>
          </View>
           <ScrollView style={{display:'flex',flexDirection:'column',height:150}}>
          <Pressable style={[]} onPressIn={()=>setother(3)} onPressOut={()=>setother(0)} onPress={()=>main()}>
            <Text style={[styles.cat,other===3 && {backgroundColor:'#3e62ffda'}]}>{food}</Text></Pressable>  
                      <Pressable style={[]} onPressIn={()=>setother(4)} onPressOut={()=>setother(0)} onPress={()=>{[setclosde(0), setitem(shopping)]}}>

            <Text style={[[styles.cat,other===4 && {backgroundColor:'#3e62ffda'}]]}>{shopping}</Text></Pressable>
                      <Pressable style={[]} onPressIn={()=>setother(5)} onPressOut={()=>setother(0)} onPress={()=>{[setclosde(0),setitem(traveling)]}}>

            <Text style={[styles.cat,other===5 && {backgroundColor:'#3e62ffda'}]}>{traveling}</Text></Pressable>
                      <Pressable style={[]} onPressIn={()=>setother(6)} onPressOut={()=>setother(0)} onPress={()=>{[setclosde(0),setitem(household)]}}>

            <Text style={[styles.cat,other===6 && {backgroundColor:'#3e62ffda'}]}>{household}</Text></Pressable>
                      <Pressable style={[]} onPressIn={()=>setother(7)} onPressOut={()=>setother(0)} onPress={()=>{[setclosde(0),setitem(spoort)]}}>

            <Text style={[styles.cat,other===7 && {backgroundColor:'#3e62ffda'}]}>{spoort}</Text></Pressable>
                      <Pressable style={[]} onPressIn={()=>setother(8)} onPressOut={()=>setother(0)} onPress={()=>{[setclosde(0),setitem(other2)]}}>

            <Text style={[styles.cat,{marginBottom:2},other===8 && {backgroundColor:'#3e62ffda'}]}>{other2}</Text></Pressable>
           </ScrollView>
      
          </View>
      </View> 
    </ImageBackground>
  );
};

export default adddata;

const styles = StyleSheet.create({
  addincomeexpensse: {
    // backgroundColor:'red',
    height: 760,
    width: 370,
    marginLeft: 0,
    
  },
  text1: {
    height: 40,
    marginTop:40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  innertext: {
    fontSize: 20,
    fontFamily: "serif",
    textTransform: "capitalize",
    // backgroundColor:'yellow',
    width:200,
    textAlign: "center",
  },
  inputs: {
    // backgroundColor:'green',
    height: 335,
    width: 330,
    marginLeft:15
  },
  inp: {
    borderBottomWidth: 1,
    fontSize: 15,
    borderColor: "#2a74e2ff",
    fontFamily: "Gill Sans",
    height: 65,
    textTransform: "capitalize",
  },
  mainbtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    paddingTop: 30,
  },
  btn: {
    height: 40,
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation:5,
    shadowColor:'red'
  },
      main:{
        backgroundColor:'white',
        position:'absolute',
        height:300,
        width:250,
        margin:50,
        marginTop:200,
        borderRadius:20,
        display:'none'
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
         paddingTop:10,
          marginTop:40,
          height:40,textAlign:'center',
          fontFamily:'serif',
          textTransform:'uppercase',

          
        }
});
