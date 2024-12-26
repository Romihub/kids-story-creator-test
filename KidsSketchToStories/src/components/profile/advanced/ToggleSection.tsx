// src/components/profile/advanced/ToggleSection.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface ToggleSectionProps {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const ToggleSection: React.FC<ToggleSectionProps> = ({ title, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={value ? '#007AFF' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
}); 