// src/screens/DrawingScreen.tsx
import React, { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { DrawingCanvas } from '../components/drawing/DrawingCanvas';
import { DrawingTools } from '../components/drawing/DrawingTools';
import { DrawingHeader } from '../components/drawing/DrawingHeader';
import { useDrawing } from '../hooks/useDrawing';
//import { DrawingTool } from '../types/drawing';

type DrawingScreenRouteProp = RouteProp<RootStackParamList, 'Drawing'>;
export const DrawingScreen = () => {
  const route = useRoute<DrawingScreenRouteProp>();
  const [isToolsVisible, setIsToolsVisible] = useState(false);
  
  const { 
    currentTool,
    currentColor,
    canvasSize,
    setTool,
    setColor,
    setSize,
    saveDrawing 
  } = useDrawing();

  // Now route.params.imageUri is properly typed
  const imageUri = route.params?.imageUri;

  return (
    <SafeAreaView style={styles.container}>
      <DrawingHeader 
        onShowTools={() => setIsToolsVisible(true)}
        onSave={saveDrawing}
      />
      
      <DrawingCanvas
        tool={currentTool}
        color={currentColor}
        strokeWidth={canvasSize}
        backgroundImage={imageUri}  // Pass the image URI if needed
      />

      {isToolsVisible && (
        <DrawingTools
          selectedTool={currentTool}
          selectedColor={currentColor}
          strokeWidth={canvasSize}
          onToolChange={setTool}
          onColorChange={setColor}
          onStrokeWidthChange={setSize}
          onClose={() => setIsToolsVisible(false)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  canvas: {
    flex: 1,
  },
});

export default DrawingScreen;