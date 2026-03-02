import { ScrollView, Text, View, Pressable } from "react-native";
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
        if (i.it !== "income") return null;

        const emojiMatch = i.cat.match(/[\p{Emoji}\u200d]+/u);
        const iconSign = emojiMatch ? emojiMatch[0] : i.cat.charAt(0);
        const cleanCat = i.cat.replace(/[\p{Emoji}\u200d]+/u, '').trim();

        return (
          <View
            key={index}
            style={[styles.card, { borderLeftColor: "#2ecc71" }]}
          >
            <View style={styles.row}>

              {/* ── LEFT: icon column ── */}
              <View style={styles.iconColumn}>
                <Text style={styles.categoryIcon}>{iconSign}</Text>
                <Text style={styles.categoryName} numberOfLines={1}>
                  {cleanCat || i.cat}
                </Text>
              </View>

              {/* ── CENTER: main info ── */}
              <View style={styles.centerSection}>
                <Text style={styles.description} numberOfLines={1}>
                  {i.des}
                </Text>
                <Text style={styles.subDetail} numberOfLines={1}>
                  {i.bankName || 'Cash'}
                </Text>
                {i.bankName && i.upiId ? (
                  <Text style={styles.subDetail} numberOfLines={1}>
                    {i.upiId}
                  </Text>
                ) : null}
                <Text style={styles.dateText}>
                  {`${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString().slice(-2)}`}
                </Text>
              </View>

              {/* ── RIGHT: amount + actions ── */}
              <View style={styles.rightSection}>
                <Text style={[styles.amount, { color: "#2ecc71" }]}>
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
