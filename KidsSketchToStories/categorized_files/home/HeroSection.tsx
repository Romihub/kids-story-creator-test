import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import { Button } from '../shared/Button';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const HeroSection = () => {
  const navigation = useNavigation<NavigationProps>();
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.heroContent}>
        <View style={styles.illustrationContainer}>
          {/* Drawing Canvas */}
          <View style={styles.canvas}>
            <MaterialCommunityIcons name="pencil-outline" size={32} color={colors.primary} />
            <MaterialCommunityIcons name="brush-variant" size={32} color={colors.secondary} />
            <MaterialCommunityIcons name="eraser" size={32} color={colors.text.secondary} />
          </View>
          
          {/* Magic Sparkles */}
          <Animated.View
            style={[
              styles.sparkles,
              {
                transform: [{
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2],
                  }),
                }],
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ]}
          >
            <MaterialCommunityIcons name="star" size={24} color={colors.accent} />
            <MaterialCommunityIcons name="star" size={24} color={colors.primary} />
            <MaterialCommunityIcons name="star" size={24} color={colors.secondary} />
          </Animated.View>

          {/* Story Book */}
          <View style={styles.book}>
            <MaterialCommunityIcons name="book-open-variant" size={48} color={colors.primary} />
            <View style={styles.bookLines}>
              <View style={styles.bookLine} />
              <View style={styles.bookLine} />
              <View style={styles.bookLine} />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Welcome to StoryDoodle!</Text>
        <Text style={styles.subtitle}>
          Turn your drawings into magical stories with AI
        </Text>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="pencil-outline" size={32} color={colors.primary} />
            <Text style={styles.featureText}>Draw</Text>
          </View>
          <MaterialCommunityIcons 
            name="arrow-right" 
            size={24} 
            color={colors.text.secondary}
            style={styles.arrow}
          />
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="auto-fix" size={32} color={colors.primary} />
            <Text style={styles.featureText}>Magic</Text>
          </View>
          <MaterialCommunityIcons 
            name="arrow-right" 
            size={24} 
            color={colors.text.secondary}
            style={styles.arrow}
          />
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="book-open-variant" size={32} color={colors.primary} />
            <Text style={styles.featureText}>Read</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <Button
            title="Start Drawing"
            variant="primary"
            size="large"
            icon="pencil"
            onPress={() => navigation.navigate('Auth', { screen: 'SignUp', params: { plan: undefined } })}
            style={styles.button}
          />
          <Button
            title="Sign In"
            variant="outline"
            size="large"
            icon="login"
            onPress={() => navigation.navigate('Auth', { screen: 'SignIn' })}
            style={styles.button}
          />
        </View>
      </View>

      <View style={styles.decorations}>
        <View style={[styles.decoration, styles.decoration1]} />
        <View style={[styles.decoration, styles.decoration2]} />
        <View style={[styles.decoration, styles.decoration3]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  heroContent: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  illustrationContainer: {
    height: 250,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  canvas: {
    width: 120,
    height: 160,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
    padding: spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sparkles: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    flexDirection: 'row',
    gap: spacing.sm,
    transform: [{ translateX: -36 }, { translateY: -12 }],
  },
  book: {
    width: 120,
    height: 160,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookLines: {
    marginTop: spacing.md,
    width: '80%',
  },
  bookLine: {
    height: 2,
    backgroundColor: colors.text.disabled,
    marginVertical: spacing.xs,
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
    marginBottom: spacing.xl,
  },
  features: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  featureText: {
    ...typography.body2,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  arrow: {
    marginHorizontal: spacing.sm,
  },
  buttons: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
  decorations: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  decoration: {
    position: 'absolute',
    backgroundColor: colors.primary,
    opacity: 0.1,
    borderRadius: borderRadius.round,
  },
  decoration1: {
    width: 200,
    height: 200,
    top: -100,
    right: -50,
    transform: [{ rotate: '30deg' }],
  },
  decoration2: {
    width: 150,
    height: 150,
    bottom: -50,
    left: -30,
    transform: [{ rotate: '-15deg' }],
  },
  decoration3: {
    width: 100,
    height: 100,
    top: '50%',
    right: -20,
    transform: [{ rotate: '45deg' }],
  },
});

export default HeroSection;
