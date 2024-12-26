// src/components/profile/advanced/LearningStyleSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type LearningStyle = 'visual' | 'auditory' | 'kinesthetic';

interface LearningStyleSelectorProps {
  value: LearningStyle;
  onChange: (style: LearningStyle) => void;
}

const LEARNING_STYLES: Array<{
  type: LearningStyle;
  icon: string;
  label: string;
}> = [
  { type: 'visual', icon: 'eye', label: 'Visual' },
  { type: 'auditory', icon: 'ear-hearing', label: 'Auditory' },
  { type: 'kinesthetic', icon: 'hand', label: 'Hands-on' },
];

export const LearningStyleSelector: React.FC<LearningStyleSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Style</Text>
      <View style={styles.options}>
        {LEARNING_STYLES.map((style) => (
          <TouchableOpacity
            key={style.type}
            style={[
              styles.option,
              value === style.type && styles.selectedOption,
            ]}
            onPress={() => onChange(style.type)}
          >
            <Icon
              name={style.icon}
              size={24}
              color={value === style.type ? '#FFF' : '#333'}
            />
            <Text
              style={[
                styles.optionLabel,
                value === style.type && styles.selectedLabel,
              ]}
            >
              {style.label}
            </Text>
          </TouchableOpacity>
        ))}
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
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
  },
  selectedLabel: {
    color: '#FFF',
  },
}); 