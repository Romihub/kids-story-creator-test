// src/components/story/StoryEnhancements.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSubscription } from '../../hooks/useSubscription';
import { AudioNarration } from './AudioNarration';
import { CharacterCustomizer } from './CharacterCustomizer';
import { PDFDownloader } from './PDFDownloader';
import { AnimationControls } from './AnimationControls';

interface StoryEnhancementsProps {
  storyId: string;
}

export const StoryEnhancements: React.FC<StoryEnhancementsProps> = ({ storyId }) => {
  const { tier } = useSubscription();

  // Premium features
  const features = {
    audioNarration: tier.id !== 'free',
    customCharacters: tier.id === 'professional',
    downloadPDF: tier.id !== 'free',
    animations: tier.id !== 'free',
  };

  return (
    <View style={styles.container}>
      {features.audioNarration && <AudioNarration storyId={storyId} />}
      {features.customCharacters && <CharacterCustomizer storyId={storyId} />}
      {features.downloadPDF && <PDFDownloader storyId={storyId} />}
      {features.animations && <AnimationControls storyId={storyId} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});