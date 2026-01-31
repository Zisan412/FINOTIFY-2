import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Upper = () => {
  return (
    <View>
      {/* TOP HEADER */}
      <View style={styles.upper}>
        <Text style={styles.title}>Overall Balance</Text>

        <View style={styles.userRow}>
          <Ionicons name="person" size={20} color="white" />

          <Text style={styles.username}>Hello, mominmusab123</Text>

          <View style={styles.notificationBox}>
            <Ionicons name="notifications" size={26} color="white" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={20} color="#0a63bcd5" />
        <TextInput
          placeholder="Search by date or category"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>
    </View>
  );
};

export default Upper;
const styles = StyleSheet.create({
  upper: {
    height: 150,
    backgroundColor: "#0a63bcd5",
    paddingTop: 35,
    paddingHorizontal: 20,
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  username: {
    fontSize: 15,
    color: "white",
    marginLeft: 12,
    textTransform: "capitalize",
    flex: 1,
  },

  notificationBox: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#ffc609",
    height: 18,
    width: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    marginHorizontal: 40,
    marginTop: -25,
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 8,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
});
