import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./all";

const Income = ({ go }) => {
  const date = new Date();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {go.map((i, index) => {
        const isIncome = i.it === "income";

        if (!isIncome) return null;

        // Extract emoji if present, or use first letter
        const emojiMatch = i.cat.match(/[\p{Emoji}\u200d]+/u);
        const iconSign = emojiMatch ? emojiMatch[0] : i.cat.charAt(0);
        const cleanCat = i.cat.replace(/[\p{Emoji}\u200d]+/u, '').trim();

        return (
          <View
            key={index}
            style={[
              styles.card,
              { borderLeftColor: "#2ecc71" },
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
                    { color: "#2ecc71" },
                  ]}
                >
                  +₹ {i.amm}
                </Text>

                <View style={styles.actions}>
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

export default Income;
