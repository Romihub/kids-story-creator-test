//src/components/drawing/DrawingHeader.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface DrawingHeaderProps {
  onShowTools: () => void;
  onSave: () => void;
}

export const DrawingHeader: React.FC<DrawingHeaderProps> = ({
  onShowTools,
  onSave,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={onShowTools}
      >
        <Icon name="palette" size={24} color="#007AFF" />
        <Text style={styles.buttonText}>Tools</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Drawing</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={onSave}
      >
        <Icon name="save" size={24} color="#007AFF" />
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    marginLeft: 4,
    color: '#007AFF',
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DrawingHeader;