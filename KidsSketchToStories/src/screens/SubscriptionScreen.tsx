import React, { Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../themes/theme';
import { Button } from '../components/shared/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationProps } from '../types/navigation';
import { useAppSelector } from '../store/hooks';
import { selectUserSubscription } from '../store/slices/subscriptionSlice';

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
  isPro: boolean;
};

const features: Feature[] = [
  {
    id: 'regeneration',
    title: 'Story Regeneration',
    description: 'Get 2 chances to regenerate each story until you find the perfect one',
    icon: 'refresh',
    isPro: true,
  },
  {
    id: 'longer-stories',
    title: 'Longer Stories',
    description: 'Create medium and long-length stories for more engaging content',
    icon: 'book-open-page-variant',
    isPro: true,
  },
  {
    id: 'basic-stories',
    title: 'Basic Story Creation',
    description: 'Create short stories from your drawings',
    icon: 'pencil',
    isPro: false,
  },
  {
    id: 'word-explorer',
    title: 'Word Explorer',
    description: 'Learn new words from your stories',
    icon: 'book-alphabet',
    isPro: false,
  },
];

const FeatureItem = ({ feature }: { feature: Feature }) => (
  <View style={styles.featureItem}>
    <View style={[styles.iconContainer, feature.isPro && styles.proIconContainer]}>
      <MaterialCommunityIcons
        name={feature.icon}
        size={24}
        color={feature.isPro ? colors.primary : colors.text.primary}
      />
    </View>
    <View style={styles.featureContent}>
      <View style={styles.featureHeader}>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        {feature.isPro && (
          <View style={styles.proBadge}>
            <Text style={styles.proBadgeText}>PRO</Text>
          </View>
        )}
      </View>
      <Text style={styles.featureDescription}>{feature.description}</Text>
    </View>
  </View>
);

export const SubscriptionScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const subscription = useAppSelector(selectUserSubscription);
  const isPro = subscription?.type === 'pro';

  const handleUpgrade = async () => {
    try {
      // TODO: Implement subscription purchase flow
      Alert.alert(
        'Coming Soon',
        'Subscription purchase will be available soon!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to process subscription';
      Alert.alert('Error', message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Unlock Premium Features</Text>
            <Text style={styles.subtitle}>
              Enhance your story creation experience with premium features
            </Text>
          </View>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            {features.map(feature => (
              <Fragment key={feature.id}>
                <FeatureItem feature={feature} />
              </Fragment>
            ))}
          </View>

          {/* Pricing */}
          <View style={styles.pricingContainer}>
            <Text style={styles.pricingTitle}>Premium Plan</Text>
            <Text style={styles.price}>$4.99</Text>
            <Text style={styles.period}>per month</Text>
            <Text style={styles.pricingDescription}>
              Cancel anytime. All premium features included.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {isPro ? (
          <View style={styles.alreadyPro}>
            <MaterialCommunityIcons name="check-circle" size={24} color={colors.success.main} />
            <Text style={styles.alreadyProText}>You're already a Pro member!</Text>
          </View>
        ) : (
          <Button
            title="Upgrade to Pro"
            onPress={handleUpgrade}
            variant="primary"
            style={styles.upgradeButton}
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
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  proIconContainer: {
    backgroundColor: colors.primary + '10', // 10% opacity
    borderColor: colors.primary,
  },
  featureContent: {
    flex: 1,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  featureTitle: {
    ...typography.subtitle1,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  proBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  proBadgeText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: 'bold',
  },
  featureDescription: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  pricingContainer: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  pricingTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  price: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  period: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  pricingDescription: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  upgradeButton: {
    width: '100%',
  },
  alreadyPro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success.light,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  alreadyProText: {
    ...typography.body1,
    color: colors.success.main,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
});

export default SubscriptionScreen;
