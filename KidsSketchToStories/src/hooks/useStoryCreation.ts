import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store';
import {
  setCurrentStep,
  setDrawingState,
  setDrawingPaths,
  setSettings,
  setStoryId,
  setGenerating,
  setError,
  resetStoryCreation,
  resetDrawing,
  resetSettings,
  DrawingState,
  StorySettings,
} from '../store/slices/storyCreationSlice';
import type { RootStackParamList } from '../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useStoryCreation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const storyCreation = useSelector((state: RootState) => state.storyCreation);

  // Navigation helpers
  const navigateToDrawing = useCallback(() => {
    dispatch(setCurrentStep('drawing'));
    const drawingId = storyCreation.drawing.drawingId || Date.now().toString();
    navigation.navigate('Drawing', {
      id: drawingId,
      mode: 'new',
      imageUri: storyCreation.drawing.imageUri || undefined,
    });
  }, [dispatch, navigation, storyCreation.drawing]);

  const navigateToCustomize = useCallback(() => {
    dispatch(setCurrentStep('customize'));
    navigation.navigate('CustomizeStory', {
      imageUri: storyCreation.drawing.imageUri || undefined,
      drawingId: storyCreation.drawing.drawingId || undefined,
    });
  }, [dispatch, navigation, storyCreation.drawing]);

  const navigateToGenerate = useCallback(() => {
    dispatch(setCurrentStep('generate'));
    navigation.navigate('StoryCreation');
  }, [dispatch, navigation]);

  const navigateToHome = useCallback(() => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  }, [navigation]);

  // State management
  const updateDrawingState = useCallback((state: Partial<DrawingState>) => {
    dispatch(setDrawingState(state));
  }, [dispatch]);

  const updateDrawingPaths = useCallback((paths: any[]) => {
    dispatch(setDrawingPaths(paths));
  }, [dispatch]);

  const updateSettings = useCallback((settings: Partial<StorySettings>) => {
    dispatch(setSettings(settings));
  }, [dispatch]);

  const startGenerating = useCallback(() => {
    dispatch(setGenerating(true));
  }, [dispatch]);

  const stopGenerating = useCallback(() => {
    dispatch(setGenerating(false));
  }, [dispatch]);

  const setStoryError = useCallback((error: string | null) => {
    dispatch(setError(error));
  }, [dispatch]);

  const resetFlow = useCallback(() => {
    dispatch(resetStoryCreation());
  }, [dispatch]);

  const resetDrawingState = useCallback(() => {
    dispatch(resetDrawing());
  }, [dispatch]);

  const resetSettingsState = useCallback(() => {
    dispatch(resetSettings());
  }, [dispatch]);

  // Navigation state checks
  const canNavigateToCustomize = useCallback(() => {
    return storyCreation.drawing.imageUri !== null || storyCreation.drawing.paths.length > 0;
  }, [storyCreation.drawing]);

  const canNavigateToGenerate = useCallback(() => {
    return canNavigateToCustomize() && storyCreation.settings.theme !== '';
  }, [canNavigateToCustomize, storyCreation.settings]);

  // Back navigation handling
  const handleBackNavigation = useCallback(() => {
    switch (storyCreation.currentStep) {
      case 'generate':
        navigateToCustomize();
        break;
      case 'customize':
        navigateToDrawing();
        break;
      case 'drawing':
        resetFlow();
        navigateToHome();
        break;
      default:
        navigation.goBack();
    }
  }, [storyCreation.currentStep, navigation, navigateToCustomize, navigateToDrawing, resetFlow, navigateToHome]);

  return {
    // State
    currentStep: storyCreation.currentStep,
    drawing: storyCreation.drawing,
    settings: storyCreation.settings,
    isGenerating: storyCreation.isGenerating,
    error: storyCreation.error,
    storyId: storyCreation.storyId,

    // Navigation
    navigateToDrawing,
    navigateToCustomize,
    navigateToGenerate,
    navigateToHome,
    handleBackNavigation,
    canNavigateToCustomize,
    canNavigateToGenerate,

    // State updates
    updateDrawingState,
    updateDrawingPaths,
    updateSettings,
    startGenerating,
    stopGenerating,
    setStoryError,
    setStoryId: (id: string | null) => dispatch(setStoryId(id)),

    // Reset functions
    resetFlow,
    resetDrawingState,
    resetSettingsState,
  };
};
