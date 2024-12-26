// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import drawingReducer from './slices/drawingSlice';
import storyReducer from './slices/storySlice';
import userReducer from './slices/userSlice';

console.log('Initializing Redux store'); // Add this
export const store = configureStore({
  reducer: {
    drawing: drawingReducer,
    story: storyReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Add this if you have non-serializable data
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for use in components
export * from './hooks';