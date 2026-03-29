import { Pressable, StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import All from './all'
import Income from './income'
import Expenses from './expenses'
import Total from './total'

const { width } = Dimensions.get('window');
// Calculate width available for tabs
const TAB_BAR_MARGIN = 16;
const TAB_BAR_PADDING = 6;
const TAB_BAR_WIDTH = width - (TAB_BAR_MARGIN * 2);
const TAB_WIDTH = (TAB_BAR_WIDTH - (TAB_BAR_PADDING * 2)) / 4;

const Middle = ({ activeTab, onTabChange, datas, onDelete }) => {
  // Animation for the tab selector slider
  const slideAnim = useRef(new Animated.Value(0)).current;
  // Animation for the content fade
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Slide the active indicator
    Animated.spring(slideAnim, {
      toValue: (activeTab - 1) * TAB_WIDTH,
      useNativeDriver: true,
      tension: 50,
      friction: 10,
    }).start();

    // 2. Fade in transition for content
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  return (
    <View style={{ flex: 1 }}>
      {/* TAB BAR */}
      <View style={styles.allbtn}>
        {/* Animated Background Selector */}
        <Animated.View 
          style={[
            styles.activeSlider, 
            { 
              width: TAB_WIDTH,
              transform: [{ translateX: slideAnim }] 
            }
          ]} 
        />

        <Pressable style={styles.btn} onPress={() => onTabChange(1)}>
          <Text style={[styles.innerText, activeTab == 1 && styles.activeText]}>All</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => onTabChange(2)}>
          <Text style={[styles.innerText, activeTab == 2 && styles.activeText]}>Income</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => onTabChange(3)}>
          <Text style={[styles.innerText, activeTab == 3 && styles.activeText]}>Expense</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => onTabChange(4)}>
          <Text style={[styles.innerText, activeTab == 4 && styles.activeText]}>Total</Text>
        </Pressable>
      </View>

      {/* CONTENT AREA WITH FADE */}
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        {activeTab == 1 && <All datas={datas} onDelete={onDelete} />}
        {activeTab == 2 && <Income go={datas} onDelete={onDelete} />}
        {activeTab == 3 && <Expenses go={datas} onDelete={onDelete} />}
        {activeTab == 4 && <Total go={datas} />}
      </Animated.View>
    </View>
  );
};

export default Middle;

const styles = StyleSheet.create({
  allbtn: {
    flexDirection: "row",
    backgroundColor: "#f1f2f6",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    padding: 6,
    borderRadius: 18,
    height: 52,
    position: 'relative',
    alignItems: 'center',
  },
  activeSlider: {
    position: 'absolute',
    left: 6,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    zIndex: 1, // Ensure text is above activeSlider
  },
  innerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#a4b0be",
  },
  activeText: {
    color: "#1e2a35",
    fontWeight: "800",
  },
  contentContainer: {
    flex: 1,
  }
});
