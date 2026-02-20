import { StyleSheet, Text, View, ScrollView, Pressable, SafeAreaView, Platform, StatusBar } from 'react-native'
import React, { useState, useMemo } from 'react'
import { PieChart } from 'react-native-gifted-charts'
import { router } from 'expo-router'
import Bottom from '../desbord/bottom'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'

const Header = () => {
  const [selectedFilter, setSelectedFilter] = useState('This Month');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const filters = ['This Week', 'This Month', 'Custom'];

  const onFilterPress = (filter) => {
    if (filter === 'Custom') {
      setShowStartPicker(true);
    }
    setSelectedFilter(filter);
  };

  const onStartChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      if (Platform.OS === 'android') {
        // Delay end picker for Android to avoid visual glitches
        setTimeout(() => setShowEndPicker(true), 500);
      } else {
        setShowEndPicker(true);
      }
    }
  };

  const onEndChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  // Mock data that changes based on filter
  const pieData = useMemo(() => {
    const isWeek = selectedFilter === 'This Week';
    const isCustom = selectedFilter === 'Custom';

    return [
      {
        value: isWeek ? 1500 : isCustom ? 2800 : 4500,
        color: '#00e676',
        label: 'Income',
        onPress: () => router.replace({ pathname: '/desbord/desbord', params: { tab: 2 } })
      },
      {
        value: isWeek ? 1200 : isCustom ? 2100 : 3800,
        color: '#ff5252',
        label: 'Expense',
        onPress: () => router.replace({ pathname: '/desbord/desbord', params: { tab: 3 } })
      },
    ];
  }, [selectedFilter, startDate, endDate]);

  const total = pieData.reduce((acc, curr) => acc + curr.value, 0);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* TOP HEADER / FILTER */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Financial Stats</Text>
          <View style={styles.filterContainer}>
            {filters.map((f) => (
              <Pressable
                key={f}
                style={[styles.filterBtn, selectedFilter === f && styles.activeFilterBtn]}
                onPress={() => onFilterPress(f)}
              >
                <Text style={[styles.filterText, selectedFilter === f && styles.activeFilterText]}>
                  {f}
                </Text>
              </Pressable>
            ))}
          </View>

          {selectedFilter === 'Custom' && (
            <Pressable style={styles.customRangeBox} onPress={() => setShowStartPicker(true)}>
              <Ionicons name="calendar-outline" size={16} color="#0a63bc" />
              <Text style={styles.customRangeText}>
                {formatDate(startDate)} — {formatDate(endDate)}
              </Text>
              <Ionicons name="pencil-outline" size={14} color="#a4b0be" />
            </Pressable>
          )}
        </View>

        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartChange}
            maximumDate={new Date()}
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndChange}
            minimumDate={startDate}
            maximumDate={new Date()}
          />
        )}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Pie Chart Card */}
          <View style={styles.chartCard}>
            <View style={styles.chartWrapper}>
              <Pressable
                onPress={() => router.replace({ pathname: '/desbord/desbord', params: { tab: 1 } })}
                style={styles.chartInteractiveArea}
              >
                <PieChart
                  data={pieData}
                  donut
                  radius={120}
                  innerRadius={80}
                  innerCircleColor={'#ffffff'}
                  centerLabelComponent={() => (
                    <View style={styles.centerLabel}>
                      <Text style={styles.centerValue}>₹ {total}</Text>
                      <Text style={styles.centerSub}>Total Flow</Text>
                    </View>
                  )}
                />
              </Pressable>
            </View>

            {/* Legend */}
            <View style={styles.legendWrapper}>
              {pieData.map((item, index) => (
                <Pressable
                  key={index}
                  style={styles.legendItem}
                  onPress={item.onPress}
                >
                  <View style={[styles.dot, { backgroundColor: item.color }]} />
                  <View style={styles.legendTextContainer}>
                    <Text style={styles.legendLabel}>{item.label}</Text>
                    <Text style={styles.legendValue}>₹ {item.value}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#ccc" />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Quick Insights Placeholder */}
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Pro Insight 💡</Text>
            <Text style={styles.insightText}>
              Your {pieData[1].value > pieData[0].value ? 'expenses are higher' : 'savings are looking good'} this period.
              Keep it up!
            </Text>
          </View>
        </ScrollView>

        {/* FIXED BOTTOM NAVIGATION */}
        <Bottom />
      </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f2f6',
    borderRadius: 12,
    padding: 4,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeFilterBtn: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#a4b0be',
  },
  activeFilterText: {
    color: '#0a63bc',
  },
  customRangeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  customRangeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a63bc',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for fixed bottom navigation
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  chartWrapper: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartInteractiveArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  centerSub: {
    fontSize: 12,
    color: '#a4b0be',
    marginTop: 2,
  },
  legendWrapper: {
    width: '100%',
    gap: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  legendTextContainer: {
    flex: 1,
  },
  legendLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f3640',
  },
  legendValue: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  insightCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#1565c0',
    lineHeight: 20,
  }
})
