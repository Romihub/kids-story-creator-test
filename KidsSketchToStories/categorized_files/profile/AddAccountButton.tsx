// src/components/profile/AddAccountButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AddAccountButtonProps {
  onPress: () => void;
  availableProviders: string[];
}

export const AddAccountButton: React.FC<AddAccountButtonProps> = ({
  onPress,
  availableProviders,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="plus-circle-outline" size={24} color="#007AFF" />
      <Text style={styles.text}>Connect New Account</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
}); 