import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Upper from "./upper";
import Bottom from "./bottom";
import Middel from "./middel";

const desbord = () => {
  const [activeTab, setActiveTab] = useState(1);
  const data = new Date();

  const datas = useMemo(() => [
    { date: data, cat: 'food 🍴', amm: 200, des: 'this fo food', it: 'expenss' },
    { date: data, cat: 'salary 💸', amm: 2000, des: 'this is salary', it: 'income' },
    { date: data, cat: 'salary 💸', amm: 20000, des: 'this is salary', it: 'income' },
    { date: data, cat: 'other ', amm: 20, des: 'mene pese diye chai me', it: 'expenss' },
    { date: data, cat: 'other ', amm: 80, des: 'dost ne pese diye', it: 'income' },
    { date: data, cat: 'shopping 🛍️', amm: 800, des: 'hum kharidi karne guy', it: 'expenss' },
  ], []);

  // Calculate dynamic balance totals
  const totals = useMemo(() => {
    const income = datas.filter(i => i.it === 'income').reduce((s, i) => s + i.amm, 0);
    const expense = datas.filter(i => i.it === 'expenss').reduce((s, i) => s + i.amm, 0);
    return {
      balance: income - expense,
      income: income,
      expense: expense
    };
  }, [datas]);

  return (
    <SafeAreaView style={styles.container}>
      {/* FIXED HEADER SECTION */}
      <View style={styles.fixedHeader}>
        <Upper
          totalBalance={totals.balance}
          income={totals.income}
          expense={totals.expense}
        />
      </View>

      {/* MID SECTION (This will handle the tabs and the scrollable list) */}
      <View style={styles.content}>
        <Middel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          datas={datas}
        />
      </View>

      {/* FIXED BOTTOM NAVIGATION */}
      <Bottom />
    </SafeAreaView>
  );
};

export default desbord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  fixedHeader: {
    backgroundColor: '#f8f9fa',
    zIndex: 10,
  },
  content: {
    flex: 1,
  }
});
