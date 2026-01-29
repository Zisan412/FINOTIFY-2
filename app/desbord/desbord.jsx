import { StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Upper from "./upper";
import Bottom from "./bottom";
import Middel from "./middel";
const desbord = () => {
  return (
    <View>
        <Upper/>
        <Middel/>
        <Bottom/>
    </View>
  );
};

export default desbord;

const styles = StyleSheet.create({

  

});
