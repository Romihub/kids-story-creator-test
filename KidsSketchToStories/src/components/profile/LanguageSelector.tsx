// src/components/profile/LanguageSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageSelect: (language: Language) => void;
}

const LANGUAGES: Array<{ code: Language; name: string; flag: string }> = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageSelect,
}) => {
  return (
    <View style={styles.container}>
      {LANGUAGES.map(({ code, name, flag }) => (
        <TouchableOpacity
          key={code}
          style={[
            styles.option,
            currentLanguage === code && styles.selectedOption,
          ]}
          onPress={() => onLanguageSelect(code)}
        >
          <Text style={styles.flag}>{flag}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.languageName}>{name}</Text>
            <Text style={styles.languageCode}>{code.toUpperCase()}</Text>
          </View>
          {currentLanguage === code && (
            <Icon name="check" size={20} color="#007AFF" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  selectedOption: {
    backgroundColor: '#FFF',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 14,
    fontWeight: '500',
  },
  languageCode: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
}); 