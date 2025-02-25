// src/components/drawing/DrawingCanvas.tsx
import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView,
  State as GestureState,
} from 'react-native-gesture-handler';
import type { DrawingTool, Point, DrawingPath } from '../../types/drawing';

interface DrawingCanvasProps {
  tool: DrawingTool;
  color: string;
  strokeWidth: number;
  backgroundImage?: string;
  paths: DrawingPath[];
  onStrokeStart: (point: Point) => void;
  onStrokeMove: (point: Point, pressure?: number) => void;
  onStrokeEnd: () => void;
  disabled?: boolean;
}

const isGradient = (color: string) => color.startsWith('linear-gradient');

const parseGradient = (gradientString: string) => {
  const matches = gradientString.match(/#[A-Fa-f0-9]{6}/g);
  return matches || ['#000000'];
};

const getToolStyles = (tool: DrawingTool, color: string, width: number, pathId?: string) => {
  const baseWidth = Math.max(0.5, Math.min(width, 12));
  
  const toolConfigs = {
    pencil: {
      stroke: color,
      strokeWidth: baseWidth * 1.0,
      strokeOpacity: 0.9,
    },
    crayon: {
      stroke: color,
      strokeWidth: baseWidth * 1.5,
      strokeOpacity: 0.7,
      strokeDasharray: [2, 2],
    },
    marker: {
      stroke: color,
      strokeWidth: baseWidth * 2.0,
      strokeOpacity: 0.6,
    },
    pen: {
      stroke: color,
      strokeWidth: baseWidth * 1.2,
      strokeOpacity: 1,
    },
    highlight: {
      stroke: color,
      strokeWidth: baseWidth * 2.5,
      strokeOpacity: 0.3,
    },
    eraser: {
      stroke: '#FFFFFF',
      strokeWidth: baseWidth * 2.0,
      strokeOpacity: 1,
    },
  };

  const styles = {
    ...toolConfigs[tool],
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  if (isGradient(color) && pathId) {
    styles.stroke = `url(#gradient-${pathId})`;
  }

  return styles;
};

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  tool,
  color,
  strokeWidth,
  backgroundImage,
  paths,
  onStrokeStart,
  onStrokeMove,
  onStrokeEnd,
  disabled = false,
}) => {
  const [currentLine, setCurrentLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);

  const handleGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
    const { x, y, state } = event.nativeEvent;
    const point = { x, y };

    switch (state) {
      case GestureState.BEGAN:
        isDrawingRef.current = true;
        lastPointRef.current = point;
        setCurrentLine(null);
        onStrokeStart(point);
        break;

      case GestureState.ACTIVE:
        if (isDrawingRef.current && lastPointRef.current) {
          // Update the current line for immediate visual feedback
          setCurrentLine({
            x1: lastPointRef.current.x,
            y1: lastPointRef.current.y,
            x2: x,
            y2: y,
          });
          onStrokeMove(point);
        }
        lastPointRef.current = point;
        break;

      case GestureState.END:
      case GestureState.CANCELLED:
        if (isDrawingRef.current) {
          isDrawingRef.current = false;
          lastPointRef.current = null;
          setCurrentLine(null);
          onStrokeEnd();
        }
        break;
    }
  }, [onStrokeStart, onStrokeMove, onStrokeEnd]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container} collapsable={false}>
        <View style={[StyleSheet.absoluteFill]}>
          <Svg style={StyleSheet.absoluteFill}>
            <Defs>
              {paths.map((path, index) => (
                isGradient(path.color) && (
                  <LinearGradient 
                    key={`gradient-${index}`}
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    {parseGradient(path.color).map((color, i, colors) => (
                      <Stop
                        key={`stop-${i}`}
                        offset={`${(i / (colors.length - 1)) * 100}%`}
                        stopColor={color}
                      />
                    ))}
                  </LinearGradient>
                )
              ))}
            </Defs>
            <G>
              {/* Render completed paths */}
              {paths.map((path, index) => (
                <Path
                  key={`path-${index}`}
                  d={path.data}
                  {...getToolStyles(path.tool, path.color, path.strokeWidth, index.toString())}
                />
              ))}
              
              {/* Render current line for immediate feedback */}
              {currentLine && (
                <Line
                  x1={currentLine.x1}
                  y1={currentLine.y1}
                  x2={currentLine.x2}
                  y2={currentLine.y2}
                  {...getToolStyles(tool, color, strokeWidth)}
                />
              )}
            </G>
          </Svg>
        </View>
        
        {!disabled && (
          <PanGestureHandler
            onGestureEvent={handleGestureEvent}
            onHandlerStateChange={handleGestureEvent}
            minDist={0}
            avgTouches={false}
            maxPointers={1}
          >
            <View style={StyleSheet.absoluteFill} />
          </PanGestureHandler>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default DrawingCanvas;
