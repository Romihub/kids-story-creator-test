// src/components/camera/CameraOverlay.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Now we'll use this

interface CameraOverlayProps {
  onCapture: () => void;
}

export const CameraOverlay: React.FC<CameraOverlayProps> = ({ onCapture }) => {
  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.captureButton} onPress={onCapture}>
        {/* Using the Icon component */}
        <Icon name="camera" size={32} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CameraOverlay;