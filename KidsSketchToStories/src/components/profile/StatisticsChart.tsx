// src/components/profile/StatisticsChart.tsx
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

interface Dataset {
  data: number[];
  color?: (opacity: number) => string;
  strokeWidth?: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface StatisticsChartProps {
  data: ChartData;
  type: 'line' | 'bar';
}

export const StatisticsChart: React.FC<StatisticsChartProps> = ({
  data,
  type,
}) => {
  const screenWidth = Dimensions.get('window').width - 32;

  const chartConfig: AbstractChartConfig = {
    backgroundColor: '#FFF',
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    style: {
      borderRadius: 16,
    },
  };

  const formattedData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      color: dataset.color || ((opacity = 1) => `rgba(0, 122, 255, ${opacity})`),
    })),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Statistics</Text>
      {type === 'line' ? (
        <LineChart
          data={formattedData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      ) : (
        <BarChart
          data={formattedData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          showValuesOnTopOfBars
          yAxisLabel=""
          yAxisSuffix=""
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 