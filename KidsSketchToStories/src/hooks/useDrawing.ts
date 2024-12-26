//src/hooks/useDrawing.ts
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { DrawingTool, DrawingPath } from '../types/drawing';

import { 
  addPath, 
  setColor, 
  setStrokeWidth, 
  setTool, 
  clearDrawing 
} from '../store/slices/drawingSlice';

export const useDrawing = () => {
  const dispatch = useAppDispatch();
  const { paths, currentColor, strokeWidth, tool } = useAppSelector(state => state.drawing);
  const [canvasSize, setCanvasSize] = useState(3);

  const handleSetTool = useCallback((newTool: DrawingTool) => {
    dispatch(setTool(newTool));
  }, [dispatch]);

  const handleSetColor = useCallback((newColor: string) => {
    dispatch(setColor(newColor));
  }, [dispatch]);

  const handleSetSize = useCallback((newSize: number) => {
    setCanvasSize(newSize);
    dispatch(setStrokeWidth(newSize));
  }, [dispatch]);

  const handleAddPath = useCallback((path: DrawingPath) => {
    dispatch(addPath(path));
  }, [dispatch]);

  const handleClear = useCallback(() => {
    Alert.alert(
      'Clear Drawing',
      'Are you sure you want to clear the drawing?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => dispatch(clearDrawing()),
        },
      ]
    );
  }, [dispatch]);

  const saveDrawing = async () => {
    try {
      const drawingData = {
        paths,
        color: currentColor,
        strokeWidth,
        tool,
        timestamp: new Date().toISOString(),
      };

      const savedDrawings = await AsyncStorage.getItem('drawings');
      const drawings = savedDrawings ? JSON.parse(savedDrawings) : [];
      drawings.push(drawingData);
      await AsyncStorage.setItem('drawings', JSON.stringify(drawings));

      Alert.alert('Success', 'Drawing saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save drawing');
    }
  };

  return {
    currentTool: tool as DrawingTool,
    currentColor,
    strokeWidth,  // Make sure this is named consistently
    canvasSize,
    paths,
    setTool: handleSetTool,
    setColor: handleSetColor,
    //setSize: handleSetSize,
    setSize: setStrokeWidth, // This could be renamed to setStrokeWidth from handleSetStrokeWidth for consistency
    addPath: handleAddPath,
    clearDrawing: handleClear,
    saveDrawing,
  };
};