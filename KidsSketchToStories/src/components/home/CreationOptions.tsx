import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

const GRID_SPACING = spacing.md;
const GRID_COLUMNS = 2;
const CARD_WIDTH = (Dimensions.get('window').width - (GRID_SPACING * (GRID_COLUMNS + 1))) / GRID_COLUMNS;

const AnimatedOption = ({ 
  icon, 
  title, 
  description, 
  color, 
  onPress 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  color: string;
  onPress: () => void;
}) => {
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
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View 
        style={[
          styles.optionCard,
          { transform: [{ scale: animation }] }
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <MaterialCommunityIcons name={icon} size={32} color={colors.background} />
        </View>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const CreationOptions = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started by</Text>
      
      <View style={styles.optionsGrid}>
        <AnimatedOption
          icon="pencil"
          title="Draw Something"
          description="Create a new drawing from scratch"
          color={colors.primary}
          onPress={() => navigation.navigate('Drawing', { id: 'new' })}
        />
        
        <AnimatedOption
          icon="image-plus"
          title="Upload Image"
          description="Upload a drawing from your device"
          color={colors.secondary}
          onPress={() => navigation.navigate('Drawing', { id: 'new', mode: 'edit' })}
        />
        
        <AnimatedOption
          icon="camera"
          title="Take Photo"
          description="Take a photo of your drawing"
          color={colors.accent}
          onPress={() => navigation.navigate('Camera')}
        />
        
        <AnimatedOption
          icon="image-multiple"
          title="Gallery"
          description="View your saved drawings"
          color={colors.primary}
          onPress={() => navigation.navigate('Gallery')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_SPACING,
  },
  optionCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  optionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    ...typography.body2,
    color: colors.text.secondary,
  },
});

export default CreationOptions;
