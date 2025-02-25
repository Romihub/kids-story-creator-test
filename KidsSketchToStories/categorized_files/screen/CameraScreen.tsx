// src/screens/CameraScreen.tsx
import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import type { CameraDevice } from 'react-native-vision-camera';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { CameraOverlay } from '../components/camera/CameraOverlay';
import { ImagePreview } from '../components/camera/ImagePreview';
import { useCameraPermission } from '../hooks/useCameraPermission';
import { CameraPermissionRequest } from '../components/camera/CameraPermissionRequest';
import type { RootStackParamList } from '../types/navigation';


// Define navigation types - moved to src/types/navigation.ts
//type RootStackParamList = {
//  Drawing: { imageUri: string };
//  Camera: undefined;
//  // Add other screens as needed
//};

type CameraScreenNavigationProp = NavigationProp<RootStackParamList, 'Camera'>;

export const CameraScreen = () => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const [photo, setPhoto] = useState<string | null>(null);
  const { hasPermission } = useCameraPermission();

  const takePhoto = async () => {
    try {
      if (camera.current) {
        const image = await camera.current.takePhoto({
          qualityPriority: 'quality',
          flash: 'off',
        });
        setPhoto(image.path);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const confirmPhoto = () => {
    if (photo) {
      navigation.navigate('Drawing', { imageUri: photo });
    }
  };

  if (!hasPermission || !device) {
    return <CameraPermissionRequest />;
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <ImagePreview
          uri={photo}
          onConfirm={confirmPhoto}
          onRetake={() => setPhoto(null)}
        />
      ) : (
        <>
          <Camera
            ref={camera}
            device={device}
            isActive={true}
            photo={true}
            style={StyleSheet.absoluteFill}
          />
          <CameraOverlay onCapture={takePhoto} />
        </>
      )}
    </View>
  );
};

// Add this styles definition at the bottom of the file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});

export default CameraScreen;