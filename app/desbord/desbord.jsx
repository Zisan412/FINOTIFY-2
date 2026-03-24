import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import Upper from "./upper";
import Bottom from "./bottom";
import Middel from "./middel";
import FilterBottomSheet from "./FilterBottomSheet";

import axios from "axios";

const desbord = () => {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(1);
  const [datas, setDatas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    type: "All",
    category: "All",
    dateRange: "All",
    sortBy: "Latest",
  });

  useEffect(() => {
    if (params.tab) {
      setActiveTab(parseInt(params.tab));
    }
  }, [params.tab]);

  const fetchData = useCallback(() => {
    axios.get('http://192.168.43.242:3000/user/getdashboardentry')
      .then(res => {
        if (res.data && res.data.dashboard) {
          setDatas(res.data.dashboard);
        }
      })
      .catch(err => console.log(err));
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  // Filtered and Sorted data
  const filteredDatas = useMemo(() => {
    let result = [...datas];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.category.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.amount.toString().includes(query),
      );
    }

    // 2. Advanced Filters - ONLY apply when 'All' tab is active
    if (activeTab === 1) {
      if (filters.type !== "All") {
        const typeKey = filters.type.toLowerCase() === "income" ? "income" : "expense";
        result = result.filter((item) => item.type === typeKey);
      }

      if (filters.category !== "All") {
        result = result.filter((item) => {
          const itemCatLower = item.category.toLowerCase();
          const filterCatLower = filters.category.toLowerCase();
          return itemCatLower.includes(filterCatLower);
        });
      }

      if (filters.dateRange !== "All") {
        const now = new Date();
        if (filters.dateRange === "Last 7 Days") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          result = result.filter((item) => new Date(item.date) >= sevenDaysAgo);
        } else if (filters.dateRange === "This Month") {
          result = result.filter((item) => {
            const itemDate = new Date(item.date);
            return (
              itemDate.getMonth() === now.getMonth() &&
              itemDate.getFullYear() === now.getFullYear()
            );
          });
        }
      }

      if (filters.sortBy === "Amount: High to Low") {
        result.sort((a, b) => b.amount - a.amount);
      } else if (filters.sortBy === "Amount: Low to High") {
        result.sort((a, b) => a.amount - b.amount);
      } else {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    } else {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [datas, searchQuery, filters, activeTab]);

  const totals = useMemo(() => {
    const income = datas
      .filter((i) => i.type === "income")
      .reduce((s, j) => s + j.amount, 0);
    const expense = datas
      .filter((i) => i.type === "expense")
      .reduce((s, k) => s + k.amount, 0);
    return {
      balance: income - expense,
      income: income,
      expense: expense,
    };
  }, [datas]);

  const handleRefresh = () => {
    setSearchQuery("");
    setFilters({
      type: "All",
      category: "All",
      dateRange: "All",
      sortBy: "Latest",
    });
    setActiveTab(1);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Upper
          totalBalance={totals.balance}
          income={totals.income}
          expense={totals.expense}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterPress={() => setIsFilterVisible(true)}
          onRefresh={handleRefresh}
        />
      </View>

      <View style={styles.content}>
        <Middel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          datas={filteredDatas}
          onDelete={fetchData}
        />
      </View>

      <Bottom />

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
    backgroundColor: "#f8f9fa",
  },
  headerWrapper: {
    backgroundColor: "#f8f9fa",
    zIndex: 10,
  },
  content: {
    flex: 1,
  },
});
