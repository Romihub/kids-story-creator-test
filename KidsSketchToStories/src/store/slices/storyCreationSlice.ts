import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StorySettings {
  ageGroup: string;
  theme: string;
  storyLength: 'short' | 'medium' | 'long';
  gender: 'boy' | 'girl' | null;
  author: string;
  coverImage: string | null;
}

export interface DrawingState {
  imageUri: string | null;
  drawingId: string | null;
  source: 'draw' | 'upload' | 'camera' | 'gallery' | null;
  paths: any[]; // Drawing paths if using react-native-svg
}

interface StoryCreationState {
  currentStep: 'drawing' | 'customize' | 'generate' | null;
  drawing: DrawingState;
  settings: StorySettings;
  storyId: string | null;
  isGenerating: boolean;
  error: string | null;
}

const initialState: StoryCreationState = {
  currentStep: null,
  drawing: {
    imageUri: null,
    drawingId: null,
    source: null,
    paths: [],
  },
  settings: {
    ageGroup: '5-8',
    theme: 'adventure',
    storyLength: 'medium',
    gender: null,
    author: '',
    coverImage: null,
  },
  storyId: null,
  isGenerating: false,
  error: null,
};

const storyCreationSlice = createSlice({
  name: 'storyCreation',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<StoryCreationState['currentStep']>) => {
      state.currentStep = action.payload;
    },
    setDrawingState: (state, action: PayloadAction<Partial<DrawingState>>) => {
      state.drawing = { ...state.drawing, ...action.payload };
    },
    setDrawingPaths: (state, action: PayloadAction<any[]>) => {
      state.drawing.paths = action.payload;
    },
    setSettings: (state, action: PayloadAction<Partial<StorySettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setStoryId: (state, action: PayloadAction<string | null>) => {
      state.storyId = action.payload;
    },
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetStoryCreation: (state) => {
      return initialState;
    },
    resetDrawing: (state) => {
      state.drawing = initialState.drawing;
    },
    resetSettings: (state) => {
      state.settings = initialState.settings;
    },
  },
});

export const {
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
} = storyCreationSlice.actions;

export default storyCreationSlice.reducer;
