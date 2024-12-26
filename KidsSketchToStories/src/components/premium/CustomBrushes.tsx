// src/components/premium/CustomBrushes.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BrushPreview } from './BrushPreview';
import { BrushEditor } from './BrushEditor';

export interface CustomBrush {
  id: string;
  name: string;
  settings: {
    size: number;
    opacity: number;
    flow: number;
    scatter: number;
    texture: string;
  };
}

export const CustomBrushes: React.FC = () => {
  const [brushes, setBrushes] = useState<CustomBrush[]>([]);
  const [selectedBrush, setSelectedBrush] = useState<CustomBrush | null>(null);

  const handleCreateBrush = (settings: CustomBrush['settings']) => {
    const newBrush: CustomBrush = {
      id: Date.now().toString(),
      name: `Brush ${brushes.length + 1}`,
      settings,
    };
    setBrushes([...brushes, newBrush]);
  };

  return (
    <View style={styles.container}>
      <BrushEditor
        onSave={handleCreateBrush}
        currentBrush={selectedBrush}
      />
      <BrushPreview brushes={brushes} onSelect={setSelectedBrush} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  }
});