// src/hooks/useCameraPermission.ts
import { useState, useEffect } from 'react';
import { Camera } from 'react-native-vision-camera';
import { StyleSheet } from 'react-native';

export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'authorized');
    return status;
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return { hasPermission, checkPermission };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
  },
  image: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retakeButton: {
    backgroundColor: '#666',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});