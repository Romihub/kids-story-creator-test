// src/components/profile/advanced/CreatorProfile.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CreatorStats } from './CreatorStats';
import { PortfolioGallery } from './PortfolioGallery';
import { CreatorSettings } from './CreatorSettings';
import { useCreatorProfile } from '../../../hooks/useCreatorProfile';

interface CreatorStats {
  stories: number;
  likes: number;
  rating: number;
}

interface CreatorSettings {
  watermark: boolean;
  autoPublish: boolean;
  copyright: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
}

export const CreatorProfile: React.FC = () => {
  const { stats, portfolio, settings, updateSettings, showPortfolioItem } = useCreatorProfile();

  return (
    <View style={styles.container}>
      <CreatorStats
        totalStories={stats.stories}
        totalLikes={stats.likes}
        avgRating={stats.rating}
      />
      <PortfolioGallery
        items={portfolio}
        onItemPress={showPortfolioItem}
      />
      <CreatorSettings
        watermark={settings.watermark}
        autoPublish={settings.autoPublish}
        copyrightInfo={settings.copyright}
        onUpdate={updateSettings}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
});