// src/components/profile/settings/PreferencesSettings.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Profile } from '../../../types/profile';
import { LanguageSelector } from '../LanguageSelector';

interface PreferencesSettingsProps {
  profile: Profile;
  onUpdate: (updates: Partial<Profile>) => void;
}

type PreferenceValue = boolean | string;

export const PreferencesSettings: React.FC<PreferencesSettingsProps> = ({
  profile,
  onUpdate,
}) => {
  const updatePreference = (key: keyof Profile['preferences'], value: PreferenceValue) => {
    onUpdate({
      preferences: { ...profile.preferences, [key]: value }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Enable Notifications</Text>
          <Switch
            value={profile.preferences.notifications}
            onValueChange={(value) => updatePreference('notifications', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <LanguageSelector
          currentLanguage={profile.preferences.language}
          onLanguageSelect={(language) => updatePreference('language', language)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Dark Mode</Text>
          <Switch
            value={profile.preferences.theme === 'dark'}
            onValueChange={(value) => 
              updatePreference('theme', value ? 'dark' : 'light')
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
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