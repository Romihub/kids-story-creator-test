//src/hooks/useDrawing.ts
import type { DrawingHook } from '../types/drawing';
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../types/navigation';
import type { RootState } from '../store/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { DrawingTool, DrawingPath } from '../types/drawing';
import { useDrawingState } from './useDrawingState';
import { 
  setColor, 
  setStrokeWidth, 
  setTool,
  selectCurrentTool,
  selectCurrentColor,
  selectStrokeWidth
} from '../store/slices/drawingSlice';
import {
  saveDrawingToGallery,
  selectGalleryLoading,
  selectGalleryError
} from '../store/slices/gallerySlice';

export const useDrawing = () => {
  const dispatch = useAppDispatch();
  const tool = useAppSelector(selectCurrentTool);
  const color = useAppSelector(selectCurrentColor);
  const strokeWidth = useAppSelector(selectStrokeWidth);
  const navigation = useNavigation<NavigationProps>();
  const isLoading = useAppSelector((state: RootState) => selectGalleryLoading(state));
  const error = useAppSelector((state: RootState) => selectGalleryError(state));
  
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);

  const {
    paths,
    startPath,
    addPoint,
    endPath,
    undo,
    redo,
    clear,
    hasUndo,
    hasRedo
  } = useDrawingState();

  const handleSetTool = useCallback((newTool: DrawingTool) => {
    dispatch(setTool(newTool));
  }, [dispatch]);

  const handleSetColor = useCallback((newColor: string) => {
    dispatch(setColor(newColor));
  }, [dispatch]);

  const handleSetSize = useCallback((newSize: number) => {
    dispatch(setStrokeWidth(newSize));
  }, [dispatch]);

  const handleClear = useCallback(() => {
    Alert.alert(
      'Clear Drawing',
      'Are you sure you want to clear the entire drawing?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clear();
            // Reset to default tool settings
            dispatch(setColor('#000000'));
            dispatch(setTool('pencil'));
            dispatch(setStrokeWidth(3));
          },
        },
      ]
    );
  }, [dispatch, clear]);

  const saveDrawing = useCallback(async (drawing: { paths: DrawingPath[] }) => {
    console.log('saveDrawing called in useDrawing hook');
    if (drawing.paths.length === 0) {
      console.log('No paths to save in drawing');
      throw new Error('No drawing to save');
    }

    try {
      console.log('Drawing data prepared:', { color, strokeWidth, tool, pathCount: drawing.paths.length });
      console.log('Dispatching saveDrawingToGallery');
      
      const savedDrawing = await dispatch(saveDrawingToGallery({
        paths: drawing.paths,
        color,
        strokeWidth,
        tool,
        timestamp: new Date().toISOString()
      })).unwrap();
      
      console.log('Drawing saved successfully:', savedDrawing);
      
      Alert.alert(
        'Success',
        'Drawing saved to gallery!',
        [
          {
            text: 'View Gallery',
            onPress: () => {
              clear();
              navigation.navigate('Gallery', undefined);
            },
          },
          {
            text: 'New Drawing',
            onPress: () => {
              clear();
              dispatch(setColor('#000000'));
              dispatch(setTool('pencil'));
              dispatch(setStrokeWidth(3));
            },
          },
          {
            text: 'Continue Drawing',
            style: 'cancel',
          },
        ]
      );
      
      return savedDrawing;
    } catch (error) {
      console.error('Error in saveDrawing:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save drawing';
      Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
      throw error;
    }
  }, [dispatch, color, strokeWidth, tool, clear, navigation]);

  return {
    // Drawing tools state
    currentTool: tool,
    currentColor: color,
    strokeWidth,
    isPanelExpanded,

    // Drawing state
    paths,
    startPath,
    addPoint,
    endPath,
    
    // Actions
    setTool: handleSetTool,
    setColor: handleSetColor,
    setSize: handleSetSize,
    togglePanel: () => setIsPanelExpanded(prev => !prev),
    clear: handleClear,
    saveDrawing,
    undo,
    redo,

    // Undo/redo state
    hasUndo,
    hasRedo,
  };
};
