import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView, Platform, StatusBar } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Bottom from "../desbord/bottom";
import axios from 'axios';

const API_URL = 'http://192.168.43.242:3000/user';

const DueDashboard = () => {
  const [dueData, setDueData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/getdue`)
      .then(res => setDueData(res.data.due))
      .catch(err => console.log(err));
  }, []);

  const totals = useMemo(() => {
    const toReceive = dueData.filter(item => item.type === 'receive').reduce((sum, item) => sum + item.amount, 0);
    const toPay = dueData.filter(item => item.type === 'pay').reduce((sum, item) => sum + item.amount, 0);
    return { toReceive, toPay };
  }, [dueData]);
 const handleDelete = (id) => {
  axios.delete(`http://192.168.43.242:3000/user/deletedue/${id}`)
    .then(() => {
      setDueData(prev => prev.filter(item => item._id !== id));
    })
    .catch(err => console.log(err));
};  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};


  const renderItem = ({ item }) => {
    const isReceive = item.type === "receive";
    return (
      <View style={styles.card}>
        <View style={styles.cardMain}>
          <View style={styles.left}>
            <View style={[styles.iconBox, { backgroundColor: isReceive ? "#E8F5E9" : "#FFEBEE" }]}>
              <MaterialCommunityIcons
                name={isReceive ? "account-arrow-left" : "account-arrow-right"}
                size={22}
                color={isReceive ? "#43A047" : "#E53935"}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <View style={styles.dateRow}>
                <Ionicons name="calendar-outline" size={12} color="#94A3B8" />
                <Text style={styles.date}>{formatDate(item.date)}</Text>
              </View>
              {item.note ? (
                <View style={styles.noteRow}>
                  <Ionicons name="document-text-outline" size={12} color="#94A3B8" />
                  <Text style={styles.noteText}>{item.note}</Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.right}>
            <Text style={[styles.amount, { color: isReceive ? "#43A047" : "#E53935" }]}>
              ₹{item.amount}
            </Text>
            <View style={styles.actionRow}>
              <Pressable style={[styles.actionBtn, { backgroundColor: isReceive ? "#43A047" : "#E53935" }]}>
                <Text style={styles.actionText}>{isReceive ? "RECEIVE" : "PAY"}</Text>
              </Pressable>
              <Pressable style={styles.deleteBtn} onPress={() => handleDelete(item._id)}>
                <Ionicons name="trash-outline" size={18} color="#94A3B8" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Due Management</Text>
              <Text style={styles.sub}>Track your pending transactions</Text>
            </View>
            <Pressable style={styles.addBtn} onPress={() => router.push('/DuePyment/addduepy')}>
              <Ionicons name="add" size={24} color="#FFF" />
            </Pressable>
          </View>
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: '#43A047' }]} />
              <View>
                <Text style={styles.summaryLabel}>TO RECEIVE</Text>
                <Text style={[styles.summaryValue, { color: '#43A047' }]}>₹{totals.toReceive}</Text>
              </View>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: '#E53935' }]} />
              <View>
                <Text style={styles.summaryLabel}>TO PAY</Text>
                <Text style={[styles.summaryValue, { color: '#E53935' }]}>₹{totals.toPay}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={dueData}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            ListHeaderComponent={<Text style={styles.sectionTitle}>Pending Dues</Text>}
          />
        </View>
        <Bottom />
      </View>
    </SafeAreaView>
  );
};

export default DueDashboard;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC", paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0 },
  container: { flex: 1 },
  header: { backgroundColor: "#FFF", paddingHorizontal: 20, paddingTop: 10, paddingBottom: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 8 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "800", color: "#1E293B" },
  sub: { color: "#64748B", fontSize: 13, marginTop: 2 },
  addBtn: { backgroundColor: '#0A63BC', width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  summaryCard: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 20, padding: 16, alignItems: 'center' },
  summaryItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  summaryDot: { width: 8, height: 8, borderRadius: 4 },
  summaryDivider: { width: 1, height: 30, backgroundColor: '#CBD5E1', marginHorizontal: 15 },
  summaryLabel: { fontSize: 10, fontWeight: '700', color: '#64748B', letterSpacing: 0.5 },
  summaryValue: { fontSize: 16, fontWeight: '800', marginTop: 2 },
  listContainer: { flex: 1 },
  flatListContent: { padding: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 15 },
  card: { backgroundColor: "#FFF", borderRadius: 22, padding: 16, marginBottom: 16, elevation: 3 },
  cardMain: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  left: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
  iconBox: { height: 48, width: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", color: '#334155' },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  date: { color: "#94A3B8", fontSize: 12, fontWeight: '500' },
  right: { alignItems: "flex-end" },
  amount: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, minWidth: 70, alignItems: 'center' },
  actionText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  deleteBtn: { padding: 4 },
  noteRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 4, marginTop: 4 },
  noteText: { color: '#94A3B8', fontSize: 11, fontWeight: '500', fontStyle: 'italic', flex: 1, flexWrap: 'wrap' },
});