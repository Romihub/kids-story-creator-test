//src/hooks/useGallery.ts
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drawing, Story } from '../types/gallery';

export const useGallery = () => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      setLoading(true);
      const savedDrawings = await AsyncStorage.getItem('drawings');
      const savedStories = await AsyncStorage.getItem('stories');
      
      if (savedDrawings) {
        setDrawings(JSON.parse(savedDrawings));
      }
      if (savedStories) {
        setStories(JSON.parse(savedStories));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setDrawings(prev => prev.filter(item => item.id !== id));
      setStories(prev => prev.filter(item => item.id !== id));
      
      await AsyncStorage.setItem('drawings', JSON.stringify(drawings.filter(item => item.id !== id)));
      await AsyncStorage.setItem('stories', JSON.stringify(stories.filter(item => item.id !== id)));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  return {
    drawings,
    stories,
    deleteItem,
    loading,
    refreshGallery: loadGalleryItems
  };
};