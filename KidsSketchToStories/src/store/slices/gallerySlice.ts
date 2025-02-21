import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DrawingPath } from '../../types/drawing';
import { drawingsApi } from '../../services/api';
import type { RootState } from '../types';

export interface SavedDrawing {
  id: string;
  paths: DrawingPath[];
  color: string;
  strokeWidth: number;
  tool: string;
  timestamp: string;
  thumbnailUrl?: string;
}

interface GalleryState {
  drawings: SavedDrawing[];
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  drawings: [],
  loading: false,
  error: null
};

// Async thunks for AsyncStorage integration
export const saveDrawingToGallery = createAsyncThunk(
  'gallery/saveDrawing',
  async (drawing: Omit<SavedDrawing, 'id'>, { rejectWithValue }) => {
    console.log('saveDrawingToGallery thunk called with:', { 
      pathCount: drawing.paths.length,
      color: drawing.color,
      tool: drawing.tool
    });
    try {
      console.log('Calling drawingsApi.createDrawing');
      const savedDrawing = await drawingsApi.createDrawing(drawing);
      console.log('Drawing saved successfully:', savedDrawing);
      return savedDrawing;
    } catch (error) {
      console.error('Error saving drawing:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to save drawing');
    }
  }
);

export const deleteDrawing = createAsyncThunk(
  'gallery/deleteDrawing',
  async (drawingId: string, { rejectWithValue }) => {
    try {
      await drawingsApi.deleteDrawing(drawingId);
      return drawingId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete drawing');
    }
  }
);

export const fetchGallery = createAsyncThunk(
  'gallery/fetchDrawings',
  async (_, { rejectWithValue }) => {
    try {
      const drawings = await drawingsApi.getDrawings();
      return drawings;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch drawings');
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearGallery: (state) => {
      state.drawings = [];
      state.error = null;
    },
    removeDrawing: (state, action: PayloadAction<string>) => {
      state.drawings = state.drawings.filter(drawing => drawing.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Save Drawing
      .addCase(saveDrawingToGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDrawingToGallery.fulfilled, (state, action) => {
        state.drawings.push(action.payload);
        state.loading = false;
      })
      .addCase(saveDrawingToGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save drawing';
      })
      // Fetch Gallery
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.drawings = action.payload;
        state.loading = false;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drawings';
      })
      // Delete Drawing
      .addCase(deleteDrawing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDrawing.fulfilled, (state, action) => {
        state.drawings = state.drawings.filter(drawing => drawing.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteDrawing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete drawing';
      });
  },
});

export const { clearGallery, removeDrawing } = gallerySlice.actions;


export const selectGalleryDrawings = (state: RootState) => state.gallery.drawings;
export const selectGalleryLoading = (state: RootState) => state.gallery.loading;
export const selectGalleryError = (state: RootState) => state.gallery.error;

export default gallerySlice.reducer;
