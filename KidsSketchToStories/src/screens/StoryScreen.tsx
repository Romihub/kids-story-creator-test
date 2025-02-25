import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../themes/theme';
import { Button } from '../components/shared/Button';
import { RootStackParamList, NavigationProps } from '../types/navigation';
import { useStoryCreation } from '../hooks/useStoryCreation';
import { useAppSelector } from '../store/hooks';
import { selectUserSubscription } from '../store/slices/subscriptionSlice';

type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;

const MAX_REGENERATIONS = 2;

export const StoryScreen = () => {
  const route = useRoute<StoryScreenRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const { drawing, settings } = useStoryCreation();
  const subscription = useAppSelector(selectUserSubscription);
  const isPro = subscription?.type === 'pro';

  const [isLoading, setIsLoading] = useState(true);
  const [regenerationsLeft, setRegenerationsLeft] = useState(MAX_REGENERATIONS);
  const [story, setStory] = useState<{
    title: string;
    content: string;
    imageUrl?: string;
  } | null>(null);

  useEffect(() => {
    const loadStory = async () => {
      setIsLoading(true);
      try {
        // TODO: Implement API call to fetch story
        // For now, use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStory({
          title: 'The Magical Adventure',
          content: 'Once upon a time, in a land far away...\n\nA brave young hero embarked on an incredible journey...\n\nAlong the way, they discovered the true meaning of courage and friendship...',
          imageUrl: drawing.imageUri || undefined,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load story';
        Alert.alert('Error', message);
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    };

    loadStory();
  }, [route.params.id, drawing.imageUri, navigation]);

  const handleShare = async () => {
    if (!story) return;

    try {
      await Share.share({
        title: story.title,
        message: `Check out my story: ${story.title}\n\n${story.content}`,
      });
    } catch (error) {
      console.error('Error sharing story:', error);
    }
  };

  const handleRegenerate = async () => {
    if (!isPro) {
      Alert.alert(
        'Premium Feature',
        'Story regeneration is only available for premium users. Upgrade to premium to access this feature!',
        [
          { text: 'Maybe Later', style: 'cancel' },
          { text: 'Upgrade Now', onPress: () => navigation.navigate('Subscription') }
        ]
      );
      return;
    }

    if (regenerationsLeft <= 0) {
      Alert.alert(
        'Limit Reached',
        'You have used all your story regenerations for this drawing.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement API call to regenerate story
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStory({
        title: 'The New Adventure',
        content: 'In a magical realm not far from here...\n\nA curious soul set out on a wonderful quest...\n\nThrough challenges and triumphs, they learned valuable lessons about bravery and determination...',
        imageUrl: drawing.imageUri || undefined,
      });
      setRegenerationsLeft(prev => prev - 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to regenerate story';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!story) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Failed to load story</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Story Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{story.title}</Text>
            {settings.author && (
              <Text style={styles.author}>By {settings.author}</Text>
            )}
          </View>

          {/* Cover Image */}
          {(settings.coverImage || story.imageUrl) && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: settings.coverImage || story.imageUrl }}
                style={styles.coverImage}
              />
            </View>
          )}

          {/* Story Content */}
          <View style={styles.storyContent}>
            <Text style={styles.storyText}>{story.content}</Text>
          </View>

          {/* Story Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Story Details</Text>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Age Group:</Text>
              <Text style={styles.detailValue}>{settings.ageGroup} years</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Theme:</Text>
              <Text style={styles.detailValue}>{settings.theme}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Length:</Text>
              <Text style={styles.detailValue}>
                {settings.storyLength.charAt(0).toUpperCase() + settings.storyLength.slice(1)}
              </Text>
            </View>
            {isPro && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Regenerations Left:</Text>
                <Text style={styles.detailValue}>{regenerationsLeft}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <Button
            title="Share Story"
            onPress={handleShare}
            variant="secondary"
            style={styles.shareButton}
          />
          {isPro && (
            <Button
              title={`Regenerate${regenerationsLeft > 0 ? ` (${regenerationsLeft})` : ''}`}
              onPress={handleRegenerate}
              variant="primary"
              style={styles.regenerateButton}
              disabled={regenerationsLeft <= 0}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  author: {
    ...typography.subtitle1,
    color: colors.text.secondary,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  storyContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  storyText: {
    ...typography.body1,
    color: colors.text.primary,
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  detailsTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  detailValue: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '500',
  },
  errorText: {
    ...typography.h3,
    color: colors.error.main,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  shareButton: {
    flex: 1,
  },
  regenerateButton: {
    flex: 1,
  },
});

export default StoryScreen;
