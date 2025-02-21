import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SavedDrawing } from '../types/drawing';

import { STORAGE_KEYS } from '../config/api';

export const drawingsApi = {
  // Create a new drawing
  createDrawing: async (drawing: Omit<SavedDrawing, 'id'>): Promise<SavedDrawing> => {
    try {
      // Get existing drawings
      const existingDrawingsStr = await AsyncStorage.getItem(STORAGE_KEYS.DRAWINGS);
      const existingDrawings: SavedDrawing[] = existingDrawingsStr ? JSON.parse(existingDrawingsStr) : [];

      // Create new drawing with unique ID
      const newDrawing: SavedDrawing = {
        ...drawing,
        id: Date.now().toString(), // Simple unique ID generation
      };

      // Add to existing drawings
      const updatedDrawings = [...existingDrawings, newDrawing];
      await AsyncStorage.setItem(STORAGE_KEYS.DRAWINGS, JSON.stringify(updatedDrawings));

      return newDrawing;
    } catch (error) {
      console.error('Error saving drawing:', error);
      throw new Error('Failed to save drawing');
    }
  },

  // Get all drawings
  getDrawings: async (): Promise<SavedDrawing[]> => {
    try {
      const drawingsStr = await AsyncStorage.getItem(STORAGE_KEYS.DRAWINGS);
      return drawingsStr ? JSON.parse(drawingsStr) : [];
    } catch (error) {
      console.error('Error getting drawings:', error);
      throw new Error('Failed to get drawings');
    }
  },

  // Get a specific drawing
  getDrawing: async (id: string): Promise<SavedDrawing | null> => {
    try {
      const drawingsStr = await AsyncStorage.getItem(STORAGE_KEYS.DRAWINGS);
      const drawings: SavedDrawing[] = drawingsStr ? JSON.parse(drawingsStr) : [];
      return drawings.find(d => d.id === id) || null;
    } catch (error) {
      console.error('Error getting drawing:', error);
      throw new Error('Failed to get drawing');
    }
  },

  // Update a drawing
  updateDrawing: async (id: string, drawing: Omit<SavedDrawing, 'id'>): Promise<SavedDrawing> => {
    try {
      const drawingsStr = await AsyncStorage.getItem(STORAGE_KEYS.DRAWINGS);
      const drawings: SavedDrawing[] = drawingsStr ? JSON.parse(drawingsStr) : [];
      
      const updatedDrawings = drawings.map(d => 
        d.id === id ? { ...drawing, id } : d
      );
      
      await AsyncStorage.setItem(STORAGE_KEYS.DRAWINGS, JSON.stringify(updatedDrawings));
      
      const updatedDrawing = updatedDrawings.find(d => d.id === id);
      if (!updatedDrawing) throw new Error('Drawing not found');
      
      return updatedDrawing;
    } catch (error) {
      console.error('Error updating drawing:', error);
      throw new Error('Failed to update drawing');
    }
  },

  // Delete a drawing
  deleteDrawing: async (id: string): Promise<void> => {
    try {
      const drawingsStr = await AsyncStorage.getItem(STORAGE_KEYS.DRAWINGS);
      const drawings: SavedDrawing[] = drawingsStr ? JSON.parse(drawingsStr) : [];
      
      const updatedDrawings = drawings.filter(d => d.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.DRAWINGS, JSON.stringify(updatedDrawings));
    } catch (error) {
      console.error('Error deleting drawing:', error);
      throw new Error('Failed to delete drawing');
    }
  },
};

export default drawingsApi;
