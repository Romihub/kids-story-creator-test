// src/components/story/StoryAnimation.tsx
import React, { useEffect } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

interface StoryAnimationProps {
  type: string;
  duration: number;
  children: React.ReactNode;
}

export const StoryAnimation: React.FC<StoryAnimationProps> = ({
  type,
  duration,
  children,
}) => {
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const animatedStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  ageGroup: {
    fontSize: 14,
    color: '#666',
  },
  pageContainer: {
    flex: 1,
    padding: 16,
  },
});