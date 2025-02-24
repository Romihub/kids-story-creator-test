// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import drawingReducer from './slices/drawingSlice';
import storyReducer from './slices/storySlice';
import userReducer from './slices/userSlice';
import galleryReducer from './slices/gallerySlice';
import authReducer from './slices/authSlice';

console.log('Initializing Redux store');
export const store = configureStore({
  reducer: {
    drawing: drawingReducer,
    story: storyReducer,
    user: userReducer,
    gallery: galleryReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Add this if you have non-serializable data
    }),
});

// Export types and hooks
export * from './types';
export * from './hooks';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
