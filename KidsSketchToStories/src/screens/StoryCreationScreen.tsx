import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../themes/theme';
import { Button } from '../components/shared/Button';
import { StoryProgressBar } from '../components/navigation/StoryProgressBar';
import { useStoryCreation } from '../hooks/useStoryCreation';
import { NavigationProps } from '../types/navigation';

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator color={colors.background} />
  </View>
);

export const StoryCreationScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const {
    drawing,
    settings,
    isGenerating,
    error,
    startGenerating,
    stopGenerating,
    setStoryError,
    handleBackNavigation,
    setStoryId,
  } = useStoryCreation();

  const [generatedStory, setGeneratedStory] = useState<string | null>(null);

  const handleGenerateStory = useCallback(async () => {
    if (!drawing.drawingId) {
      Alert.alert('Error', 'No drawing found');
      return;
    }

    startGenerating();
    setStoryError(null);

    try {
      // TODO: Implement story generation API call
      // For now, simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const storyId = 'story-' + Date.now();
      setStoryId(storyId);
      setGeneratedStory('Once upon a time...');

      navigation.navigate('Story', { id: storyId });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate story';
      setStoryError(message);
      Alert.alert('Error', message);
    } finally {
      stopGenerating();
    }
  }, [drawing.drawingId, navigation, setStoryError, setStoryId, startGenerating, stopGenerating]);

  return (
    <SafeAreaView style={styles.container}>
      <StoryProgressBar
        currentStep="generate"
        onStepPress={handleBackNavigation}
        canNavigateBack={true}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Drawing Preview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Drawing</Text>
            <View style={styles.imageContainer}>
              {drawing.imageUri ? (
                <Image source={{ uri: drawing.imageUri }} style={styles.drawingImage} />
              ) : (
                <View style={styles.drawingPlaceholder}>
                  <Text style={styles.placeholderText}>Drawing Preview</Text>
                </View>
              )}
            </View>
          </View>

          {/* Story Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Story Settings</Text>
            
            {/* Cover Image */}
            {settings.coverImage && (
              <View style={styles.settingGroup}>
                <Text style={styles.settingGroupTitle}>Cover Image</Text>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: settings.coverImage }} style={styles.coverImage} />
                </View>
              </View>
            )}

            {/* Basic Settings */}
            <View style={styles.settingGroup}>
              <Text style={styles.settingGroupTitle}>Basic Settings</Text>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Age Group:</Text>
                <Text style={styles.settingValue}>{settings.ageGroup} years</Text>
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Theme:</Text>
                <Text style={styles.settingValue}>{settings.theme}</Text>
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Length:</Text>
                <Text style={styles.settingValue}>
                  {settings.storyLength.charAt(0).toUpperCase() + settings.storyLength.slice(1)}
                </Text>
              </View>
            </View>

            {/* Optional Settings */}
            {(settings.author || settings.gender) && (
              <View style={styles.settingGroup}>
                <Text style={styles.settingGroupTitle}>Additional Settings</Text>
                {settings.author && (
                  <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Author:</Text>
                    <Text style={styles.settingValue}>{settings.author}</Text>
                  </View>
                )}
                {settings.gender && (
                  <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Main Character:</Text>
                    <Text style={styles.settingValue}>
                      {settings.gender.charAt(0).toUpperCase() + settings.gender.slice(1)}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {generatedStory && (
            <View style={styles.storyPreview}>
              <Text style={styles.previewTitle}>Story Preview</Text>
              <Text style={styles.previewText}>{generatedStory}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {isGenerating ? (
          <View style={styles.generateButton}>
            <LoadingIndicator />
            <Text style={styles.buttonText}>Generating...</Text>
          </View>
        ) : (
          <Button
            title="Generate Story"
            onPress={handleGenerateStory}
            variant="primary"
            style={styles.generateButton}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  settingGroup: {
    marginBottom: spacing.lg,
  },
  settingGroupTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: colors.background,
    ...shadows.sm,
  },
  drawingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  drawingPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  placeholderText: {
    ...typography.body1,
    color: colors.text.disabled,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabel: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  settingValue: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: colors.error.light,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  errorText: {
    ...typography.body2,
    color: colors.error.main,
  },
  storyPreview: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  previewTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  previewText: {
    ...typography.body1,
    color: colors.text.primary,
    lineHeight: 24,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  generateButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    marginRight: spacing.sm,
  },
  buttonText: {
    ...typography.button,
    color: colors.background,
    marginLeft: spacing.sm,
  },
});

export default StoryCreationScreen;
