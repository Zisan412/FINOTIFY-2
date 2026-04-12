import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const STANDARD_CATEGORIES = [
  '🍔 Food',
  '💰 Salary',
  '🧳 Travel',
  '🏠 House',
  '⛽ Petrol',
  '🛍️ Shopping',
  '💊 Health',
  '🚗 Transport',
  '💵 Other',
];

const Total = ({ go }) => {
  const summary = {};

  go.forEach(item => {
    const cat = item.category || '💵 Other';
    if (!summary[cat]) {
      summary[cat] = { income: 0, expense: 0 };
    }
    if (item.type === "income") summary[cat].income += parseFloat(item.amount);
    else summary[cat].expense += parseFloat(item.amount);
  });

  // rounding step for all fields
  Object.keys(summary).forEach(cat => {
    summary[cat].income = parseFloat(summary[cat].income.toFixed(2));
    summary[cat].expense = parseFloat(summary[cat].expense.toFixed(2));
  });

  const extraCategories = Object.keys(summary).filter(
    cat => !STANDARD_CATEGORIES.includes(cat)
  );
  const allCategories = [...STANDARD_CATEGORIES, ...extraCategories];

  const totalIncome = parseFloat(Object.values(summary).reduce((s, c) => s + c.income, 0).toFixed(2));
  const totalExpense = parseFloat(Object.values(summary).reduce((s, c) => s + c.expense, 0).toFixed(2));
  const totalBalance = parseFloat((totalIncome - totalExpense).toFixed(2));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER CARD */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Transaction Summary</Text>
        <Text style={styles.headerSub}>Income • Expense • Balance</Text>
      </View>

      {/* TABLE CARD */}
      <View style={styles.card}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.colCat]}>Category</Text>
          <Text style={styles.th}>Income</Text>
          <Text style={styles.th}>Expense</Text>
          <Text style={styles.th}>Balance</Text>
        </View>

        {/* Rows */}
        {allCategories.map((cat, index) => {
          const data = summary[cat] || { income: 0, expense: 0 };
          const balance = data.income - data.expense;
          const isLast = index === allCategories.length - 1;
          return (
            <View
              key={cat}
              style={[styles.tableRow, isLast && { borderBottomWidth: 0 }]}
            >
              <Text style={[styles.tdCat, styles.colCat]} numberOfLines={1}>
                {cat}
              </Text>
              <Text style={[styles.td, data.income > 0 && styles.green]}>
                ₹ {data.income}
              </Text>
              <Text style={[styles.td, data.expense > 0 && styles.red]}>
                ₹ {data.expense}
              </Text>
              <Text style={[styles.td, balance > 0 ? styles.green : balance < 0 ? styles.red : null]}>
                ₹ {balance}
              </Text>
            </View>
          );
        })}

        {/* Total Footer Row */}
        <View style={styles.footerRow}>
          <Text style={[styles.totalLabel, styles.colCat]}>Total</Text>
          <Text style={[styles.totalValue, styles.green]}>₹ {totalIncome}</Text>
          <Text style={[styles.totalValue, styles.red]}>₹ {totalExpense}</Text>
          <Text style={[styles.totalValue, totalBalance >= 0 ? styles.green : styles.red]}>
            ₹ {totalBalance}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Total;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerCard: {
    margin: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#0a63bc",
    elevation: 4,
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  headerSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 15,
    textAlign: "center",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginBottom: 20,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingTop: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  // Column widths
  colCat: {
    flex: 1.4,
    textAlign: "left",
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderColor: "#eee",
    paddingBottom: 8,
    marginBottom: 2,
  },
  th: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
    color: "#888",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 13,
    borderBottomWidth: 0.5,
    borderColor: "#f0f0f0",
    alignItems: "center",
  },
  tdCat: {
    fontSize: 15,
    color: "#2f3640",
    fontWeight: "500",
  },
  td: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    color: "#aaa",
    fontWeight: "500",
  },
  green: {
    color: "#2ecc71",
    fontWeight: "700",
  },
  red: {
    color: "#ff4757",
    fontWeight: "700",
  },
  footerRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderTopWidth: 1.5,
    borderColor: "#ddd",
    alignItems: "center",
    marginTop: 2,
  },
  totalLabel: {
    fontWeight: "800",
    fontSize: 16,
    color: "#1e2a35",
  },
  totalValue: {
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 15,
  },
});
