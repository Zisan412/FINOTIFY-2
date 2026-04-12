import { StyleSheet, View, SafeAreaView, Platform, PermissionsAndroid, Alert } from "react-native";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import Upper from "./upper";
import Bottom from "./bottom";
import Middle from "./middle";
import FilterBottomSheet from "./FilterBottomSheet";
import { BASE_URL } from "../../constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [statsFilter, setStatsFilter] = useState(null);

  useEffect(() => {
    if (params.tab) {
      setActiveTab(parseInt(params.tab));
    }
    if (params.filter) {
      setStatsFilter({
        filter: params.filter,
        startDate: params.startDate ? new Date(params.startDate) : new Date(),
        endDate: params.endDate ? new Date(params.endDate) : new Date(),
      });
      fetchData();
    }
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
  }, [params.tab, params.filter, params.startDate, params.endDate]);

  const fetchData = useCallback(async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;
    axios.get(`${BASE_URL}/getdashboardentry?user=${userId}`)
      .then(res => {
        if (res.data && res.data.dashboard) {
          setDatas(res.data.dashboard);
        }
      })
      .catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setStatsFilter(null);
  }, []);

  const sendSmsToBackend = useCallback((body, smsDate) => {
    const inner = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) return;
        await axios.post(
          `${BASE_URL}/parse-sms`,
          { body, userId, smsDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchData();
      } catch (e) {}
    };
    inner();
  }, [fetchData]);

  const scanOldSms = useCallback(() => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    SmsAndroid.list(
      JSON.stringify({ box: 'inbox', minDate: thirtyDaysAgo, maxCount: 500 }),
      () => {},
      (count, smsList) => {
        const messages = JSON.parse(smsList);
        messages.forEach((msg) => {
          const body = msg.body || '';
          const isUpi = /UPI|debited|credited|Sent|Received/i.test(body);
          if (isUpi) sendSmsToBackend(body, msg.date);
        });
      }
    );
  }, [sendSmsToBackend]);

  const requestSmsPermission = useCallback(() => {
    const inner = async () => {
      try {
        const alreadyAsked = await AsyncStorage.getItem('smsPermissionAsked');
        if (alreadyAsked) {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_SMS
          );
          if (granted) scanOldSms();
          return;
        }
        Alert.alert(
          'UPI Transactions Auto-Detect 🔔',
          'Please allow SMS permission to auto-detect UPI transactions',
          [
            {
              text: 'Allow',
              onPress: async () => {
                await AsyncStorage.setItem('smsPermissionAsked', 'true');
                const result = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_SMS,
                  {
                    title: 'SMS Permission',
                    message: 'Allow SMS permission to auto-detect UPI transactions',
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
              text: 'Later',
              onPress: async () => {
                await AsyncStorage.setItem('smsPermissionAsked', 'true');
              },
              style: 'cancel',
            },
          ]
        );
      } catch (e) {}
    };
    inner();
  }, [scanOldSms]);

  const scanSmsSince = useCallback((fromTimestamp) => {
    if (!SmsAndroid) {
      fetchData();
      return;
    }
    SmsAndroid.list(
      JSON.stringify({ box: 'inbox', minDate: fromTimestamp, maxCount: 200 }),
      () => {},
      (count, smsList) => {
        const messages = JSON.parse(smsList);
        messages.forEach((msg) => {
          const body = msg.body || '';
          const isUpi = /UPI|debited|credited|Sent|Received/i.test(body);
          if (isUpi) sendSmsToBackend(body, msg.date);
        });
      }
    );
  }, [sendSmsToBackend]);

  useEffect(() => {
    if (Platform.OS !== 'android' || isAuthLoading) return;
    requestSmsPermission();
    const subscription = SmsListener.addListener((message) => {
      const body = message.body || '';
      const isUpi = /UPI|debited|credited|Sent|Received/i.test(body);
      if (isUpi) sendSmsToBackend(body);
    });
    return () => subscription.remove();
  }, [isAuthLoading]); // eslint-disable-line

  const monthlyData = useMemo(() => {
    if (statsFilter) {
      const now = new Date();
      return datas.filter((item) => {
        const entryDate = new Date(item.date);
        if (statsFilter.filter === 'This Week') {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return entryDate >= weekAgo && entryDate <= now;
        }
        if (statsFilter.filter === 'This Month') {
          return (
            entryDate.getMonth() === now.getMonth() &&
            entryDate.getFullYear() === now.getFullYear()
          );
        }
        if (statsFilter.filter === 'Custom') {
          const end = new Date(statsFilter.endDate);
          end.setHours(23, 59, 59);
          return entryDate >= statsFilter.startDate && entryDate <= end;
        }
        return true;
      });
    }
    return datas.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [datas, selectedDate, statsFilter]);

  const filteredDatas = useMemo(() => {
    let result = [...monthlyData];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.category.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.amount.toString().includes(query),
      );
    }

    if (activeTab === 1) {
      if (filters.type !== "All") {
        const typeKey = filters.type.toLowerCase() === "income" ? "income" : "expense";
        result = result.filter((item) => item.type === typeKey);
      }
      if (filters.category !== "All") {
        result = result.filter((item) =>
          item.category.toLowerCase().includes(filters.category.toLowerCase())
        );
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
      if (activeTab === 2) {
        result = result.filter((item) => item.type === 'income');
      } else if (activeTab === 3) {
        result = result.filter((item) => item.type === 'expense');
      }
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return result;
  }, [monthlyData, searchQuery, filters, activeTab]);

  const totals = useMemo(() => {
    const income = monthlyData.filter((i) => i.type === "income").reduce((s, j) => s + parseFloat(j.amount), 0);
    const expense = monthlyData.filter((i) => i.type === "expense").reduce((s, k) => s + parseFloat(k.amount), 0);
    return { 
      balance: parseFloat((income - expense).toFixed(2)), 
      income: parseFloat(income.toFixed(2)), 
      expense: parseFloat(expense.toFixed(2)) 
    };
  }, [monthlyData]);

  const handleRefresh = () => {
    setStatsFilter(null);
    setSearchQuery("");
    setFilters({ type: "All", category: "All", dateRange: "All", sortBy: "Latest" });
    setActiveTab(1);
    setSelectedDate(new Date());
    if (datas.length > 0) {
      const lastEntryTime = Math.max(...datas.map(d => new Date(d.date).getTime()));
      scanSmsSince(lastEntryTime);
    } else {
      scanSmsSince(Date.now() - 24 * 60 * 60 * 1000);
    }
    fetchData();
  };

  if (isAuthLoading) return null;

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
          onMonthChange={(date) => {
            setSelectedDate(date);
            setStatsFilter(null);
          }}
        />
      </View>

      <View style={styles.content}>
        <Middle
          activeTab={activeTab}
          onTabChange={handleTabChange}
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
