// src/components/profile/advanced/ContrastAdjuster.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ContrastLevel = 'low' | 'normal' | 'high';

interface ContrastAdjusterProps {
  value: ContrastLevel;
  onChange: (level: ContrastLevel) => void;
}

export const ContrastAdjuster: React.FC<ContrastAdjusterProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Contrast</Text>
      <View style={styles.buttonGroup}>
        {(['low', 'normal', 'high'] as ContrastLevel[]).map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.button, value === level && styles.activeButton]}
            onPress={() => onChange(level)}
          >
            <Text style={[styles.buttonText, value === level && styles.activeText]}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#333',
  },
  activeText: {
    color: '#FFF',
  },
}); 