import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView, Platform, StatusBar } from "react-native";
import React, { useMemo } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Bottom from "../desbord/bottom";

const DUE_DATA = [
  {
    id: "1",
    name: "Rahul Sharma",
    amount: 2500,
    type: "receive",
    date: "15 Feb 2026",
    category: "Lent",
  },
  {
    id: "2",
    name: "Electric Bill",
    amount: 1800,
    type: "pay",
    date: "10 Feb 2026",
    category: "Utility",
  },
  {
    id: "3",
    name: "Aman Gupta",
    amount: 500,
    type: "receive",
    date: "18 Feb 2026",
    category: "Food",
  },
  {
    id: "4",
    name: "Netflix Subscription",
    amount: 649,
    type: "pay",
    date: "20 Feb 2026",
    category: "Entertainment",
  },
];

const DueDashboard = () => {
  const totals = useMemo(() => {
    const toReceive = DUE_DATA.filter(item => item.type === 'receive').reduce((sum, item) => sum + item.amount, 0);
    const toPay = DUE_DATA.filter(item => item.type === 'pay').reduce((sum, item) => sum + item.amount, 0);
    return { toReceive, toPay };
  }, []);

  const renderItem = ({ item }) => {
    const isReceive = item.type === "receive";

    return (
      <View style={styles.card}>
        <View style={styles.cardMain}>
          {/* Left Side: Icon & Info */}
          <View style={styles.left}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isReceive ? "#E8F5E9" : "#FFEBEE" },
              ]}
            >
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
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          </View>

          {/* Right Side: Amount & Action */}
          <View style={styles.right}>
            <Text
              style={[
                styles.amount,
                { color: isReceive ? "#43A047" : "#E53935" },
              ]}
            >
              ₹{item.amount}
            </Text>
            <View style={styles.actionRow}>
              <Pressable
                style={[
                  styles.actionBtn,
                  { backgroundColor: isReceive ? "#43A047" : "#E53935" },
                ]}
              >
                <Text style={styles.actionText}>
                  {isReceive ? "RECEIVE" : "PAY"}
                </Text>
              </Pressable>
              <Pressable style={styles.deleteBtn}>
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
        {/* PREMIUM HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Due Management</Text>
              <Text style={styles.sub}>Track your pending transactions</Text>
            </View>
            <Pressable
              style={styles.addBtn}
              onPress={() => router.push('/DuePyment/addduepy')}
            >
              <Ionicons name="add" size={24} color="#FFF" />
            </Pressable>
          </View>

          {/* SUMMARY CARD */}
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

        {/* LIST SECTION */}
        <View style={styles.listContainer}>
          <FlatList
            data={DUE_DATA}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            ListHeaderComponent={<Text style={styles.sectionTitle}>Pending Dues</Text>}
          />
        </View>

        {/* FIXED BOTTOM NAVIGATION */}
        <Bottom />
      </View>
    </SafeAreaView>
  );
};

export default DueDashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E293B",
  },
  sub: {
    color: "#64748B",
    fontSize: 13,
    marginTop: 2,
  },
  addBtn: {
    backgroundColor: '#0A63BC',
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 15,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  listContainer: {
    flex: 1,
  },
  flatListContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  cardMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  iconBox: {
    height: 48,
    width: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: '#334155',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  date: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: '500',
  },
  right: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 70,
    alignItems: 'center',
  },
  actionText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },
  deleteBtn: {
    padding: 4,
  }
});
