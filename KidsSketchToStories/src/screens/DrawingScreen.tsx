import React, { useCallback, useEffect, useState } from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, NavigationProps } from '../types/navigation';
import { View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import { drawingsApi } from '../services/api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawingCanvas } from '../components/drawing/DrawingCanvas';
import { DrawingTools } from '../components/drawing/DrawingTools';
import { DrawingHeader } from '../components/drawing/DrawingHeader';
import { StoryProgressBar } from '../components/navigation/StoryProgressBar';
import { useDrawing } from '../hooks/useDrawing';
import { useStoryCreation } from '../hooks/useStoryCreation';
import { DrawingTool, Point } from '../types/drawing';

type DrawingScreenRouteProp = RouteProp<RootStackParamList, 'Drawing'>;

export const DrawingScreen = () => {
  const route = useRoute<DrawingScreenRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const {
    currentStep,
    drawing: storyDrawing,
    updateDrawingState,
    updateDrawingPaths,
    navigateToCustomize,
    handleBackNavigation,
    canNavigateToCustomize,
  } = useStoryCreation();

  const {
    currentTool,
    currentColor,
    strokeWidth,
    isPanelExpanded,
    paths,
    setTool,
    setColor,
    setSize,
    saveDrawing,
    startPath,
    addPoint,
    endPath,
    clear,
    hasUndo,
    hasRedo,
    undo,
    redo,
    togglePanel
  } = useDrawing();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id: drawingId, imageUri, mode = 'new' } = route.params || {};
  const isEditMode = mode === 'edit';
  const isViewMode = mode === 'view';

  // Only reset tools once when entering view mode
  useEffect(() => {
    if (isViewMode) {
      setTool('pencil');
      setColor('#000000');
      setSize(3);
    }
  }, []); // Empty dependency array since we only want this to run once on mount

  // Update story creation state when paths change
  useEffect(() => {
    updateDrawingPaths(paths);
  }, [paths, updateDrawingPaths]);

  const handleSave = useCallback(async () => {
    if (isViewMode) return;
    if (!paths.length) {
      Alert.alert('Error', 'No drawing to save');
      return;
    }

    setIsLoading(true);
    try {
      if (drawingId && drawingId !== 'new') {
        await drawingsApi.updateDrawing(drawingId, {
          paths,
          color: currentColor,
          strokeWidth,
          tool: currentTool,
          timestamp: new Date().toISOString()
        });

        updateDrawingState({
          drawingId,
          paths,
          imageUri: null,
          source: 'draw'
        });

        if (canNavigateToCustomize()) {
          navigateToCustomize();
        } else {
          Alert.alert('Success', 'Drawing updated successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]);
        }
      } else {
        const savedDrawing = await saveDrawing({ paths });
        updateDrawingState({
          drawingId: savedDrawing.id,
          paths,
          imageUri: null,
          source: 'draw'
        });

        if (canNavigateToCustomize()) {
          navigateToCustomize();
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save drawing';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  }, [drawingId, paths, currentColor, strokeWidth, currentTool, saveDrawing, navigation, isViewMode, updateDrawingState, canNavigateToCustomize, navigateToCustomize]);

  // Load existing drawing if editing
  useEffect(() => {
    const loadDrawing = async () => {
      if (!drawingId || drawingId === 'new') return;

      setIsLoading(true);
      setError(null);
      try {
        const drawing = await drawingsApi.getDrawing(drawingId);
        if (!drawing) {
          throw new Error('Drawing not found');
        }
        // Set initial state from loaded drawing
        setTool(drawing.tool as DrawingTool);
        setColor(drawing.color);
        setSize(drawing.strokeWidth);
        // Load paths into drawing state
        drawing.paths.forEach(path => {
          startPath({
            x: path.points[0].x,
            y: path.points[0].y,
            tool: path.tool as DrawingTool,
            color: path.color,
            strokeWidth: path.strokeWidth
          });
          path.points.slice(1).forEach(point => addPoint(point));
          endPath();
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load drawing';
        setError(message);
        Alert.alert('Error', message, [
          { text: 'Go Back', onPress: handleBackNavigation }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDrawing();
  }, [drawingId]); // Only reload when drawingId changes

  const handleStrokeStart = useCallback((point: Point) => {
    startPath({
      x: point.x,
      y: point.y,
      tool: currentTool as DrawingTool,
      color: currentColor,
      strokeWidth
    });
  }, [currentTool, currentColor, strokeWidth, startPath]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.gestureRoot}>
        <SafeAreaView style={styles.safeArea} pointerEvents="box-none">
          <StoryProgressBar
            currentStep="drawing"
            onStepPress={handleBackNavigation}
            canNavigateBack={false}
          />
          
          <DrawingHeader
            onShowTools={togglePanel}
            onSave={isViewMode ? () => {
              navigation.setParams({ mode: 'edit' });
            } : handleSave}
            onUndo={undo}
            onRedo={redo}
            hasUndo={hasUndo}
            hasRedo={hasRedo}
            onClear={clear}
            isViewMode={isViewMode}
          />

          <View style={styles.mainContent} pointerEvents="box-none">
            <View style={styles.canvasContainer}>
              <DrawingCanvas
                tool={currentTool as DrawingTool}
                color={currentColor}
                strokeWidth={strokeWidth}
                backgroundImage={imageUri}
                onStrokeStart={handleStrokeStart}
                onStrokeMove={addPoint}
                onStrokeEnd={endPath}
                paths={paths}
                disabled={isViewMode}
              />
            </View>

            {!isViewMode && <DrawingTools
              selectedTool={currentTool as DrawingTool}
              selectedColor={currentColor}
              strokeWidth={strokeWidth}
              isPanelExpanded={isPanelExpanded}
              onToolChange={setTool}
              onColorChange={setColor}
              onStrokeWidthChange={setSize}
              onPanelToggle={togglePanel}
            />}
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gestureRoot: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  canvasContainer: {
    flex: 1,
    position: 'relative',
  },
});

export default DrawingScreen;
