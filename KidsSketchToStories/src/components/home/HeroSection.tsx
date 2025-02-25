import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../shared/Button';

export const HeroSection = () => {
  const navigation = useNavigation<NavigationProps>();
  const { isAuthenticated } = useAuth();
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
        <View style={styles.textContent}>
          <Text style={styles.title}>Welcome to StoryDoodle!</Text>
          <Text style={styles.subtitle}>
            Turn your drawings into magical stories with AI
          </Text>
        </View>

        <View style={styles.illustrationContainer}>
          {/* Kid Character */}
          <View style={styles.characterContainer}>
            <MaterialCommunityIcons 
              name="emoticon-excited-outline" 
              size={64} 
              color={colors.primary} 
              style={styles.character}
            />
            <MaterialCommunityIcons 
              name="pencil" 
              size={32} 
              color={colors.secondary} 
              style={styles.pencil}
            />
          </View>

          {/* Drawing Elements */}
          <View style={styles.drawingElements}>
            <MaterialCommunityIcons 
              name="palette" 
              size={32} 
              color={colors.accent} 
              style={styles.palette}
            />
            <MaterialCommunityIcons 
              name="brush" 
              size={32} 
              color={colors.secondary} 
              style={styles.brush}
            />
          </View>

          {/* Floating Elements */}
          <Animated.View
            style={[
              styles.floatingElements,
              {
                transform: [{
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                  }),
                }],
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 1],
                }),
              },
            ]}
          >
            <MaterialCommunityIcons name="star" size={24} color={colors.accent} style={styles.star1} />
            <MaterialCommunityIcons name="book-open-page-variant" size={32} color={colors.secondary} style={styles.book} />
            <MaterialCommunityIcons name="star" size={20} color={colors.primary} style={styles.star2} />
          </Animated.View>
        </View>

        <View style={styles.buttons}>
          {isAuthenticated ? (
            <Button
              title="Start Drawing"
              variant="primary"
              size="large"
              icon="pencil"
              onPress={() => navigation.navigate('Drawing', { id: 'new' })}
              style={styles.button}
            />
          ) : (
            <>
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
            </>
          )}
        </View>
      </View>

      {/* Background Decorations */}
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
  textContent: {
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
  illustrationContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
    marginBottom: spacing.xl,
  },
  characterContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -32 }],
    alignItems: 'center',
  },
  character: {
    position: 'relative',
  },
  pencil: {
    position: 'absolute',
    top: -20,
    right: -20,
    transform: [{ rotate: '45deg' }],
  },
  drawingElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  palette: {
    position: 'absolute',
    top: '30%',
    left: '20%',
  },
  brush: {
    position: 'absolute',
    top: '40%',
    right: '25%',
    transform: [{ rotate: '-30deg' }],
  },
  floatingElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star1: {
    position: 'absolute',
    top: '20%',
    left: '30%',
  },
  book: {
    position: 'absolute',
    top: '50%',
    right: '20%',
  },
  star2: {
    position: 'absolute',
    top: '70%',
    left: '25%',
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
