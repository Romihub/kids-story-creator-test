import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type FeedbackFrequency = 'minimal' | 'moderate' | 'frequent';

interface FeedbackPreferencesProps {
  value: FeedbackFrequency;
  onChange: (freq: FeedbackFrequency) => void;
}

const FEEDBACK_OPTIONS: Array<{
  value: FeedbackFrequency;
  label: string;
  icon: string;
  description: string;
}> = [
  {
    value: 'minimal',
    label: 'Minimal',
    icon: 'bell-off-outline',
    description: 'Essential feedback only',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    icon: 'bell-outline',
    description: 'Regular progress updates',
  },
  {
    value: 'frequent',
    label: 'Frequent',
    icon: 'bell-ring',
    description: 'Detailed feedback and tips',
  },
];

export const FeedbackPreferences: React.FC<FeedbackPreferencesProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Preferences</Text>
      {FEEDBACK_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.option,
            value === option.value && styles.selectedOption,
          ]}
          onPress={() => onChange(option.value)}
        >
          <Icon
            name={option.icon}
            size={24}
            color={value === option.value ? '#FFF' : '#333'}
          />
          <View style={styles.optionText}>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    marginLeft: 12,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  optionDescription: {
    fontSize: 12,
    color: '#666',
  },
  selectedText: {
    color: '#FFF',
  },
}); 