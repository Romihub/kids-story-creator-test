// src/components/profile/ThemePicker.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface Theme {
  colors: Record<string, string>;
  typography: {
    fontFamily: string;
  };
}

interface ThemePickerProps {
  currentTheme: Theme;
  onThemeSelect: (theme: Partial<Theme>) => void;
}

const PRESET_THEMES = [
  {
    name: 'Light',
    colors: {
      primary: '#007AFF',
      background: '#FFFFFF',
      text: '#000000',
    },
  },
  {
    name: 'Dark',
    colors: {
      primary: '#0A84FF',
      background: '#000000',
      text: '#FFFFFF',
    },
  },
  {
    name: 'Nature',
    colors: {
      primary: '#34C759',
      background: '#F8F9FA',
      text: '#2C3E50',
    },
  },
];

export const ThemePicker: React.FC<ThemePickerProps> = ({
  currentTheme,
  onThemeSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {PRESET_THEMES.map((theme) => (
          <TouchableOpacity
            key={theme.name}
            style={styles.themeOption}
            onPress={() => onThemeSelect(theme)}
          >
            <View style={[styles.colorPreview, { backgroundColor: theme.colors.primary }]} />
            <Text style={styles.themeName}>{theme.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  themeOption: {
    alignItems: 'center',
    marginRight: 16,
  },
  colorPreview: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  themeName: {
    fontSize: 14,
    color: '#666',
  },
}); 