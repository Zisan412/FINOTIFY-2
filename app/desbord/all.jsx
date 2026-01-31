import { ScrollView, StyleSheet, Text, View,Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Items = ({ datas }) => {
  const date = new Date();

  return (
    <ScrollView style={styles.container}>
      {datas.map((i, index) => {
        const isIncome = i.it === "income";

        return (
          <View
            key={index}
            style={[
              styles.card,
              { borderLeftColor: isIncome ? "#2ecc71" : "#e74c3c" },
            ]}
          >
            {/* Top Row */}
            <View style={styles.row}>
              <Text style={styles.category}>{i.cat}</Text>

              <View style={styles.amountBox}>
                <Ionicons
                  name={isIncome ? "arrow-up-circle" : "arrow-down-circle"}
                  size={18}
                  color={isIncome ? "#2ecc71" : "#e74c3c"}
                />
                <Text
                  style={[
                    styles.amount,
                    { color: isIncome ? "#2ecc71" : "#e74c3c" },
                  ]}
                >
                  ₹ {i.amm}
                </Text>
                    <Pressable style={{marginLeft:10}}>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color="#ff3232af"
                  />
                </Pressable>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.desc}>{i.des}</Text>

            {/* Date */}
            <Text style={styles.date}>
              {date.getDate()}{" "}
              {date.toLocaleString("default", { month: "short" })},{" "}
              {date.getFullYear()}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Items;
export const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    height:450
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginVertical: 8,
    padding: 14,
    borderRadius: 14,
    borderLeftWidth: 6,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  category: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  amountBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  amount: {
    fontSize: 18,
    fontWeight: "700",
  },

  desc: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
  },

  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#999",
  },
});
