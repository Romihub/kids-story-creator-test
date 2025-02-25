import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { colors, spacing } from '../themes/theme';
import { HeroSection } from '../components/home/HeroSection';
import { StoryHighlights } from '../components/home/StoryHighlights';
import { CreationOptions } from '../components/home/CreationOptions';
import { WordExplorerCard } from '../components/home/WordExplorerCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { TabParamList } from '../types/navigation';

type HomeScreenRouteProp = RouteProp<TabParamList, 'Home'>;

export const HomeScreen = () => {
  const route = useRoute<HomeScreenRouteProp>();
  const storySettings = route.params?.storySettings;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />
        
        <View style={styles.section}>
          <StoryHighlights />
        </View>

        <WordExplorerCard />
        
        <View style={[styles.section, styles.creationSection]}>
          <CreationOptions />
        </View>

        {storySettings && (
          <View style={[styles.section, styles.selectedImageSection]}>
            {storySettings.coverImage && (
              <Image 
                source={{ uri: storySettings.coverImage }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  creationSection: {
    marginTop: spacing.md,
  },
  selectedImageSection: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    padding: spacing.lg,
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderRadius: spacing.md,
  },
});

export default HomeScreen;
