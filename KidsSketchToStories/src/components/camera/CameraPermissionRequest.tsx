//src/components/camera/CameraPermissionRequest.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCameraPermission } from '../../hooks/useCameraPermission';

export const CameraPermissionRequest = () => {
  const { checkPermission } = useCameraPermission();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera access is required</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={checkPermission}
      >
        <Text style={styles.buttonText}>Grant Permission</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#000000',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraPermissionRequest;