// src/components/profile/advanced/TextSizeAdjuster.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TextSize = 'small' | 'medium' | 'large';

interface TextSizeAdjusterProps {
  value: TextSize;
  onChange: (size: TextSize) => void;
}

export const TextSizeAdjuster: React.FC<TextSizeAdjusterProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Text Size</Text>
      <View style={styles.buttonGroup}>
        {(['small', 'medium', 'large'] as TextSize[]).map((size) => (
          <TouchableOpacity
            key={size}
            style={[styles.button, value === size && styles.activeButton]}
            onPress={() => onChange(size)}
          >
            <Text style={[styles.buttonText, value === size && styles.activeText]}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#333',
  },
  activeText: {
    color: '#FFF',
  },
}); 