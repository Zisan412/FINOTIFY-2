import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const Total = ({ go }) => {
  const categories = [
    { key: "food 🍴", label: "Food" },
    { key: "salary 💸", label: "Salary" },
    { key: "shopping 🛍️", label: "Shopping" },
    { key: "traveling 🧳", label: "Traveling" },
    { key: "sports 🥎", label: "Sports" },
    { key: "other ", label: "Others" },
  ];

  const summary = {};
  categories.forEach(c => {
    summary[c.key] = { income: 0, expense: 0 };
  });

  go.forEach(item => {
    if (!summary[item.cat]) return;
    if (item.it === "income") summary[item.cat].income += item.amm;
    else summary[item.cat].expense += item.amm;
  });

  const totalIncome = Object.values(summary).reduce(
    (s, c) => s + c.income,
    0
  );
  const totalExpense = Object.values(summary).reduce(
    (s, c) => s + c.expense,
    0
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TITLE CARD */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Transaction Summary</Text>
        <Text style={styles.headerSub}>
          Income • Expense • Balance
        </Text>
      </View>

      {/* TABLE CARD */}
      <View style={styles.card}>
        <View style={styles.tableHeader}>
          <Text style={styles.th}>Category</Text>
          <Text style={styles.th}>Income</Text>
          <Text style={styles.th}>Expense</Text>
          <Text style={styles.th}>Balance</Text>
        </View>

        {categories.map(cat => {
          const data = summary[cat.key];
          const balance = data.income - data.expense;

          return (
            <View key={cat.key} style={styles.tableRow}>
              <Text style={styles.tdCat}>{cat.label}</Text>

              <Text style={[styles.td, styles.income]}>
                ₹ {data.income}
              </Text>

              <Text style={[styles.td, styles.expense]}>
                ₹ {data.expense}
              </Text>

              <Text
                style={[
                  styles.td,
                  { color: balance >= 0 ? "#2ecc71" : "#e74c3c" },
                ]}
              >
                ₹ {balance}
              </Text>
            </View>
          );
        })}

        {/* TOTAL FOOTER */}
        <View style={styles.footerRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={[styles.totalText, { color: "#2ecc71" }]}>
            ₹ {totalIncome}
          </Text>
          <Text style={[styles.totalText, { color: "#e74c3c" }]}>
            ₹ {totalExpense}
          </Text>
          <Text style={styles.totalText}>
            ₹ {totalIncome - totalExpense}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Total;
const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: "#f5f7fb",
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
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  headerSub: {
    color: "#e6e6e6",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    borderRadius: 16,
    padding: 12,
    elevation: 4,
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 8,
    marginBottom: 6,
  },

  th: {
    width: "25%",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 13,
    color: "#555",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#f0f0f0",
  },

  tdCat: {
    width: "25%",
    fontSize: 14,
  },

  td: {
    width: "25%",
    textAlign: "center",
    fontSize: 14,
  },

  income: {
    color: "#2ecc71",
    fontWeight: "600",
  },

  expense: {
    color: "#e74c3c",
    fontWeight: "600",
  },

  footerRow: {
    flexDirection: "row",
    paddingTop: 10,
    marginTop: 6,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  totalText: {
    width: "25%",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
});
