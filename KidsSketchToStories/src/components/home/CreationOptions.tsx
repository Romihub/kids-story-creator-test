import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';
import * as ImagePicker from 'react-native-image-picker';
import type { PhotoQuality, ImageLibraryOptions } from 'react-native-image-picker';

interface CreationOptionProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  onPress: () => void;
}

const CreationOption = React.memo<CreationOptionProps>(({ icon, title, description, color, onPress }) => {
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
        <View style={[styles.iconContainer, { backgroundColor: color + '10' }]}>
          <MaterialCommunityIcons name={icon} size={32} color={color} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionDescription}>{description}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
      </Animated.View>
    </TouchableOpacity>
  );
});

CreationOption.displayName = 'CreationOption';

export const CreationOptions = () => {
  const navigation = useNavigation<NavigationProps>();

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
        navigation.navigate('Drawing', {
          id: 'new',
          imageUri: response.assets[0].uri,
          mode: 'edit'
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started by</Text>
      
      <View style={styles.optionsContainer}>
        <CreationOption
          icon="pencil"
          title="Draw Something"
          description="Create a new drawing from scratch"
          color={colors.primary}
          onPress={() => navigation.navigate('Drawing', { id: 'new' })}
        />
        
        <CreationOption
          icon="image-plus"
          title="Upload Image"
          description="Upload a drawing from your device"
          color={colors.secondary}
          onPress={handleImagePick}
        />
        
        <CreationOption
          icon="camera"
          title="Take Photo"
          description="Take a photo of your drawing"
          color={colors.accent}
          onPress={() => navigation.navigate('Camera')}
        />
        
        <CreationOption
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
  optionsContainer: {
    gap: spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
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
