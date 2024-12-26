// src/components/drawing/ExportOptions.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ExportOptions: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exportButton}>
        <Icon name="export-variant" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'flex-end',
  },
  exportButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
}); 