// src/hooks/useDrawingState.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { DrawingPath, Point, PathConfig, DrawingTool } from '../types/drawing';

interface PathStyle {
  smoothing: number;
  pressureMultiplier: number;
  taperedEnds: boolean;
  minWidth: number;
  maxWidth: number;
}

const TOOL_STYLES: Record<DrawingTool, PathStyle> = {
  pencil: {
    smoothing: 0.4,
    pressureMultiplier: 1.2,
    taperedEnds: true,
    minWidth: 0.5,
    maxWidth: 2.0
  },
  crayon: {
    smoothing: 0.2,
    pressureMultiplier: 1.8,
    taperedEnds: false,
    minWidth: 1.0,
    maxWidth: 3.0
  },
  marker: {
    smoothing: 0.5,
    pressureMultiplier: 2.2,
    taperedEnds: false,
    minWidth: 2.0,
    maxWidth: 4.0
  },
  pen: {
    smoothing: 0.45,
    pressureMultiplier: 1.5,
    taperedEnds: true,
    minWidth: 0.8,
    maxWidth: 2.5
  },
  highlight: {
    smoothing: 0.6,
    pressureMultiplier: 2.5,
    taperedEnds: false,
    minWidth: 3.0,
    maxWidth: 6.0
  },
  eraser: {
    smoothing: 0.3,
    pressureMultiplier: 2.0,
    taperedEnds: false,
    minWidth: 2.0,
    maxWidth: 4.0
  },
};

const createPath = (points: Point[]): string => {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const { x, y } = points[0];
    return `M${x} ${y}`;
  }
  const start = points[0];
  let pathData = `M${start.x} ${start.y}`;
  
  for (let i = 1; i < points.length; i++) {
    const { x, y } = points[i];
    pathData += ` L${x} ${y}`;
  }
  return pathData;
};

export const useDrawingState = () => {
  const [paths, setPaths] = useState<DrawingPath[]>([]);
  const [currentPath, setCurrentPath] = useState<DrawingPath | null>(null);
  const [redoStack, setRedoStack] = useState<DrawingPath[]>([]);
  const [hasUndo, setHasUndo] = useState(false);
  const [hasRedo, setHasRedo] = useState(false);
  const lastPoint = useRef<Point | null>(null);

  useEffect(() => {
    setHasUndo(paths.length > 0);
    setHasRedo(redoStack.length > 0);
  }, [paths, redoStack]);

  const startPath = useCallback(({ x, y, tool, color, strokeWidth }: PathConfig) => {
    const point = { x, y };
    const style = TOOL_STYLES[tool];
    const newPath: DrawingPath = {
      tool,
      color,
      strokeWidth: strokeWidth * style.pressureMultiplier,
      points: [point],
      data: `M${x} ${y}`
    };
    setCurrentPath(newPath);
    lastPoint.current = point;
    setRedoStack([]);
  }, []);

  const addPoint = useCallback((point: Point) => {
    if (!currentPath || !lastPoint.current) return;

    // Calculate line segment
    const segmentData = ` L${point.x} ${point.y}`;
    
    setCurrentPath(prev => {
      if (!prev) return null;
      return {
        ...prev,
        points: [...prev.points, point],
        data: prev.data + segmentData
      };
    });
    
    lastPoint.current = point;
  }, [currentPath]);

  const endPath = useCallback(() => {
    if (!currentPath) return;
    setPaths(prev => [...prev, currentPath]);
    setCurrentPath(null);
    lastPoint.current = null;
  }, [currentPath]);

  const undo = useCallback(() => {
    setPaths(prev => {
      if (prev.length === 0) return prev;
      
      // Get the path to remove
      const removedPath = prev[prev.length - 1];
      const newPaths = prev.slice(0, -1);
      
      // Add to redo stack with all necessary data
      setRedoStack(redo => [{
        ...removedPath,
        points: [...removedPath.points],
        data: createPath(removedPath.points),
        timestamp: Date.now()
      }, ...redo]);

      // Return remaining paths with their data intact
      return newPaths.map(path => ({
        ...path,
        points: [...path.points],
        data: createPath(path.points),
        timestamp: path.timestamp || Date.now()
      }));
    });
  }, []);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    
    // Get the path to restore
    const pathToRestore = redoStack[0];
    
    // Ensure we have a complete path with all necessary data
    const restoredPath = {
      ...pathToRestore,
      points: [...pathToRestore.points],
      data: createPath(pathToRestore.points),
      timestamp: Date.now()
    };
    
    setRedoStack(prev => prev.slice(1));
    setPaths(prev => [...prev, restoredPath]);
  }, [redoStack]);

  const clear = useCallback(() => {
    // Store current paths in redo stack before clearing
    setPaths(prev => {
      if (prev.length > 0) {
        setRedoStack(redo => [
          ...prev.map(path => ({
            ...path,
            points: [...path.points],
            data: createPath(path.points),
            timestamp: path.timestamp || Date.now()
          })),
          ...redo
        ]);
      }
      return [];
    });
    setCurrentPath(null);
    lastPoint.current = null;
  }, []);

  // Return both the completed paths and current path for rendering
  const allPaths = currentPath ? [...paths, currentPath] : paths;

  return {
    paths: allPaths, // Return all paths including current path
    startPath,
    addPoint,
    endPath,
    undo,
    redo,
    clear,
    hasUndo,
    hasRedo
  };
};
