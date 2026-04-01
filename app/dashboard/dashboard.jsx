import { StyleSheet, View, SafeAreaView ,Platform} from "react-native";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import Upper from "./upper";
import Bottom from "./bottom";
import Middle from "./middle";
import FilterBottomSheet from "./FilterBottomSheet";
import { BASE_URL } from "../../constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Dashboard.jsx — TOP pe yeh imports add kar
// import { View, SafeAreaView, PermissionsAndroid, Alert, Platform } from "react-native";
import SmsAndroid from 'react-native-get-sms-android';
import SmsListener from 'react-native-android-sms-listener';

import axios from "axios";

const Dashboard = () => {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(1);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    type: "All",
    category: "All",
    dateRange: "All",
    sortBy: "Latest",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (params.tab) {
      setActiveTab(parseInt(params.tab));
    }
    // Session check: If no token, kick out to welcome page
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace("/");
        } else {
          setIsAuthLoading(false);
        }
      } catch (e) {
        router.replace("/");
      }
    };
    checkSession();
  }, [params.tab]);

  const fetchData = useCallback(async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;
    
    console.log('userId:', userId); 
    axios.get(`${BASE_URL}/getdashboardentry?user=${userId}`)
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
 // ─── SMS PERMISSION + SCAN ───────────────────────────────

const sendSmsToBackend = useCallback((body) => {
  const inner = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (!token || !userId) return;

      await axios.post(
        `${BASE_URL}/parse-sms`,
        { body, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData(); // entry add hone ke baad refresh
    } catch (e) {
      console.log('SMS backend error:', e);
    }
  };
  inner();
}, [fetchData]);

const scanOldSms = useCallback(() => {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

  SmsAndroid.list(
    JSON.stringify({
      box: 'inbox',
      minDate: thirtyDaysAgo,
      maxCount: 200,
    }),
    (fail) => console.log('SMS read failed:', fail),
    (count, smsList) => {
      const messages = JSON.parse(smsList);
      messages.forEach((msg) => {
        const body = msg.body || '';
        const isUpi = /UPI|debited|credited|Sent|Received/i.test(body);
        if (isUpi) sendSmsToBackend(body);
      });
    }
  );
}, [sendSmsToBackend]);

const requestSmsPermission = useCallback(() => {
  const inner = async () => {
    try {
      const alreadyAsked = await AsyncStorage.getItem('smsPermissionAsked');
      if (alreadyAsked) {
        // Already asked before — seedha scan kar
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_SMS
        );
        if (granted) scanOldSms();
        return;
      }

      // Pehli baar — popup dikhao
      Alert.alert(
        'UPI Transactions Auto-Detect 🔔',
        'Finotify aapke SMS read karke last 30 days ki UPI transactions automatically add kar sakta hai. Allow karein?',
        [
          {
            text: 'Allow',
            onPress: async () => {
              await AsyncStorage.setItem('smsPermissionAsked', 'true');
              const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                {
                  title: 'SMS Permission',
                  message: 'UPI transactions auto-detect ke liye SMS access chahiye.',
                  buttonPositive: 'Allow',
                  buttonNegative: 'Deny',
                }
              );
              if (result === PermissionsAndroid.RESULTS.GRANTED) {
                scanOldSms();
              }
            },
          },
          {
            text: 'Baad Mein',
            onPress: async () => {
              await AsyncStorage.setItem('smsPermissionAsked', 'true');
            },
            style: 'cancel',
          },
        ]
      );
    } catch (e) {
      console.log('Permission error:', e);
    }
  };
  inner();
}, [scanOldSms]);

// ─── SMS useEffect ────────────────────────────────────────
useEffect(() => {
  if (Platform.OS !== 'android' || isAuthLoading) return;

  requestSmsPermission();

  // Live listener — naya SMS aate hi detect karo
  const subscription = SmsListener.addListener((message) => {
    const body = message.body || '';
    const isUpi = /UPI|debited|credited|Sent|Received/i.test(body);
    if (isUpi) sendSmsToBackend(body);
  });

  return () => subscription.remove();
}, [isAuthLoading]); // eslint-disable-line

  const monthlyData = useMemo(() => {
    return datas.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [datas, selectedDate]);

  // Filtered and Sorted data
  const filteredDatas = useMemo(() => {
    let result = [...monthlyData];

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
  }, [monthlyData, searchQuery, filters, activeTab]);

  const totals = useMemo(() => {
    const income = monthlyData
      .filter((i) => i.type === "income")
      .reduce((s, j) => s + j.amount, 0);
    const expense = monthlyData
      .filter((i) => i.type === "expense")
      .reduce((s, k) => s + k.amount, 0);
    return {
      balance: income - expense,
      income: income,
      expense: expense,
    };
  }, [monthlyData]);

  const handleRefresh = () => {
    setSearchQuery("");
    setFilters({
      type: "All",
      category: "All",
      dateRange: "All",
      sortBy: "Latest",
    });
    setActiveTab(1);
    setSelectedDate(new Date());
    fetchData();
  };

  if (isAuthLoading) {
    return null; // Jab tak auth ho raha hai, tab tak blank dikhega taaki dashboard blink na kare
  }

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
          selectedDate={selectedDate}
          onMonthChange={setSelectedDate}
        />
      </View>

      <View style={styles.content}>
        <Middle
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

export default Dashboard;

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
