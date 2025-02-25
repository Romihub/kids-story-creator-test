// src/components/drawing/premium/LayersPanel.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
}

interface LayersPanelProps {
  onLayerToggle?: (layerId: string) => void;
  onLayerReorder?: (fromIndex: number, toIndex: number) => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({ 
  onLayerToggle, 
  onLayerReorder 
}) => {
  const [layers, setLayers] = useState<Layer[]>([]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="layers" size={24} color="#000" />
        <Text style={styles.headerText}>Layers</Text>
      </View>
      {layers.map((layer, index) => (
        <TouchableOpacity 
          key={layer.id}
          style={styles.layerItem}
          onPress={() => onLayerToggle?.(layer.id)}
        >
          <Icon 
            name={layer.visible ? 'eye' : 'eye-off'} 
            size={20} 
            color="#000" 
          />
          <Text style={styles.layerName}>{layer.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  layerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  layerName: {
    marginLeft: 8,
    fontSize: 14,
  },
}); 