// src/components/testing/ComponentTester.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface TestControlProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
}

export const TestControl: React.FC<TestControlProps> = ({
  label,
  value,
  onChange
}) => {
  return (
    <View style={styles.controlContainer}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
  },
});