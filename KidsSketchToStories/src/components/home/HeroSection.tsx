import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { typography, spacing, borderRadius, shadows } from '../../themes/theme';
import { getColor } from '../../themes/themeHelpers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { RootNavigationProp } from '../../types/navigation';
import { useAuth } from '../../hooks/useAuth';
// Import from node_modules directly
import LinearGradient from '@react-native-community/linear-gradient';
import { AnimatedStar } from './AnimatedStar';

interface HeroSectionProps {
  onStartDrawing?: (uri?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartDrawing }) => {
  const navigation = useNavigation<RootNavigationProp>();
  const { isAuthenticated } = useAuth();
  const [animation] = React.useState(new Animated.Value(0));
  const { width, height } = Dimensions.get('window');

  const starPositions = React.useMemo(() => [
    { top: height * 0.1, left: width * 0.15, size: 16, delay: 300 },
    { top: height * 0.25, left: width * 0.8, size: 14, delay: 500 },
    { top: height * 0.7, left: width * 0.2, size: 12, delay: 700 },
    { top: height * 0.5, left: width * 0.9, size: 18, delay: 100 },
    { top: height * 0.6, left: width * 0.5, size: 10, delay: 900 },
  ], [width, height]);

  React.useEffect(() => {
    // Entrance animation
    Animated.spring(animation, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleStartDrawing = () => {
    if (isAuthenticated) {
      if (onStartDrawing) {
        onStartDrawing();
      }
      navigation.navigate('Drawing', { id: 'new' });
    } else {
      navigation.navigate('Auth', {
        screen: 'SignIn',
      });
    }
  };

  return (
    <LinearGradient
      colors={['#6366F1', '#8B5CF6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Animated floating stars */}
      {starPositions.map((star, index) => (
        <AnimatedStar
          key={`star-${index}`}
          position={{ top: star.top, left: star.left }}
          size={star.size}
          delay={star.delay}
          parentAnimation={animation}
        />
      ))}

      <View style={styles.heroContent}>
        <Animated.View
          style={[
            styles.textContent,
            {
              opacity: animation,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.title}>Welcome to StoryDoodle!</Text>
          <Text style={styles.subtitle}>
            Turn your drawings into magical stories with AI
          </Text>
        </Animated.View>

        {/* Art tool icons */}
        <View style={styles.illustrationContainer}>
          <Animated.View
            style={[
              styles.iconBubble,
              styles.iconLeft,
              {
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-50, -10],
                    }),
                  },
                ],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="palette"
              size={32}
              color="#6366F1"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.iconBubble,
              styles.iconMiddle,
              {
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 30], // Lower position
                    }),
                  },
                ],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="pencil"
              size={36} // Slightly larger
              color="#6366F1"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.iconBubble,
              styles.iconRight,
              {
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-30, -5],
                    }),
                  },
                ],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="book-open-variant"
              size={32}
              color="#6366F1"
            />
          </Animated.View>
        </View>

        {/* Start Drawing Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: animation,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.startDrawingButton}
            onPress={handleStartDrawing}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color="#6366F1"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Start Drawing</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    ...typography.body1,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  illustrationContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    marginBottom: spacing.xl,
  },
  iconBubble: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: borderRadius.round,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  iconLeft: {
    top: '30%',
    left: '15%',
  },
  iconMiddle: {
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -40 }],
    width: 80,
    height: 80,
    zIndex: 2,
  },
  iconRight: {
    top: '25%',
    right: '15%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  startDrawingButton: {
    minWidth: 200,
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },
  buttonText: {
    ...typography.button,
    color: '#6366F1',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HeroSection;
