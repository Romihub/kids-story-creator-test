// src/components/profile/advanced/ContentFilterSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FilterLevel = 'strict' | 'moderate' | 'minimal';

interface ContentFilterSelectorProps {
  value: FilterLevel;
  onChange: (level: FilterLevel) => void;
}

const FILTER_OPTIONS: Array<{
  value: FilterLevel;
  label: string;
  description: string;
}> = [
  {
    value: 'strict',
    label: 'Strict',
    description: 'Only educational content',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Balanced content filtering',
  },
  {
    value: 'minimal',
    label: 'Minimal',
    description: 'Basic safety filters only',
  },
];

export const ContentFilterSelector: React.FC<ContentFilterSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Content Filter</Text>
      {FILTER_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.option,
            value === option.value && styles.selectedOption,
          ]}
          onPress={() => onChange(option.value)}
        >
          <View>
            <Text style={[
              styles.optionLabel,
              value === option.value && styles.selectedText,
            ]}>
              {option.label}
            </Text>
            <Text style={[
              styles.optionDescription,
              value === option.value && styles.selectedText,
            ]}>
              {option.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
  option: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  optionDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  selectedText: {
    color: '#FFF',
  },
}); 