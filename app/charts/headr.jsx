import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import PieChart from 'react-native-pie-chart'
import { BarChart } from 'react-native-gifted-charts'

const Header = () => {
  const widthAndHeight = 180

  const series = [
    { value: 430, color: '#ED6665', label: 'Food' },
    { value: 321, color: '#F4C430', label: 'Shopping' },
    { value: 185, color: '#41A6C4', label: 'Salary' },
    { value: 123, color: '#90C7FF', label: 'Other' },
  ]

  const barData = [
    { value: 40, label: 'Jan', frontColor: '#0A63BC' },
    { value: 50, label: 'Feb', frontColor: '#0A63BC' },
    { value: 75, label: 'Mar', frontColor: '#0A63BC' },
    { value: 30, label: 'Apr', frontColor: '#0A63BC' },
    { value: 60, label: 'May', frontColor: '#0A63BC' },
    { value: 65, label: 'Jun', frontColor: '#0A63BC' },
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Title */}
      <Text style={styles.title}>Transaction Analytics</Text>

      {/* Pie Chart Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Category Breakdown</Text>

        <View style={styles.pieRow}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            cover={0.5}
          />

          <View style={styles.legend}>
            {series.map((item, index) => (
              <View key={index} style={styles.legendRow}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: item.color },
                  ]}
                />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Bar Chart Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Spending</Text>

        <BarChart
          isAnimated
          data={barData}
          width={280}
          height={200}
          barWidth={28}
          spacing={24}
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: '#888' }}
        />
      </View>

    </ScrollView>
  )
}

export default Header
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0A63BC',
    marginBottom: 20,
    marginTop:20,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },

  pieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  legend: {
    marginLeft: 10,
  },

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },

  legendText: {
    fontSize: 14,
    color: '#555',
  },
})
