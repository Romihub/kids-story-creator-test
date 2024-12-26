// src/components/premium/MultiLanguageSupport.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface LanguageOption {
  code: string;
  name: string;
  available: boolean;
}

export const MultiLanguageSupport: React.FC<{
  storyId: string;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}> = ({ storyId, currentLanguage, onLanguageChange }) => {
  const [languages, setLanguages] = useState<LanguageOption[]>([]);
  const [translating, setTranslating] = useState(false);

  const handleLanguageChange = async (languageCode: string) => {
    try {
      setTranslating(true);
      // Implement translation logic
      onLanguageChange(languageCode);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {languages.map(language => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              currentLanguage === language.code && styles.activeLanguage
            ]}
            onPress={() => handleLanguageChange(language.code)}
            disabled={!language.available || translating}
          >
            <Text style={[
              styles.languageText,
              !language.available && styles.disabledText
            ]}>
              {language.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#FFF',
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
  },
  activeLanguage: {
    backgroundColor: '#007AFF',
  },
  languageText: {
    fontSize: 14,
    color: '#000',
  },
  disabledText: {
    color: '#999',
  },
});