// src/store/slices/drawingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DrawingTool, DrawingPath } from '../../types/drawing';

interface DrawingState {
  paths: DrawingPath[];
  currentColor: string;
  strokeWidth: number;
  tool: DrawingTool;
}

const initialState: DrawingState = {
  paths: [],
  currentColor: '#000000',
  strokeWidth: 3,
  tool: 'pencil',
};

const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {
    addPath: (state, action: PayloadAction<DrawingPath>) => {
      state.paths.push(action.payload);
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
    },
  },
});

export const { 
  addPath, 
  setColor, 
  setStrokeWidth, 
  setTool, 
  clearDrawing 
} = drawingSlice.actions;

export default drawingSlice.reducer;