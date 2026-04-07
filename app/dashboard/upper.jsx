import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Upper = ({ totalBalance, income, expense, searchQuery, onSearchChange, onFilterPress, onRefresh, selectedDate, onMonthChange }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    onMonthChange(newDate);
  };
  const [displayName, setDisplayName] = useState('');

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  let startTyping;
  let timer;

  AsyncStorage.getItem('userName').then((storedName) => {
    const targetName = storedName || 'User';
    startTyping = setTimeout(() => {
      let index = 0;
      timer = setInterval(() => {
        setDisplayName(targetName.substring(0, index + 1));
        index++;
        if (index >= targetName.length) clearInterval(timer);
      }, 70);
    }, 600);
  });

  return () => {
    clearTimeout(startTyping);
    clearInterval(timer);
  };
}, []);


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
    spinAnim.setValue(0);
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
    if (onRefresh) onRefresh();
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

      {/* TOP ACTIONS: SEARCH & MONTH SELECTOR */}
      <View style={styles.actionsRow}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={18} color="#bdc3c7" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#a4b0be"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={onSearchChange}
          />
          <TouchableOpacity onPress={onFilterPress} style={styles.filterBtn}>
            <Ionicons name="options-outline" size={18} color="#bdc3c7" />
          </TouchableOpacity>
        </View>

        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.arrowBtn}>
            <Ionicons name="chevron-back" size={16} color="#2f3640" />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {`${months[selectedDate.getMonth()]} - ${selectedDate.getFullYear().toString().slice(-2)}`}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.arrowBtn}>
            <Ionicons name="chevron-forward" size={16} color="#2f3640" />
          </TouchableOpacity>
        </View>
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

  // Actions Row (Search + Month)
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    gap: 8,
  },

  searchWrapper: {
    flex: 7, // ~70% width
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#f1f2f6",
  },

  searchInput: {
    flex: 1,
    marginLeft: 6,
    fontSize: 14,
    color: "#2f3640",
  },

  filterBtn: {
    paddingLeft: 4,
  },

  monthSelector: {
    flex: 3, // ~30% width
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "#f1f2f6",
    overflow: "hidden",
  },

  monthText: {
    flex: 1,
    fontSize: 10, // Optimized for space
    fontWeight: "700",
    color: "#2f3640",
    textAlign: "center",
  },

  arrowBtn: {
    width: 26,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});