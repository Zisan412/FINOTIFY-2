import { StyleSheet, Text, View,ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import PieChart from 'react-native-pie-chart'
import { BarChart,RadarChart} from 'react-native-gifted-charts'

const headr = () => {
       {
    const widthAndHeight = 200

    const series = [
      { value: 430, color: '#ED6665',label:'food'},
      { value: 321, color: '#fff23f9d',label:'shopping'},
      { value: 185, color: 'rgb(65, 166, 196)',label:'salary' },
      { value: 123, color: 'rgba(144, 199, 255, 0.57)',label:'other' },
    ]
    const barData = [
        {
          value: 40,
          label: 'Jan',
          spacing: 2,
          labelWidth:15,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 20, frontColor: '#ED6665'},
        {
          value: 50,
          label: 'Feb',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 40, frontColor: '#ED6665'},
        {
          value: 75,
          label: 'Mar',
          spacing: 2,
          labelWidth:30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 25, frontColor: '#ED6665'},
        {
          value: 30,
          label: 'Apr',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 20, frontColor: '#ED6665'},
        {
          value: 60,
          label: 'May',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 40, frontColor: '#ED6665'},
        {
          value: 65,
          label: 'Jun',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 30, frontColor: '#ED6665'},
      ];
      
  return (
    <View style={{alignItems:'center',backgroundColor:''}}>
      
        <View style={styles.chartsText}>
            <Text style={{fontSize:20,fontFamily:'sens-serif',color:'white',textShadowColor:'grey',textShadowRadius:20}}>Transction charts</Text>
            </View>
            <View style={styles.PieChart}>
              <PieChart cover={0.45} widthAndHeight={widthAndHeight } series={series} style={{marginTop:-30,marginLeft:20,
                backgroundColor:'white',elevation:15,borderRadius:100}}></PieChart>
                <View style={{display:'flex',flexDirection:'column',margin:5,height:80}}>
              {series.map((i,key)=>(
                    <View style={{display:'flex',flexDirection:'row'}}>
                    <View style={{height:8,width:10,backgroundColor:`${i.color}`}}>
                      </View>
                           <Text style={{fontSize:14,color:'',marginTop:-3,height:30,fontFamily:'serif',textTransform:'capitalize',width:80}}>  {i.label}</Text>
                        </View>
                    
              ))}
            </View>
            </View> 
              <Text style={{position:'relative',top:-40,textTransform:'capitalize',width:348,height:38,borderBottomLeftRadius:20,borderBottomRightRadius:20,
                textAlign:'center',color:'white',fontSize:16,backgroundColor:'#0a63bc',paddingTop:10,}}>
                pai chrats of category</Text>
            <View>
              <View style={[styles.PieChart,{marginTop:-10,height:350}]}>
            <BarChart
            isAnimated
            data={barData}
            width={290} 
            height={200}    
    />
            </View>
              <Text style={{position:'relative',top:-39,textTransform:'capitalize',width:348,height:38,borderBottomLeftRadius:20,borderBottomRightRadius:20,
                textAlign:'center',color:'white',fontSize:16,backgroundColor:'#0a63bc',paddingTop:10,left:1.8}}>
                pai chrats of category</Text>
</View>
    </View>
    
  )
}
}

export default headr;

const styles = StyleSheet.create({
  chartsText:{
    marginTop:20,height:40,alignItems:'center',justifyContent:'center'
  },
  PieChart:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    height:300,
    justifyContent:'center',
    elevation:3,
    width:350,
    gap:40,
    borderRadius:20,
    borderColor:'#0a63bcb2',
    borderWidth:2
  }
})