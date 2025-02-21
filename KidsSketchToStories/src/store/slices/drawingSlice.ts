// src/store/slices/drawingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DrawingTool, DrawingPath } from '../../types/drawing';

interface DrawingState {
  paths: DrawingPath[];
  currentColor: string;
  strokeWidth: number;
  tool: DrawingTool;
  redoStack: DrawingPath[];
}

const initialState: DrawingState = {
  paths: [],
  currentColor: '#000000',
  strokeWidth: 3,
  tool: 'pencil',
  redoStack: [],
};

const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {
    addPath: (state, action: PayloadAction<DrawingPath>) => {
      state.paths.push(action.payload);
      state.redoStack = []; // Clear redo stack when new path is added
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.currentColor = action.payload;
    },
    setStrokeWidth: (state, action: PayloadAction<number>) => {
      state.strokeWidth = action.payload;
    },
    setTool: (state, action: PayloadAction<DrawingTool>) => {
      state.tool = action.payload;
    },
    clearDrawing: (state) => {
      state.paths = [];
      state.redoStack = [];
    },
    undo: (state) => {
      if (state.paths.length > 0) {
        const lastPath = state.paths[state.paths.length - 1];
        state.redoStack.push(lastPath);
        state.paths.pop();
      }
    },
    redo: (state) => {
      if (state.redoStack.length > 0) {
        const pathToRestore = state.redoStack[state.redoStack.length - 1];
        state.paths.push(pathToRestore);
        state.redoStack.pop();
      }
    }
  },
});

export const { 
  addPath, 
  setColor, 
  setStrokeWidth, 
  setTool, 
  clearDrawing,
  undo,
  redo
} = drawingSlice.actions;

// Selectors
export const selectHasUndo = (state: { drawing: DrawingState }) => state.drawing.paths.length > 0;
export const selectHasRedo = (state: { drawing: DrawingState }) => state.drawing.redoStack.length > 0;
export const selectCurrentTool = (state: { drawing: DrawingState }) => state.drawing.tool;
export const selectCurrentColor = (state: { drawing: DrawingState }) => state.drawing.currentColor;
export const selectStrokeWidth = (state: { drawing: DrawingState }) => state.drawing.strokeWidth;

export default drawingSlice.reducer;
