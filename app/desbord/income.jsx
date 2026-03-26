import { ScrollView, Text, View, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { styles } from "./all";
import axios from "axios";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { BASE_URL } from "../../constants/Config";

const Income = ({ go, onDelete }) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {go.map((i, index) => {
        if (i.type !== "income") return null;

        const cat = i.category || "Other";
        const emojiMatch = cat.match(/[\p{Emoji}\u200d]+/u);
        const iconSign = emojiMatch ? emojiMatch[0] : cat.charAt(0);
        const cleanCat = cat.replace(/[\p{Emoji}\u200d]+/u, '').trim();

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
                <Text style={[styles.amount, { color: "#2ecc71" }]}>
                  +₹ {i.amount}
                </Text>
                <View style={styles.actions}>
                  <Pressable
                    onPress={() => router.push({
                      pathname: '../desbord/adddata',
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

export default Income;
