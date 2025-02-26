// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { spacing } from '../themes/theme';
import { createBackgroundStyle, getColor } from '../themes/themeHelpers';
import { HeroSection } from '../components/home/HeroSection';
import { StoryHighlights } from '../components/home/StoryHighlights';
import { CreationOptions } from '../components/home/CreationOptions';
import { WordExplorerCard } from '../components/home/WordExplorerCard';
import { SelectedImagePreview } from '../components/home/SelectedImagePreview';
import { StoryActionButtons } from '../components/home/StoryActionButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import type { TabParamList } from '../types/navigation';
import { useAuth } from '../hooks/useAuth';
import type { StorySettings } from '../types/navigation';

type HomeScreenRouteProp = RouteProp<TabParamList, 'Home'>;

export const HomeScreen = () => {
  const route = useRoute<HomeScreenRouteProp>();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [storySettings, setStorySettings] = useState<StorySettings | null>(null);

  // Handle route parameters when navigating to this screen
  useEffect(() => {
    if (route.params?.imageUri) {
      setSelectedImage(route.params.imageUri);
    }

    if (route.params?.storySettings) {
      setStorySettings(route.params.storySettings);
    }
  }, [route.params]);

  // Reset focus handling
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Reset states when leaving screen if needed
        // setSelectedImage(null);
        // setStorySettings(null);
      };
    }, [])
  );

  // Handle selecting an image from creation options
  const handleImageSelected = (uri?: string) => {
    if (uri) {
      setSelectedImage(uri);
    }
  };

  // Handle changing the selected image
  const handleChangeImage = () => {
    setSelectedImage(null);
    setStorySettings(null); // Also reset story settings when changing image
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection onStartDrawing={handleImageSelected} />
        
        <View style={styles.highlightsWrapper}>
          <StoryHighlights />
        </View>

        <WordExplorerCard />
        
        <View style={styles.creationWrapper}>
          <CreationOptions 
            onImageSelected={handleImageSelected}
          />
        </View>

        {/* Dynamic sections that appear when an image is selected */}
        {selectedImage && (
          <>
            <View style={styles.section}>
              <SelectedImagePreview 
                imageUri={selectedImage}
                onChangeImage={handleChangeImage}
              />
            </View>
            
            <View style={styles.section}>
              <StoryActionButtons
                hasImage={!!selectedImage}
                hasStorySettings={!!storySettings}
                storySettings={storySettings}
                imageUri={selectedImage}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    ...createBackgroundStyle(getColor.background.primary()),
  },
  container: {
    flex: 1,
    ...createBackgroundStyle(getColor.background.primary()),
  },
  content: {
    paddingBottom: spacing.xl,
  },
  section: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
  },
  highlightsWrapper: {
    marginTop: spacing.lg,
    ...createBackgroundStyle(getColor.background.secondary()),
    borderRadius: spacing.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
  },
  creationWrapper: {
    marginTop: spacing.lg,
    ...createBackgroundStyle(getColor.background.tertiary()), // Using theme color instead of hardcoded
    borderRadius: spacing.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
  }
});

export default HomeScreen;
