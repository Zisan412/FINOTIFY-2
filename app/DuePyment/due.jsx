import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const DUE_DATA = [
  {
    id: "1",
    name: "Rahul",
    amount: 2500,
    type: "receive",
    date: "15 Feb 2026",
  },
  {
    id: "2",
    name: "Electric Bill",
    amount: 1800,
    type: "pay",
    date: "10 Feb 2026",
  },
];

const DueDashboard = () => {
  const renderItem = ({ item }) => {
    const isReceive = item.type === "receive";

    return (
      <View style={styles.card}>
        {/* Left */}
        <View style={styles.left}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: isReceive ? "#e6f4ea" : "#fdecea" },
            ]}
          >
            <Ionicons
              name={isReceive ? "arrow-down" : "arrow-up"}
              size={20}
              color={isReceive ? "#0f9d58" : "#e53935"}
            />
          </View>

          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.date}>Due: {item.date}</Text>
          </View>
        </View>

        {/* Right */}
        <View style={styles.right}>
          <Text
            style={[
              styles.amount,
              { color: isReceive ? "#0f9d58" : "#e53935" },
            ]}
          >
            ₹ {item.amount}
          </Text>

          <Pressable
            style={[
              styles.payBtn,
              { backgroundColor: isReceive ? "#0f9d58" : "#e53935" },
            ]}
          >
            <Text style={styles.payText}>
              {isReceive ? "RECEIVE" : "PAY"}
            </Text>
          </Pressable>
        </View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Ionicons name="trash-outline" size={20} color="#ff3232af" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Due Dashboard</Text>
      <Text style={styles.sub}>Money you need to pay or receive</Text>

      <FlatList
        data={DUE_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DueDashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
  },

  sub: {
    color: "#666",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
    height: 42,
    width: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  date: {
    color: "#777",
    fontSize: 13,
  },

  right: {
    alignItems: "flex-end",
  },

  amount: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },

  payBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  payText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});
