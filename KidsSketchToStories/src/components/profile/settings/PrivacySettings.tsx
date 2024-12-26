// src/components/profile/settings/PrivacySettings.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Profile } from '../../../types/profile';

interface PrivacySettingsProps {
  profile: Profile;
  onUpdate: (updates: Partial<Profile>) => void;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  profile,
  onUpdate,
}) => {
  const updatePrivacy = (privacy: Profile['preferences']['privacy']) => {
    onUpdate({
      preferences: { ...profile.preferences, privacy }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Visibility</Text>
        {(['public', 'private', 'friends'] as const).map((option) => (
          <View key={option} style={styles.option}>
            <Text style={styles.optionLabel}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
            <Switch
              value={profile.preferences.privacy === option}
              onValueChange={(enabled) => {
                if (enabled) updatePrivacy(option);
              }}
            />
          </View>
        ))}
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  optionLabel: {
    fontSize: 14,
    color: '#333',
  },
}); 