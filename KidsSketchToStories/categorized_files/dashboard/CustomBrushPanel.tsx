// src/components/drawing/CustomBrushPanel.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BrushOption {
  id: string;
  name: string;
  icon: string;
  size: number;
}

const brushOptions: BrushOption[] = [
  { id: 'pencil', name: 'Pencil', icon: 'pencil', size: 2 },
  { id: 'brush', name: 'Brush', icon: 'brush', size: 4 },
  { id: 'marker', name: 'Marker', icon: 'marker', size: 6 },
  { id: 'highlighter', name: 'Highlighter', icon: 'format-color-highlight', size: 8 },
];

export const CustomBrushPanel: React.FC = () => {
  return (
    <View style={styles.container}>
      {brushOptions.map((brush) => (
        <TouchableOpacity key={brush.id} style={styles.brushOption}>
          <Icon name={brush.icon} size={24} color="#000" />
          <Text style={styles.brushText}>{brush.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  brushOption: {
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 4,
  },
  brushText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});

//export default CustomBrushPanel; 