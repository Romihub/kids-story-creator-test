// src/components/profile/ColorCustomizer.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

interface ColorCustomizerProps {
  colors: Record<string, string>;
  onColorChange: (key: string, color: string) => void;
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  colors,
  onColorChange,
}) => {
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Colors</Text>
      <View style={styles.swatchContainer}>
        {Object.entries(colors).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={[styles.swatch, { backgroundColor: value }]}
            onPress={() => setSelectedKey(key)}
          >
            <Text style={styles.swatchLabel}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedKey && (
        <View style={styles.pickerContainer}>
          <ColorPicker
            color={colors[selectedKey]}
            onColorChange={(color) => onColorChange(selectedKey, color)}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
        </View>
      )}
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
  swatchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  swatch: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatchLabel: {
    color: '#FFF',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pickerContainer: {
    height: 200,
    marginTop: 16,
  },
}); 