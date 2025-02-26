// src/components/home/WordExplorerCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { typography, spacing, borderRadius, shadows } from '../../themes/theme';
import { createBackgroundStyle, getColor } from '../../themes/themeHelpers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

export const WordExplorerCard = () => {
  const navigation = useNavigation<NavigationProps>();
  const [animation] = React.useState(new Animated.Value(1));
  const [floatingAnimation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    // Start floating animation for decorative elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
      style={styles.touchable}
    >
      <Animated.View 
        style={[
          styles.container,
          { transform: [{ scale: animation }] }
        ]}
      >
        <View style={styles.background}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons 
                name="book-search" 
                size={32} 
                color={getColor.primary()} 
              />
              
              {/* Floating decorative elements */}
              <Animated.View
                style={[
                  styles.decorativeElement,
                  styles.elementOne,
                  {
                    transform: [
                      { 
                        translateY: floatingAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -5],
                        })
                      }
                    ]
                  }
                ]}
              >
                <MaterialCommunityIcons 
                  name="star" 
                  size={16} 
                  color={getColor.primary()} 
                  style={{ opacity: 0.3 }}
                />
              </Animated.View>
              
              <Animated.View
                style={[
                  styles.decorativeElement,
                  styles.elementTwo,
                  {
                    transform: [
                      { 
                        translateY: floatingAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -6],
                        })
                      }
                    ]
                  }
                ]}
              >
                <MaterialCommunityIcons 
                  name="star" 
                  size={12} 
                  color={getColor.primary()} 
                  style={{ opacity: 0.2 }}
                />
              </Animated.View>
            </View>
            
            <View style={styles.textContainer}>
              <Text style={styles.title}>Word Explorer</Text>
              <Text style={styles.description}>
                Learn new words from your stories
              </Text>
            </View>
            
            <View style={styles.arrowContainer}>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color={getColor.primary()} 
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  container: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  background: {
    width: '100%',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(107, 78, 255, 0.1)',
    backgroundColor: '#F0F7FF', // Light blue background
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    ...createBackgroundStyle(getColor.background.primary()),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    ...shadows.sm,
    position: 'relative',
  },
  decorativeElement: {
    position: 'absolute',
    zIndex: -1,
  },
  elementOne: {
    top: -8,
    right: -8,
  },
  elementTwo: {
    bottom: -6,
    left: -6,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: getColor.text.primary(),
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body2,
    color: getColor.text.secondary(),
  },
  arrowContainer: {
    ...createBackgroundStyle(getColor.primaryLight()),
    borderRadius: borderRadius.round,
    padding: spacing.xs,
  },
});

export default WordExplorerCard;
