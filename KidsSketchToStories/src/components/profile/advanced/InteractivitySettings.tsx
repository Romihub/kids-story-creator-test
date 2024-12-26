// src/components/profile/advanced/InteractivitySettings.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ToggleSection } from './ToggleSection';

type InteractivityLevel = 'low' | 'medium' | 'high';

interface InteractivitySettingsProps {
  value: InteractivityLevel;
  onChange: (level: InteractivityLevel) => void;
}

interface InteractivityOption {
  key: string;
  label: string;
  description: string;
  enabledAt: InteractivityLevel[];
}

const INTERACTIVITY_OPTIONS: InteractivityOption[] = [
  {
    key: 'animations',
    label: 'Animations',
    description: 'Show animated transitions and effects',
    enabledAt: ['medium', 'high'],
  },
  {
    key: 'sound',
    label: 'Sound Effects',
    description: 'Play sounds for interactions',
    enabledAt: ['high'],
  },
  {
    key: 'haptic',
    label: 'Haptic Feedback',
    description: 'Vibrate on interactions',
    enabledAt: ['high'],
  },
];

export const InteractivitySettings: React.FC<InteractivitySettingsProps> = ({
  value,
  onChange,
}) => {
  const isEnabled = (option: InteractivityOption): boolean => {
    return option.enabledAt.indexOf(value) !== -1;
  };

  const handleToggle = (option: InteractivityOption, enabled: boolean) => {
    const newLevel = enabled 
      ? option.enabledAt[option.enabledAt.length - 1]
      : 'low';
    onChange(newLevel);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interactivity Settings</Text>
      {INTERACTIVITY_OPTIONS.map((option) => (
        <ToggleSection
          key={option.key}
          title={option.label}
          value={isEnabled(option)}
          onChange={(enabled) => handleToggle(option, enabled)}
        />
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
}); 