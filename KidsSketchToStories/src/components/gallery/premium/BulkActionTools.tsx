// src/components/gallery/premium/BulkActionTools.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const BulkActionTools: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="select-all" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="delete-outline" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="folder-move-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
}); 