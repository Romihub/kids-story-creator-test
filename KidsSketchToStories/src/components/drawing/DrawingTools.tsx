// src/components/drawing/DrawingTools.tsx
import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawingTool } from '../../types/drawing';

const tools = [
  { id: 'pencil', name: 'Pencil', icon: 'pencil' },
  { id: 'crayon', name: 'Crayon', icon: 'brush' },
  { id: 'marker', name: 'Marker', icon: 'marker' },
  { id: 'pen', name: 'Pen', icon: 'pen' },
  { id: 'highlight', name: 'Highlight', icon: 'brush-variant' },
] as const;

const colors = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Purple', value: '#800080' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Grey', value: '#808080' },
  { name: 'Brown', value: '#8B4513' },
];

const sizes = [2, 4, 6, 8];

export interface DrawingToolsProps {
  selectedTool: DrawingTool;
  selectedColor: string;
  strokeWidth: number;
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onClose: () => void;
}

export const DrawingTools: React.FC<DrawingToolsProps> = ({
  selectedTool,
  selectedColor,
  strokeWidth,
  onToolChange,
  onColorChange,
  onStrokeWidthChange,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Drawing Tools</Text>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Tools Section */}
      <Text style={styles.sectionTitle}>Tools</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolsScroll}>
        <View style={styles.tools}>
          {tools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[styles.tool, selectedTool === tool.id && styles.selectedTool]}
              onPress={() => onToolChange(tool.id as DrawingTool)}
            >
              <Icon 
                name={tool.icon} 
                size={24} 
                color={selectedTool === tool.id ? '#FFFFFF' : '#000000'} 
              />
              <Text style={[
                styles.toolText,
                selectedTool === tool.id && styles.selectedToolText
              ]}>
                {tool.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Colors Section */}
      <Text style={styles.sectionTitle}>Colors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorsScroll}>
        <View style={styles.colors}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.value}
              style={[
                styles.colorButton,
                { backgroundColor: color.value },
                selectedColor === color.value && styles.selectedColor,
                color.value === '#FFFFFF' && styles.whiteColorButton
              ]}
              onPress={() => onColorChange(color.value)}
            >
              {selectedColor === color.value && (
                <Icon 
                  name="check" 
                  size={16} 
                  color={color.value === '#FFFFFF' ? '#000000' : '#FFFFFF'} 
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sizes Section */}
      <Text style={styles.sectionTitle}>Stroke Width</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[styles.sizeButton, strokeWidth === size && styles.selectedSize]}
            onPress={() => onStrokeWidthChange(size)}
          >
            <View style={[styles.sizePreview, { height: size, backgroundColor: selectedColor }]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  toolsScroll: {
    maxHeight: 80,
  },
  tools: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  tool: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    width: 80,
  },
  selectedTool: {
    backgroundColor: '#007AFF',
  },
  toolText: {
    marginTop: 4,
    fontSize: 12,
    color: '#000000',
  },
  selectedToolText: {
    color: '#FFFFFF',
  },
  colorsScroll: {
    maxHeight: 60,
  },
  colors: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  whiteColorButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    marginBottom: 8,
  },
  sizeButton: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginRight: 12,
  },
  selectedSize: {
    backgroundColor: '#E0E0E0',
  },
  sizePreview: {
    width: '80%',
    borderRadius: 4,
  },
});

export default DrawingTools;