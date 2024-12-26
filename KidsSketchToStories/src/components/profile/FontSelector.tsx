// src/components/profile/FontSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface FontSelectorProps {
  currentFont: string;
  onFontSelect: (font: string) => void;
}

const AVAILABLE_FONTS = [
  { name: 'System', family: undefined },
  { name: 'Arial', family: 'Arial' },
  { name: 'Helvetica', family: 'Helvetica' },
  { name: 'Roboto', family: 'Roboto' },
  { name: 'Comic Sans', family: 'Comic Sans MS' },
  { name: 'Courier', family: 'Courier New' },
];

export const FontSelector: React.FC<FontSelectorProps> = ({
  currentFont,
  onFontSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Font Style</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {AVAILABLE_FONTS.map((font) => (
          <TouchableOpacity
            key={font.name}
            style={[
              styles.fontOption,
              currentFont === font.family && styles.selectedFont,
            ]}
            onPress={() => onFontSelect(font.family || 'System')}
          >
            <Text style={[
              styles.fontSample,
              font.family && { fontFamily: font.family },
            ]}>
              Aa
            </Text>
            <Text style={styles.fontName}>{font.name}</Text>
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
  fontOption: {
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    minWidth: 80,
  },
  selectedFont: {
    backgroundColor: '#007AFF',
  },
  fontSample: {
    fontSize: 24,
    marginBottom: 4,
  },
  fontName: {
    fontSize: 12,
    color: '#666',
  },
}); 