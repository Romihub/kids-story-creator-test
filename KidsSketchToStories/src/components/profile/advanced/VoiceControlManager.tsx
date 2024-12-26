// src/components/profile/advanced/VoiceControlManager.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface VoiceControlManagerProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const VoiceControlManager: React.FC<VoiceControlManagerProps> = ({ enabled, onToggle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Control</Text>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={enabled ? '#007AFF' : '#f4f3f4'}
        />
      </View>
      {enabled && (
        <Text style={styles.description}>
          Use voice commands to navigate and control the app
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
}); 