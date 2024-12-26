// src/components/premium/BrushPreview.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import type { CustomBrush } from './CustomBrushes';

interface BrushPreviewProps {
  brushes: CustomBrush[];
  onSelect: (brush: CustomBrush) => void;
}

export const BrushPreview: React.FC<BrushPreviewProps> = ({ brushes, onSelect }) => {
  return (
    <ScrollView horizontal style={styles.container}>
      {brushes.map((brush) => (
        <TouchableOpacity
          key={brush.id}
          style={styles.brushItem}
          onPress={() => onSelect(brush)}
        >
          <View style={styles.preview}>
            {/* Brush preview visualization */}
          </View>
          <Text style={styles.brushName}>{brush.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexGrow: 0,
  },
  brushItem: {
    padding: 8,
    alignItems: 'center',
    width: 80,
  },
  preview: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEE',
    marginBottom: 4,
  },
  brushName: {
    fontSize: 12,
    textAlign: 'center',
  },
}); 