import { ScrollView, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import { BASE_URL } from "../../constants/Config";
import DeleteConfirmModal from "./DeleteConfirmModal";

const Items = ({ datas, onDelete }) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {datas.map((i, index) => {
        const isIncome = i.type === "income";

        // Extract emoji if present, or use first letter
        const cat = i.category || "Other";
        const emojiMatch = cat.match(/[\p{Emoji}\u200d]+/u);
        const iconSign = emojiMatch ? emojiMatch[0] : cat.charAt(0);
        const cleanCat = cat.replace(/[\p{Emoji}\u200d]+/u, '').trim();

        return (
          <View
            key={index}
            style={[
              styles.card,
              { borderLeftColor: isIncome ? "#2ecc71" : "#ff4757" },
            ]}
          >
            <View style={styles.row}>

              {/* ── LEFT: icon column ── */}
              <View style={styles.iconColumn}>
                <Text style={styles.categoryIcon}>{iconSign}</Text>
                <Text style={styles.categoryName} numberOfLines={1}>
                  {cleanCat || i.category}
                </Text>
              </View>

              {/* ── CENTER: main info ── */}
              <View style={styles.centerSection}>
                <Text style={styles.description} numberOfLines={1}>
                  {i.desc}
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
                  {(() => { const d = new Date(i.date); return `${d.getDate().toString().padStart(2,'0')}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getFullYear().toString().slice(-2)}`; })()}
                </Text>
              </View>

              {/* ── RIGHT: amount + actions ── */}
              <View style={styles.rightSection}>
                <Text style={[styles.amount, { color: isIncome ? "#2ecc71" : "#ff4757" }]}>
                  {isIncome ? "+" : "-"}₹ {i.amount}
                </Text>
                <View style={styles.actions}>
                  <Pressable
                    onPress={() => router.push({
                      pathname: '../dashboard/adddata',
                      params: { cat: i.category, amm: i.amount, des: i.desc, it: i.type, editId: i._id, bankN: i.bankName, upi: i.upiId, dat: i.date }
                    })}
                  >
                    <Ionicons name="create-outline" size={18} color="#95a5a6" />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectedEntry(i);
                      setDeleteVisible(true);
                    }}
                  >
                    <Ionicons name="trash-outline" size={18} color="#ff4757" />
                  </Pressable>
                </View>
              </View>

            </View>
          </View>
        );
      })}

      <DeleteConfirmModal 
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        itemName={selectedEntry?.desc}
        onConfirm={() => {
          if (selectedEntry) {
            axios.delete(`${BASE_URL}/deletedashboardentry/${selectedEntry._id}`)
              .then(() => {
                setDeleteVisible(false);
                onDelete && onDelete();
              })
              .catch(err => {
                console.log(err);
                setDeleteVisible(false);
              });
          }
        }}
      />
    </ScrollView>
  );
};

export default Items;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#F8F9FA",
  },

  card: {
    backgroundColor: "#fff",
    marginVertical: 5,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderLeftWidth: 3,
    elevation: 3,
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  /* ── LEFT icon column ── */
  iconColumn: {
    alignItems: "center",
    width: 42,
  },

  categoryIcon: {
    fontSize: 22,
    lineHeight: 26,
  },

  categoryName: {
    fontSize: 9,
    color: "#b2bec3",
    fontWeight: "600",
    textTransform: "capitalize",
    textAlign: "center",
    marginTop: 2,
  },

  /* ── CENTER details ── */
  centerSection: {
    flex: 1,
    paddingRight: 6,
  },

  description: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e2a35",
    marginBottom: 3,
    letterSpacing: 0.1,
  },

  subDetail: {
    fontSize: 11,
    color: "#8395a7",
    marginBottom: 2,
    lineHeight: 15,
  },

  dateText: {
    fontSize: 10,
    color: "#c8d6e5",
    fontWeight: "500",
    marginTop: 2,
  },

  /* ── RIGHT section (unchanged) ── */
  rightSection: {
    alignItems: "flex-end",
  },

  amount: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  actions: {
    flexDirection: "row",
    marginTop: 6,
    gap: 12,
    opacity: 0.85,
  },
});
