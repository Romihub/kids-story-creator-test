import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

export const WordExplorerCard = () => {
  const navigation = useNavigation<NavigationProps>();
  const [animation] = React.useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('WordExplorer')}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View 
        style={[
          styles.container,
          { transform: [{ scale: animation }] }
        ]}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons 
              name="book-search" 
              size={32} 
              color={colors.primary} 
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Word Explorer</Text>
            <Text style={styles.description}>
              Learn new words from your stories
            </Text>
          </View>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={24} 
            color={colors.text.secondary} 
          />
        </View>

        {/* Floating Elements */}
        <View style={styles.floatingElements}>
          <MaterialCommunityIcons 
            name="star" 
            size={16} 
            color={colors.accent} 
            style={styles.star1}
          />
          <MaterialCommunityIcons 
            name="star" 
            size={12} 
            color={colors.primary} 
            style={styles.star2}
          />
          <MaterialCommunityIcons 
            name="star" 
            size={14} 
            color={colors.secondary} 
            style={styles.star3}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    padding: spacing.lg,
    ...shadows.sm,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  floatingElements: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  star1: {
    position: 'absolute',
    top: '20%',
    right: '30%',
    opacity: 0.3,
  },
  star2: {
    position: 'absolute',
    bottom: '30%',
    right: '20%',
    opacity: 0.2,
  },
  star3: {
    position: 'absolute',
    top: '40%',
    right: '40%',
    opacity: 0.25,
  },
});

export default WordExplorerCard;
