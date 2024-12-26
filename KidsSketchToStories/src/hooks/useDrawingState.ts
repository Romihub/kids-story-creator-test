// src/hooks/useDrawingState.ts
import { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';

interface Point {
  x: number;
  y: number;
}

interface StartPathParams {
  x: number;
  y: number;
  color: string;
  size: number;
  tool: string;
}

interface PathData {
  data: string;
  color: string;
  size: number;
  tool: string;
}

export const useDrawingState = () => {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [currentPath, setCurrentPath] = useState<PathData | null>(null);
  const [undoStack, setUndoStack] = useState<PathData[]>([]);

  const startPath = useCallback(
    ({ x, y, color, size, tool }: StartPathParams) => {
      const newPath = {
        data: `M ${x} ${y}`,
        color,
        size,
        tool,
      };
      setCurrentPath(newPath);
    },
    []
  );

  const addPoint = useCallback(
    ({ x, y }: Point) => {
      if (currentPath) {
        setCurrentPath({
          ...currentPath,
          data: `${currentPath.data} L ${x} ${y}`,
        });
      }
    },
    [currentPath]
  );

  const endPath = useCallback(() => {
    if (currentPath) {
      setPaths((prev) => [...prev, currentPath]);
      setCurrentPath(null);
      setUndoStack([]);
    }
  }, [currentPath]);

  const undo = useCallback(() => {
    if (paths.length > 0) {
      const newPaths = [...paths];
      const removedPath = newPaths.pop()!;
      setPaths(newPaths);
      setUndoStack((prev) => [...prev, removedPath]);
    }
  }, [paths]);

  const redo = useCallback(() => {
    if (undoStack.length > 0) {
      const newUndoStack = [...undoStack];
      const pathToRestore = newUndoStack.pop()!;
      setUndoStack(newUndoStack);
      setPaths((prev) => [...prev, pathToRestore]);
    }
  }, [undoStack]);

  const clear = useCallback(() => {
    setPaths([]);
    setCurrentPath(null);
    setUndoStack([]);
  }, []);

  return {
    paths,
    currentPath,
    startPath,
    addPoint,
    endPath,
    undo,
    redo,
    clear,
  };
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