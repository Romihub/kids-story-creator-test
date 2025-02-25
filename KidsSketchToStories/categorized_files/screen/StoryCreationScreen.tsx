// src/screens/StoryCreationScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StoryCoverCustomization } from '../components/story/StoryCoverCustomization';
import { useStory } from '../hooks/useStory';
import { LoadingOverlay } from '../components/common/LoadingOverlay';
import { NavigationProps } from '../types/navigation';
import { CreateStoryInput } from '../types/story';
import { RootStackParamList } from '../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const StoryCreationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { createStory } = useStory();
  const [loading, setLoading] = useState(false);

  const handleCoverSave = async (coverDetails: {
    title: string;
    authorName?: string;
    userPhoto?: string;
  }) => {
    try {
      setLoading(true);
      
      // Create story with cover details
      const storyInput: CreateStoryInput = {
        title: coverDetails.title,
        authorName: coverDetails.authorName,
        coverPhoto: coverDetails.userPhoto,
      };

      const story = await createStory(storyInput);
      if (!story) throw new Error('Failed to create story');

      // Navigate to drawing or next step
      navigation.navigate('Drawing', { id: story.id });
    } catch (error) {
      console.error('Failed to create story:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StoryCoverCustomization onSave={handleCoverSave} />
      </ScrollView>

      {loading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
});