// src/components/premium/PhotoCartoonizer.tsx
//Photo Upload & Cartoonization Feature
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAI } from '../../hooks/useAI';
import { useSubscription } from '../../hooks/useSubscription';

interface PhotoCartoonizerProps {
  onPhotoProcessed: (cartoonizedImageUrl: string) => void;
}

export const PhotoCartoonizer: React.FC<PhotoCartoonizerProps> = ({ onPhotoProcessed }) => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [cartoonizedPhoto, setCartoonizedPhoto] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { cartoonizeImage } = useAI();
  const { tier } = useSubscription();

  const handlePhotoSelect = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1024,
      maxHeight: 1024,
    });

    if (result.assets && result.assets[0].uri) {
      setOriginalPhoto(result.assets[0].uri);
      processPhoto(result.assets[0].uri);
    }
  };

  const processPhoto = async (photoUri: string) => {
    try {
      setProcessing(true);
      const cartoonized = await cartoonizeImage(photoUri);
      setCartoonizedPhoto(cartoonized);
      onPhotoProcessed(cartoonized);
    } catch (error) {
      console.error('Failed to cartoonize image:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (!tier.features.customCover) {
    return (
      <View style={styles.container}>
        <Text style={styles.upgradeText}>
          Upgrade to Premium to use your photo as a cover!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.uploadButton}
        onPress={handlePhotoSelect}
        disabled={processing}
      >
        <Text style={styles.buttonText}>
          {processing ? 'Processing...' : 'Upload Your Photo'}
        </Text>
      </TouchableOpacity>

      {originalPhoto && (
        <View style={styles.previewContainer}>
          <Image 
            source={{ uri: originalPhoto }} 
            style={styles.preview}
          />
          {cartoonizedPhoto && (
            <Image 
              source={{ uri: cartoonizedPhoto }} 
              style={styles.preview}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  previewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  preview: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  upgradeText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});