//src/hooks/useStory.ts
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setStories, addStory, updateStory, deleteStory, setCurrentStory } from '../store/slices/storySlice';
import type { Story, CreateStoryInput } from '../types/story';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';

export const useStory = (storyId?: string) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  
  const story = useAppSelector(state => 
    storyId 
      ? state.story.stories.find(s => s.id === storyId) 
      : state.story.currentStory
  );

  const stories = useAppSelector(state => state.story.stories);

  useEffect(() => {
    if (storyId) {
      loadStory(storyId);
    }
  }, [storyId]);

  const loadStory = async (id: string) => {
    try {
      setLoading(true);
      // For now, load from AsyncStorage. Later, this will be an API call
      const savedStories = await AsyncStorage.getItem('stories');
      if (savedStories) {
        const stories = JSON.parse(savedStories);
        const story = stories.find((s: Story) => s.id === id);
        if (story) {
          dispatch(setCurrentStory(story));
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load story');
    } finally {
      setLoading(false);
    }
  };

  const regenerateStory = async (id: string) => {
    try {
      setLoading(true);
      // This would typically call an AI service to regenerate the story
      // For now, just add a placeholder message
      const existingStory = stories.find(s => s.id === id);
      if (existingStory) {
        const updatedStory = {
          ...existingStory,
          pages: [
            ...existingStory.pages,
            {
              content: "Regenerated content will appear here...",
              updatedAt: new Date().toISOString()
            }
          ]
        };
        dispatch(updateStory(updatedStory));
        await AsyncStorage.setItem('stories', JSON.stringify(
          stories.map(s => s.id === id ? updatedStory : s)
        ));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to regenerate story');
    } finally {
      setLoading(false);
    }
  };

  const shareStory = async (id: string) => {
    try {
      const storyToShare = stories.find(s => s.id === id);
      if (!storyToShare) return;

      // Create a shareable format of the story
      const shareableContent = {
        title: storyToShare.title,
        message: storyToShare.pages.map(page => page.content).join('\n\n'),
      };

      await Share.open(shareableContent);
    } catch (error) {
      if ((error as any).message !== 'User did not share') {
        Alert.alert('Error', 'Failed to share story');
      }
    }
  };

  const createStory = async (storyData: CreateStoryInput) => {
    try {
      setLoading(true);
      const newStory: Story = {
        id: Date.now().toString(),
        title: storyData.title || 'Untitled Story',
        authorName: storyData.authorName,
        coverPhoto: storyData.coverPhoto,
        pages: storyData.pages || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ageGroup: storyData.ageGroup || '3-6',
        status: storyData.status || 'draft'
      };

      dispatch(addStory(newStory));
      await AsyncStorage.setItem('stories', JSON.stringify([...stories, newStory]));
      return newStory;
    } catch (error) {
      Alert.alert('Error', 'Failed to create story');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentStory = async (storyData: Partial<Story>) => {
    try {
      if (!story) return;

      const updatedStory = {
        ...story,
        ...storyData,
        updatedAt: new Date().toISOString()
      };

      dispatch(updateStory(updatedStory));
      await AsyncStorage.setItem('stories', JSON.stringify(
        stories.map(s => s.id === story.id ? updatedStory : s)
      ));
    } catch (error) {
      Alert.alert('Error', 'Failed to update story');
    }
  };

  const deleteCurrentStory = async () => {
    try {
      if (!story) return;

      dispatch(deleteStory(story.id));
      await AsyncStorage.setItem('stories', JSON.stringify(
        stories.filter(s => s.id !== story.id)
      ));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete story');
    }
  };

  return {
    story,
    stories,
    loading,
    createStory,
    updateCurrentStory,
    deleteCurrentStory,
    regenerateStory,
    shareStory,
  };
};