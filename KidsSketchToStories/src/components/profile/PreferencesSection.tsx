// src/components/profile/PreferencesSection.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PreferencesSettings } from './settings/PreferencesSettings';

interface PreferencesSectionProps {
  preferences: Record<string, any>;
  onUpdate: (key: string, value: any) => void;
  editing: boolean;
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  preferences,
  onUpdate,
  editing,
}) => {
  if (!editing) return null;

  return (
    <View style={styles.container}>
      <PreferencesSettings
        profile={{ preferences } as any}
        onUpdate={(updates) => {
          Object.entries(updates.preferences || {}).forEach(([key, value]) => {
            onUpdate(key, value);
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
}); 