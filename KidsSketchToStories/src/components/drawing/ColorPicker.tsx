// src/components/drawing/ColorPicker.tsx
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import ColorWheel from 'react-native-wheel-color-picker';
import LinearGradient from 'react-native-linear-gradient';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  onGradientSelect?: (colors: string[]) => void;
}

interface PresetColor {
  id: string;
  name: string;
  value?: string;
  colors?: string[];
}

const BASIC_COLORS: PresetColor[] = [
  { id: 'red', name: 'Red', value: '#FF0000' },
  { id: 'orange', name: 'Orange', value: '#FFA500' },
  { id: 'yellow', name: 'Yellow', value: '#FFFF00' },
  { id: 'green', name: 'Green', value: '#00FF00' },
  { id: 'turquoise', name: 'Turquoise', value: '#40E0D0' },
  { id: 'blue', name: 'Blue', value: '#0000FF' },
  { id: 'purple', name: 'Purple', value: '#800080' },
  { id: 'pink', name: 'Pink', value: '#FFC0CB' },
  { id: 'white', name: 'White', value: '#FFFFFF' },
  { id: 'black', name: 'Black', value: '#000000' },
  { id: 'grey', name: 'Grey', value: '#808080' },
  { id: 'brown', name: 'Brown', value: '#8B4513' },
];

const GRADIENT_PRESETS: PresetColor[] = [
  { 
    id: 'rainbow',
    name: 'Rainbow',
    colors: ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', '#800080']
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: ['#FF7F50', '#FF6B6B', '#4B0082']
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: ['#00FFFF', '#0000FF', '#000080']
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: ['#228B22', '#006400', '#004D00']
  },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
  onGradientSelect,
}) => {
  const [showWheel, setShowWheel] = useState(false);
  const [wheelColor, setWheelColor] = useState(selectedColor);

  const handleColorSelect = useCallback((color: string) => {
    onColorChange(color);
  }, [onColorChange]);

  const handleGradientSelect = useCallback((colors: string[]) => {
    if (onGradientSelect) {
      onGradientSelect(colors);
    } else {
      onColorChange(colors[0]);
    }
  }, [onColorChange, onGradientSelect]);

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.presetContainer}
      >
        {BASIC_COLORS.map((color) => (
          <TouchableOpacity
            key={color.id}
            onPress={() => handleColorSelect(color.value!)}
            style={[
              styles.colorPreset,
              { backgroundColor: color.value },
              selectedColor === color.value && styles.selectedPreset,
            ]}
          >
            <Text style={[
              styles.colorName,
              color.value === '#FFFFFF' && styles.darkText,
            ]}>
              {color.name.charAt(0)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {onGradientSelect && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.gradientContainer}
        >
          {GRADIENT_PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.id}
              onPress={() => handleGradientSelect(preset.colors!)}
              style={styles.colorPreset}
            >
              <LinearGradient
                colors={preset.colors!}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientPreset}
              />
              <Text style={styles.gradientName}>{preset.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => setShowWheel(true)}
        style={[styles.customColorButton, { backgroundColor: wheelColor }]}
      >
        <Text style={styles.customColorText}>Custom Color</Text>
      </TouchableOpacity>

      {showWheel && (
        <View style={styles.wheelContainer}>
          <ColorWheel
            color={selectedColor}
            onColorChange={setWheelColor}
            onColorChangeComplete={handleColorSelect}
            thumbSize={30}
            sliderSize={20}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowWheel(false)}
          >
            <View style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  presetContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  gradientContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 10,
  },
  colorPreset: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedPreset: {
    borderColor: '#000',
    borderWidth: 3,
  },
  colorName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  darkText: {
    color: '#000000',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
  },
  gradientPreset: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientName: {
    color: '#FFFFFF',
    fontSize: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  customColorButton: {
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  customColorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  wheelContainer: {
    height: 250,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 16,
    height: 2,
    backgroundColor: '#000',
    transform: [{ rotate: '45deg' }],
  },
});

export default ColorPicker;