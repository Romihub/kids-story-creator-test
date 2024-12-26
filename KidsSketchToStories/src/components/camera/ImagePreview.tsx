// src/components/camera/ImagePreview.tsx
import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ImagePreviewProps {
  uri: string;
  onConfirm: () => void;
  onRetake: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  uri,
  onConfirm,
  onRetake,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onRetake}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.confirmButton]} 
          onPress={onConfirm}
        >
          <Text style={styles.buttonText}>Use Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    backgroundColor: '#666',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImagePreview;