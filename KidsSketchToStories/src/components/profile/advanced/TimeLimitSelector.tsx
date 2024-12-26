// src/components/profile/advanced/TimeLimitSelector.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface TimeLimitSelectorProps {
  value: number;
  onChange: (minutes: number) => void;
}

export const TimeLimitSelector: React.FC<TimeLimitSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Time Limit</Text>
      <Slider
        style={styles.slider}
        minimumValue={15}
        maximumValue={240}
        step={15}
        value={value}
        onValueChange={(newValue: number) => onChange(newValue)}
      />
      <Text style={styles.value}>{value} minutes</Text>
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
    marginBottom: 8,
  },
  slider: {
    height: 40,
  },
  value: {
    textAlign: 'center',
    color: '#666',
  },
}); 