import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import All from './all'
import Income from './income'
import Expenss from './expenss'
import Total from './total'
const middel = ({ activeTab, onTabChange, datas }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.allbtn}>
        {/* All Tab */}
        <Pressable
          style={[styles.btn, activeTab == 1 && styles.activeBtn]}
          onPress={() => onTabChange(1)}
        >
          <Text style={[styles.innerText, activeTab == 1 && styles.activeText]}>All</Text>
        </Pressable>

        {/* Income Tab */}
        <Pressable
          style={[styles.btn, activeTab == 2 && styles.activeBtn]}
          onPress={() => onTabChange(2)}
        >
          <Text style={[styles.innerText, activeTab == 2 && styles.activeText]}>Income</Text>
        </Pressable>

        {/* Expense Tab */}
        <Pressable
          style={[styles.btn, activeTab == 3 && styles.activeBtn]}
          onPress={() => onTabChange(3)}
        >
          <Text style={[styles.innerText, activeTab == 3 && styles.activeText]}>Expense</Text>
        </Pressable>

        {/* Total Tab */}
        <Pressable
          style={[styles.btn, activeTab == 4 && styles.activeBtn]}
          onPress={() => onTabChange(4)}
        >
          <Text style={[styles.innerText, activeTab == 4 && styles.activeText]}>Total</Text>
        </Pressable>
      </View>

      <View style={[styles.contentContainer, { flex: 1 }]}>
        {activeTab == 1 && <All datas={datas} />}
        {activeTab == 2 && <Income go={datas} />}
        {activeTab == 3 && <Expenss go={datas} />}
        {activeTab == 4 && <Total go={datas} />}
      </View>
    </View>
  );
};

export default middel;

export const styles = StyleSheet.create({
  allbtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f2f6",
    marginHorizontal: 16,
    marginTop: 12, // Reduced top margin
    marginBottom: 8, // Significantly reduced bottom margin to bring list closer
    padding: 6,
    borderRadius: 18,
    height: 52,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    height: "100%",
  },
  activeBtn: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  innerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a4b0be",
  },
  activeText: {
    color: "#2f3640",
    fontWeight: "800",
  },
  contentContainer: {
    flex: 1,
  }
});
