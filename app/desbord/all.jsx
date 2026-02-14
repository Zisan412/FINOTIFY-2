import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Items = ({ datas }) => {
  const date = new Date();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {datas.map((i, index) => {
        const isIncome = i.it === "income";

        // Extract emoji if present, or use first letter
        const emojiMatch = i.cat.match(/[\p{Emoji}\u200d]+/u);
        const iconSign = emojiMatch ? emojiMatch[0] : i.cat.charAt(0);
        const cleanCat = i.cat.replace(/[\p{Emoji}\u200d]+/u, '').trim();

        return (
          <View
            key={index}
            style={[
              styles.card,
              { borderLeftColor: isIncome ? "#2ecc71" : "#ff4757" },
            ]}
          >
            <View style={styles.row}>
              {/* Left Side: Icon & Info */}
              <View style={styles.leftSection}>
                <View style={styles.iconContainer}>
                  <Text style={{ fontSize: 20 }}>{iconSign}</Text>
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.category}>{cleanCat || i.cat}</Text>
                  <Text style={styles.date}>
                    {date.getDate()} {date.toLocaleString("default", { month: "short" })}, {date.getFullYear()}
                  </Text>
                </View>
              </View>

              {/* Right Side: Amount & Actions */}
              <View style={styles.rightSection}>
                <Text
                  style={[
                    styles.amount,
                    { color: isIncome ? "#2ecc71" : "#ff4757" },
                  ]}
                >
                  {isIncome ? "+" : "-"}₹ {i.amm}
                </Text>

                {/* Actions (Edit/Delete) - Mini Row */}
                <View style={styles.actions}>
                  <Pressable
                    onPress={() => router.push({
                      pathname: '../desbord/adddata',
                      params: { cat: i.cat, amm: i.amm, des: i.des, it: i.it }
                    })}
                  >
                    <Ionicons name="create-outline" size={18} color="#95a5a6" />
                  </Pressable>
                  <Pressable>
                    <Ionicons name="trash-outline" size={18} color="#ff4757" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Items;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#F8F9FA", // Consistent background
  },

  card: {
    backgroundColor: "#fff",
    marginVertical: 6,
    padding: 16,
    borderRadius: 20,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1f2f6",
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    justifyContent: "center",
  },

  category: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2f3640",
    textTransform: "capitalize",
    marginBottom: 2,
  },

  date: {
    fontSize: 12,
    color: "#a4b0be",
    fontWeight: "500",
  },

  rightSection: {
    alignItems: "flex-end",
  },

  amount: {
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  actions: {
    flexDirection: "row",
    marginTop: 6,
    gap: 12,
    opacity: 0.8
  }
});
