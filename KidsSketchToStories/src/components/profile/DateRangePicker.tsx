// src/components/profile/DateRangePicker.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangePickerProps {
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
}

const PRESET_RANGES = [
  { label: 'Week', days: 7 },
  { label: 'Month', days: 30 },
  { label: '3 Months', days: 90 },
  { label: 'Year', days: 365 },
];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  range,
  onRangeChange,
}) => {
  const setPresetRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    onRangeChange({ start, end });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Time Period</Text>
      <View style={styles.rangeButtons}>
        {PRESET_RANGES.map((preset) => (
          <TouchableOpacity
            key={preset.label}
            style={styles.rangeButton}
            onPress={() => setPresetRange(preset.days)}
          >
            <Icon name="calendar-range" size={20} color="#666" />
            <Text style={styles.rangeText}>{preset.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dateDisplay}>
        <Text style={styles.dateText}>
          {range.start.toLocaleDateString()} - {range.end.toLocaleDateString()}
        </Text>
      </View>
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
  rangeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    minWidth: 80,
    justifyContent: 'center',
  },
  rangeText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  dateDisplay: {
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
}); 