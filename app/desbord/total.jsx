import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const total = ({go}) => {
  let i=0
  let incomes=0
 let  expenss=0
  

  for(i=0;i<go.length;i++)
  {
    if(go[i].it=='income')
    {
      incomes+=go[i].amm
    }
    else if(go[i].it=='expenss')
    {
      expenss+=go[i].amm
    }
  }
  console.log(incomes,expenss)

  
 let food=0
 let salary=0
  let shopping=0
  let traveling=0
  let household=0
  let sports=0
  let other=0
  
  
  
 let food2=0
 let salary2=0
  let shopping2=0
  let traveling2=0
  let household2=0
  let sports2=0
  let other2=0
  
  for(i=0;i<go.length;i++)
  {
    if(go[i].it=='income'){
    if(go[i].cat=='food 🍴')
    {
      food+=go[i].amm
      console.log(go[i].amm)
    }
    else if(go[i].cat=='salary 💸')
    {
      salary+=go[i].amm
    }
    else if(go[i].cat=='shopping 🛍️')
    {
      shopping+=go[i].amm
    }
    else if(go[i].cat=='traveling 🧳')
    {
      traveling+=go[i].amm
    }
    else if(go[i].cat=='household 🏠🏠')
    {
      household+=go[i].amm
    }
    else if(go[i].cat=='sports 🥎')
    {

      sports+=go[i].amm
    }
    else if(go[i].cat=='other ')
    {
      other+=go[i].amm
    }
  }
  else if(go[i].it=='expenss'){
    if(go[i].cat=='food 🍴')
    {
      food2+=go[i].amm
      console.log(go[i].amm)
    }
    else if(go[i].cat=='salary 💸')
    {
      salary2+=go[i].amm
    }
    else if(go[i].cat=='shopping 🛍️')
    {
      shopping2+=go[i].amm
    }
    else if(go[i].cat=='traveling 🧳')
    {
      traveling2+=go[i].amm
    }
    else if(go[i].cat=='household 🏠🏠')
    {
      household2+=go[i].amm
    }
    else if(go[i].cat=='sports 🥎')
    {

      sports2+=go[i].amm
    }
    else if(go[i].cat=='other ')
    {
      other2+=go[i].amm
    }
  }
  }

 let total=food+salary+shopping+traveling+household+other
 let total2=food2+salary2+shopping2+traveling2+household2+other2

  return (
    <View style={{height:450,width:350,marginLeft:7}}>
      <View>
        <Text>select a Date </Text>
      </View>
      <View style={styles.text}>
        <Text style={{color:'white',fontSize:18,textTransform:'capitalize',fontFamily:'serif'}}>Summery of Your Transtions</Text>
        </View>
        <View style={styles.heading}>
          <Text style={{color:'white',textTransform:'capitalize',width:70}}>category</Text>
          <Text style={{color:'white',textTransform:'capitalize'}}> Income  </Text>
          <Text style={{color:'white',textTransform:'capitalize'}}> Expense  </Text>
          <Text style={{color:'white',textTransform:'capitalize'}}>Balance  </Text>
          </View>
          <View style={styles.balnce}>
            <View style={{borderRightColor:'white',borderRightWidth:1}}>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>Food</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>salary</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>shopping</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>traveling</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>sports</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>others</Text>
            </View>
            <View>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'green'}}>{food}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'green'}}>{salary}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'green'}}>{shopping}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'green'}}>{traveling}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'green'}}>{sports}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'green'}}>{other}</Text>
              </View>
              <View>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'red'}}>{food2}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'red'}}>{salary2}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'red'}}>{shopping2}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'red'}}>{traveling2}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'red'}}>{sports2}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16, color:'red'}}>{other2}</Text>
              </View>
              <View>
                <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>{food-food2}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>{salary-salary2}</Text>
              <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>{shopping-shopping2}</Text>
                <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>{traveling-traveling2}</Text>
                <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>{sports-sports2}</Text>
                <Text style={{height:25,textTransform:'capitalize',fontSize:16,}}>{other-other2}</Text>

              </View>
              </View>
                             <View style={{borderTopWidth:1,paddingTop:10,borderTopColor:'black',marginTop:-80,width:320,display:'flex',flexDirection:'row',justifyContent:'space-around',marginLeft:20}}>
                              <Text >             </Text>
                              <Text style={{color:'green'}}>{food+salary+shopping+sports+traveling+other}</Text>
                              <Text style={{color:'red'}}>{food2+salary2+shopping2+sports2+traveling2+other2}</Text>
                              <Text>{total-total2}</Text>
                             </View>

    
      </View>
     
  )
}

export default total

const styles = StyleSheet.create({
  text:{
    backgroundColor:'#24a7ffbd',
    height:30,alignItems:'center',
    justifyContent:'center',
    marginTop:10,
    borderTopLeftRadius:5,
    borderTopRightRadius:5
  },
  heading:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#24a7ff70',
    height:26,alignItems:'center'
  },
  balnce:{
    display:'flex',
  flexDirection:'row',
  justifyContent:'space-around',height:250,
  paddingTop:10,backgroundColor:'white',borderRadius:5,elevation:5

  }
})