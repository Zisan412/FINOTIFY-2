import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Upper from "./upper";
import Bottom from "./bottom";
import Middel from "./middel";
import FilterBottomSheet from "./FilterBottomSheet";

const desbord = () => {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (params.tab) {
      setActiveTab(parseInt(params.tab));
    }
  }, [params.tab]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    type: "All",
    category: "All",
    dateRange: "All",
    sortBy: "Latest",
  });

  const data = new Date();

  const datas = useMemo(() => [
    { date: data, cat: 'food 🍴', amm: 200, des: 'this for food', it: 'expenss' },
    { date: data, cat: 'salary 💸', amm: 2000, des: 'this is salary', it: 'income' },
    { date: data, cat: 'salary 💸', amm: 20000, des: 'this is monthly salary', it: 'income' },
    { date: data, cat: 'other ', amm: 20, des: 'mene pese diye chai me', it: 'expenss' },
    { date: data, cat: 'other ', amm: 80, des: 'dost ne pese diye', it: 'income' },
    { date: data, cat: 'shopping 🛍️', amm: 800, des: 'hum kharidi karne guy', it: 'expenss' },
  ], []);

  // Filtered and Sorted data
  const filteredDatas = useMemo(() => {
    let result = [...datas];

    // 1. Search Query Filter - Apply globally if search text exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.cat.toLowerCase().includes(query) ||
        item.des.toLowerCase().includes(query)
      );
    }

    // 2. Advanced Filters - ONLY apply when 'All' tab is active
    if (activeTab === 1) {
      // Transaction Type Filter
      if (filters.type !== "All") {
        const typeKey = filters.type.toLowerCase() === "income" ? "income" : "expenss";
        result = result.filter(item => item.it === typeKey);
      }

      // Category Filter
      if (filters.category !== "All") {
        result = result.filter(item => {
          const itemCatLower = item.cat.toLowerCase();
          const filterCatLower = filters.category.toLowerCase();
          return itemCatLower.includes(filterCatLower);
        });
      }

      // Date Filter
      if (filters.dateRange !== "All") {
        const now = new Date();
        if (filters.dateRange === "Last 7 Days") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          result = result.filter(item => item.date >= sevenDaysAgo);
        } else if (filters.dateRange === "This Month") {
          result = result.filter(item => {
            return item.date.getMonth() === now.getMonth() &&
              item.date.getFullYear() === now.getFullYear();
          });
        }
      }

      // Sorting
      if (filters.sortBy === "Amount: High to Low") {
        result.sort((a, b) => b.amm - a.amm);
      } else if (filters.sortBy === "Amount: Low to High") {
        result.sort((a, b) => a.amm - b.amm);
      } else {
        result.sort((a, b) => b.date - a.date);
      }
    } else {
      // For Income, Expense, and Total tabs:
      // Always show relevant items (handled by child components)
      // but keep latest sorting as default
      result.sort((a, b) => b.date - a.date);
    }

    return result;
  }, [datas, searchQuery, filters, activeTab]);

  // Calculate dynamic balance totals (always from full data)
  const totals = useMemo(() => {
    const income = datas.filter(i => i.it === 'income').reduce((s, j) => s + j.amm, 0);
    const expense = datas.filter(i => i.it === 'expenss').reduce((s, k) => s + k.amm, 0);
    return {
      balance: income - expense,
      income: income,
      expense: expense
    };
  }, [datas]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. FIXED HEADER SECTION */}
      <View style={styles.headerWrapper}>
        <Upper
          totalBalance={totals.balance}
          income={totals.income}
          expense={totals.expense}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterPress={() => setIsFilterVisible(true)}
        />
      </View>

      {/* 2. MID SECTION - Scrollable Content */}
      <View style={styles.content}>
        <Middel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          datas={filteredDatas}
        />
      </View>

      {/* 3. FIXED BOTTOM NAVIGATION */}
      <Bottom />

      {/* 4. FILTER BOTTOM SHEET - Root Level Modal */}
      <FilterBottomSheet
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        filters={filters}
        onApply={(newFilters) => setFilters(newFilters)}
        onReset={(resetFilters) => setFilters(resetFilters)}
      />
    </SafeAreaView>
  );
};

export default desbord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerWrapper: {
    backgroundColor: '#f8f9fa',
    zIndex: 10,
  },
  content: {
    flex: 1,
  }
});
