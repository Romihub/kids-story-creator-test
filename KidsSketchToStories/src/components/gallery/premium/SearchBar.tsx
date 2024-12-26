// src/components/gallery/premium/SearchBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name="magnify" size={20} color="#666" />
      <TextInput 
        style={styles.input}
        placeholder="Search gallery..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
}); 