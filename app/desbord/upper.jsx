import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Upper = ({ totalBalance, income, expense }) => {
  return (
    <View style={styles.container}>
      {/* TOP HEADER */}
      <View style={styles.upper}>

        {/* Header Row: Greeting & Notification */}
        <View style={styles.headerRow}>
          <View style={styles.greetingObj}>
            <Text style={styles.greetingText}>Good Morning,</Text>
            <Text style={styles.username}>mominmusabkin</Text>
          </View>

          <View style={styles.notificationBox}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.badge} />
          </View>
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
        />
        <Ionicons name="options-outline" size={20} color="#bdc3c7" />
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
    paddingTop: 40, // More top padding to clear status bar
    paddingHorizontal: 16,
    paddingBottom: 5,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12, // Reduced margin
  },

  greetingObj: {
    flex: 1,
  },

  greetingText: {
    fontSize: 12, // Smaller label
    color: "#a4b0be",
    fontWeight: "500",
  },

  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2f3640",
    textTransform: "capitalize",
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
    borderRadius: 18, // Slightly more rounded
    padding: 14, // Even more compact padding
    shadowColor: "#0a63bc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  cardLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "600",
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  cardAmount: {
    color: "white",
    fontSize: 26, // Slightly smaller amount
    fontWeight: "bold",
    marginTop: 2,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingTop: 8,
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
    height: 44, // More compact
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 4,
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
