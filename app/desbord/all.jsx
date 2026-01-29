import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const items = ({ datas }) => {
  const [data, setdata] = React.useState(new Date());
  console.log(data);

  return (
    <>
      <ScrollView style={{ height: 450 }}>
        
        {datas.map((i, key) => (
          <View
            style={[
              styles.list,
              i.it == "income" && {
                borderLeftColor: "green",
                borderLeftWidth: 10,
              },
              i.it == "expenss" && {
                borderLeftColor: "red",
                borderLeftWidth: 10,
              },
            ]}
          >
            <View style={styles.first}>
              <Text style={styles.cat}>{i.cat}</Text>
            </View>
            <View style={styles.second}>
              <Text style={styles.amm}>{i.amm}</Text>
            </View>
            <View style={styles.third}>
              <Text>
                {data.getDate()}-
                {data.toLocaleString("default", { month: "short" })}-
                {data.getFullYear()}
              </Text>
            </View>
            <View style={styles.last}>
              <Text>{i.des}</Text>
            </View>
            
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default items;

const styles = StyleSheet.create({
  list: {
    elevation: 3,
    borderRadius: 5,
    height: 130,
    backgroundColor: "white",
    margin: 10,
  },
  first: {
    height: 35,
    width: "100%",
    paddingLeft: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cat: {
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: 700,
    padding: 3,
  },

  second: {
    height: 35,
    width: "100%",
    paddingLeft: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  amm: {
    padding: 3,
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: 600,
  },
  third: {
    height: 27,
    width: "100%",
    paddingLeft: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  last: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    // paddingTop:10 ,
    paddingLeft: 10,
    // paddingBottom:10,
    // backgroundColor:'red'
  },
  income: {},
});
