import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import asyncStorage from "@react-native-async-storage/async-storage";


const Upper = ({ totalBalance, income, expense, searchQuery, onSearchChange, onFilterPress, onRefresh }) => {
  const [displayName, setDisplayName] = useState(''); // Default to 'User' if name not found
  console.log('Upper component received data:', displayName); // Debugging log
 // This could come from a user context

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  // Re-run if name changes
useEffect(() => {
  let startTyping;
  let timer;

  asyncStorage.getItem('userName').then((storedName) => {
    const targetName = storedName || 'User'; // fallback if null
    
    startTyping = setTimeout(() => {
      let index = 0;
      timer = setInterval(() => {
        setDisplayName(targetName.substring(0, index + 1)); // ✅ Now targetName is a real string
        index++;
        if (index >= targetName.length) clearInterval(timer);
      }, 70);
    }, 600);
  });

  // ✅ Cleanup both timers on unmount
  return () => {
    clearTimeout(startTyping);
    clearInterval(timer);
  };

}, []); // ✅ Runs once on mount only


  const waveStyle = {
    transform: [
      {
        rotate: waveAnim.interpolate({
          inputRange: [-1, 1],
          outputRange: ["-15deg", "15deg"],
        }),
      },
    ],
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const handleSyncPress = () => {
    // 1. Replay spin animation
    spinAnim.setValue(0);
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 2. Call external refresh to reload state
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <View style={styles.container}>
      {/* TOP HEADER */}
      <View style={styles.upper}>

        {/* Header Row: Greeting & Notification */}
        <View style={styles.headerRow}>
          <View style={styles.greetingObj}>
            <View style={styles.greetingWrapper}>
              <Text style={styles.greetingText}>Hi</Text>
              <Animated.View style={[waveStyle, { opacity: fadeAnim }]}>
                <Text style={styles.greetingEmoji}>👋</Text>
              </Animated.View>
            </View>
            <Text style={styles.username}>{displayName}</Text>
          </View>

          <TouchableOpacity
            style={styles.notificationBox}
            activeOpacity={0.7}
            onPress={handleSyncPress}
          >
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons name="sync-outline" size={24} color="#333" />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Compact Balance Card */}
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.cardLabel}>Available Balance</Text>
            <Text style={styles.cardAmount}>₹ {totalBalance}</Text>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryValue}>₹ {income}</Text>
            </View>
            <View style={[styles.summaryItem, { alignItems: 'flex-end' }]}>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={styles.summaryValue}>₹ {expense}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={20} color="#bdc3c7" />
        <TextInput
          placeholder="Search items..."
          placeholderTextColor="#a4b0be"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        <TouchableOpacity onPress={onFilterPress}>
          <Ionicons name="options-outline" size={20} color="#bdc3c7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Upper;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
  },
  upper: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 6 : 6,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  greetingObj: {
    flex: 1,
  },

  greetingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  greetingText: {
    fontSize: 14,
    color: "#a4b0be",
    fontWeight: "600",
  },

  greetingEmoji: {
    fontSize: 18,
    marginLeft: 6,
  },

  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2f3640",
    textTransform: "capitalize",
    letterSpacing: -0.5,
  },

  notificationBox: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f1f2f6",
  },

  badge: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "#ff4757",
    height: 7,
    width: 7,
    borderRadius: 3.5,
    borderWidth: 1.2,
    borderColor: "white",
  },

  // Compact Balance Card
  balanceCard: {
    backgroundColor: "#0a63bc",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#0a63bc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },

  cardLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "600",
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  cardAmount: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 1,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    paddingTop: 6,
  },

  summaryItem: {
    flex: 1,
  },

  summaryLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 9, // Smaller
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  summaryValue: {
    color: "white",
    fontSize: 14, // Smaller
    fontWeight: "700",
  },

  // Search
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 2,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#f1f2f6",
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#2f3640",
  },
});