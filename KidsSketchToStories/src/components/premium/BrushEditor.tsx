// src/components/premium/BrushEditor.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import type { CustomBrush } from './CustomBrushes';

interface BrushEditorProps {
  currentBrush: CustomBrush | null;
  onSave: (settings: CustomBrush['settings']) => void;
}

export const BrushEditor: React.FC<BrushEditorProps> = ({ currentBrush, onSave }) => {
  const [settings, setSettings] = useState<CustomBrush['settings']>({
    size: 1,
    opacity: 1,
    flow: 1,
    scatter: 0,
    texture: 'default',
  });

  useEffect(() => {
    if (currentBrush) {
      setSettings(currentBrush.settings);
    }
  }, [currentBrush]);

  const handleSettingChange = (key: keyof CustomBrush['settings'], value: number) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSave(newSettings);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Size</Text>
        <Slider
          value={settings.size}
          onValueChange={(value: number) => handleSettingChange('size', value)}
          minimumValue={0.1}
          maximumValue={100}
          style={styles.slider}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Opacity</Text>
        <Slider
          value={settings.opacity}
          onValueChange={(value: number) => handleSettingChange('opacity', value)}
          minimumValue={0}
          maximumValue={1}
          style={styles.slider}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Flow</Text>
        <Slider
          value={settings.flow}
          onValueChange={(value: number) => handleSettingChange('flow', value)}
          minimumValue={0}
          maximumValue={1}
          style={styles.slider}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Scatter</Text>
        <Slider
          value={settings.scatter}
          onValueChange={(value: number) => handleSettingChange('scatter', value)}
          minimumValue={0}
          maximumValue={100}
          style={styles.slider}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
}); 