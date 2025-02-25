// src/components/drawing/BasicDrawingTools.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BasicDrawingTools: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tool}>
        <Icon name="pencil" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tool}>
        <Icon name="eraser" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  tool: {
    padding: 8,
    marginHorizontal: 4,
  },
});

export default BasicDrawingTools; 