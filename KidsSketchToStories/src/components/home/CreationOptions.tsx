// src/components/home/CreationOptions.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';
import { useSubscription } from '../../hooks/useSubscription';
import * as ImagePicker from 'react-native-image-picker';
import type { PhotoQuality, ImageLibraryOptions } from 'react-native-image-picker';

interface CreationOptionsProps {
  onImageSelected?: (uri: string) => void;
}

const OPTION_ITEMS = [
  {
    id: 'draw',
    icon: 'pencil',
    title: 'Draw',
    description: 'Create a new drawing',
    screen: 'Drawing',
    color: '#6B4EFF',
    bgColor: '#6B4EFF20',
  },
  {
    id: 'upload',
    icon: 'image-plus',
    title: 'Upload',
    description: 'Upload existing drawing',
    screen: 'Upload',
    color: '#FF6B4E',
    bgColor: '#FF6B4E20',
  },
  {
    id: 'camera',
    icon: 'camera',
    title: 'Photo',
    description: 'Take a photo of drawing',
    screen: 'Camera',
    color: '#4EFF6B',
    bgColor: '#4EFF6B20',
  },
  {
    id: 'gallery',
    icon: 'folder-image',
    title: 'Gallery',
    description: 'View saved drawings',
    screen: 'Gallery',
    color: '#EC4899',
    bgColor: '#EC489920',
    premiumOnly: true,
  },
];

export const CreationOptions: React.FC<CreationOptionsProps> = ({ onImageSelected }) => {
  const navigation = useNavigation<NavigationProps>();
  const { tier } = useSubscription();
  const [animations] = React.useState(
    OPTION_ITEMS.map(() => new Animated.Value(1))
  );

  // Handle image picking
  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      quality: (0.8 as unknown) as PhotoQuality,
    } as ImageLibraryOptions;

    try {
      const response = await ImagePicker.launchImageLibrary(options);

      if (response.assets && response.assets[0]?.uri) {
        const uri = response.assets[0].uri;
        
        // Call onImageSelected callback if provided
        if (onImageSelected) {
          onImageSelected(uri);
        }
        
        // Navigate to Drawing screen
        navigation.navigate('Drawing', {
          id: 'new',
          imageUri: uri,
          mode: 'edit'
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // Handle option press based on option type
  const handleOptionPress = (option: typeof OPTION_ITEMS[0], index: number) => {
    if (option.premiumOnly && tier.id === 'free') {
      navigation.navigate('Subscription');
      return;
    }
    
    // Handle different option types
    if (option.id === 'upload') {
      handleImagePick();
    } else {
      navigation.navigate(option.screen as any, { 
        id: 'new',
        onImageSelected,
        returnTo: 'Home' 
      });
    }
  };

  // Handle press animations
  const handlePressIn = (index: number) => {
    Animated.spring(animations[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Get started by</Text>
      
      <View style={styles.optionsGrid}>
        {OPTION_ITEMS.map((option, index) => {
          const isPremiumLocked = option.premiumOnly && tier.id === 'free';
          
          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleOptionPress(option, index)}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              activeOpacity={0.8}
              style={styles.touchable}
            >
              <Animated.View
                style={[
                  styles.optionCard,
                  {
                    transform: [{ scale: animations[index] }]
                  }
                ]}
              >
                <View 
                  style={[
                    styles.iconContainer,
                    { backgroundColor: option.bgColor }
                  ]}
                >
                  <MaterialCommunityIcons
                    name={option.icon}
                    size={32}
                    color={option.color}
                  />
                </View>
                <Text style={styles.optionLabel}>{option.title}</Text>
                
                {isPremiumLocked && (
                  <View style={styles.premiumBadge}>
                    <MaterialCommunityIcons
                      name="lock"
                      size={12}
                      color="#FFFFFF"
                    />
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  touchable: {
    width: '48%',
    marginBottom: spacing.md,
  },
  optionCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  optionLabel: {
    ...typography.h3,
    color: colors.text.primary,
    textAlign: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.accent,
    borderRadius: borderRadius.round,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CreationOptions;