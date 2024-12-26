// src/components/drawing/DrawingCanvas.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
//import Svg, { Path, G } from 'react-native-svg';
import Svg, { Path, G, Image } from 'react-native-svg';
import { useDrawingState } from '../../hooks/useDrawingState';
import type { StrokeData } from '../../types/collaboration';


interface DrawingCanvasProps {
  tool: string;
  color: string;
  //size: number;
  strokeWidth: number;
  backgroundImage?: string;  // Add this line
  strokes?: StrokeData[];
  onStroke?: (stroke: StrokeData) => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  tool,
  color,
  //size,
  strokeWidth,
  backgroundImage,  // Add this line
  strokes,
  onStroke,
  onUndo,
  onRedo,
}) => {
  const {
    paths,
    currentPath,
    addPoint,
    startPath,
    endPath,
    undo,
    redo,
    clear
  } = useDrawingState();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => {
        const { locationX, locationY } = event.nativeEvent;
        startPath({ x: locationX, y: locationY, tool, color, size: strokeWidth });
      },
      onPanResponderMove: (event) => {
        const { locationX, locationY } = event.nativeEvent;
        addPoint({ x: locationX, y: locationY });
      },
      onPanResponderRelease: () => {
        endPath();
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg style={styles.canvas}>
        <G>
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path.data}
              stroke={path.color}
              strokeWidth={path.size}
              fill="none"
            />
          ))}
          {currentPath && (
            <Path
              d={currentPath.data}
              stroke={currentPath.color}
              strokeWidth={currentPath.size}
              fill="none"
            />
          )}
        </G>
      </Svg>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  canvas: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawingArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  control: {
    padding: 10,
    margin: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlIcon: {
    width: 24,
    height: 24,
  },
});

export default DrawingCanvas;