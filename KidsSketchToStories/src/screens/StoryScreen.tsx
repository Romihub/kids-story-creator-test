// src/screens/StoryScreen.tsx
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useStory } from '../hooks/useStory';
import { useRoute } from '@react-navigation/native';
import { StoryViewer } from '../components/story/StoryViewer';
import { StoryControls } from '../components/story/StoryControls';
import { useSubscription } from '../hooks/useSubscription';

export const StoryScreen = () => {
  const route = useRoute();
  const storyId = (route.params as any)?.storyId;
  const { 
    story, 
    loading, 
    updateCurrentStory, 
    regenerateStory,
    shareStory 
  } = useStory(storyId);
  const { canShare, regenerationsLeft } = useSubscription();

  if (loading || !story) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StoryViewer 
        story={story}
        onPageChange={(pageIndex) => {
          // Handle page change if needed
        }}
      />
      <StoryControls
        onRegenerate={() => regenerateStory(story.id)}
        onShare={() => shareStory(story.id)}
        onUpdate={updateCurrentStory}
        canShare={canShare}
        regenerationsLeft={regenerationsLeft}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StoryScreen;