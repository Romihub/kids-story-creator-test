// src/components/profile/settings/GeneralSettings.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SettingsComponentProps } from '../../../types/settings';

export const GeneralSettings: React.FC<SettingsComponentProps> = ({
  profile,
  onUpdate,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={styles.input}
          value={profile.displayName}
          onChangeText={(text) => onUpdate({ displayName: text })}
          placeholder="Enter display name"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={profile.bio}
          onChangeText={(text) => onUpdate({ bio: text })}
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
}); 