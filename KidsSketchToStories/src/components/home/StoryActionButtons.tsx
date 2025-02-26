// src/components/home/StoryActionButtons.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  ActivityIndicator,
  Animated,
  TextStyle,
  ViewStyle 
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, gradients } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStoryCreation } from '../../hooks/useStoryCreation';
import { LinearGradient } from 'expo-linear-gradient';

interface StoryActionButtonsProps {
  hasImage: boolean;
  hasStorySettings: boolean;
  storySettings?: any;
  imageUri?: string;
}

// Shared styles
const sharedButtonStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing.md,
  borderRadius: borderRadius.lg,
  ...shadows.md,
};

const sharedTextStyle = {
  ...typography.button,
  color: '#FFFFFF',
  marginLeft: spacing.sm,
  fontWeight: '600',
} as TextStyle;

const modalTextStyle = {
  ...typography.body1,
  color: colors.text.secondary,
  marginBottom: spacing.lg,
} as TextStyle;

const modalTitleStyle = {
  ...typography.h2,
  color: colors.text.primary,
  marginLeft: spacing.sm,
} as TextStyle;

// Gradient colors
const successGradientColors = ['#20B2AA', '#4ECDC4'] as const;
const secondaryGradientColors = ['#FF6B4E', '#FF4E8B'] as const;

export const StoryActionButtons: React.FC<StoryActionButtonsProps> = ({
  hasImage,
  hasStorySettings,
  storySettings,
  imageUri
}) => {
  const { 
    navigateToCustomize, 
    navigateToGenerate,
    isGenerating,
    startGenerating,
    stopGenerating,
    updateDrawingState
  } = useStoryCreation();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [editAnimation] = useState(new Animated.Value(1));
  const [generateAnimation] = useState(new Animated.Value(1));

  // Handle button press animations
  const handleEditPressIn = () => {
    Animated.spring(editAnimation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleEditPressOut = () => {
    Animated.spring(editAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleGeneratePressIn = () => {
    Animated.spring(generateAnimation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleGeneratePressOut = () => {
    Animated.spring(generateAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Navigation handlers
  const handleEditSettings = () => {
    if (imageUri) {
      updateDrawingState({ imageUri });
    }
    navigateToCustomize();
  };

  const handleGenerateStory = () => {
    if (!hasImage) {
      // Show tooltip or alert that image is required
      return;
    }

    setConfirmModalVisible(true);
  };

  const confirmGeneration = async () => {
    setConfirmModalVisible(false);
    startGenerating();

    try {
      if (imageUri && storySettings) {
        updateDrawingState({ imageUri });
        navigateToGenerate();
      }
    } catch (error) {
      console.error('Story generation failed:', error);
      // Show error message
    } finally {
      stopGenerating();
    }
  };

  return (
    <View style={styles.container}>
      {/* Edit Settings Button */}
      <TouchableOpacity
        onPress={handleEditSettings}
        onPressIn={handleEditPressIn}
        onPressOut={handleEditPressOut}
        activeOpacity={0.8}
        style={{ marginBottom: spacing.md }}
      >
        <Animated.View style={{ transform: [{ scale: editAnimation }] }}>
          <LinearGradient
            colors={successGradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.editButton}
          >
            <MaterialCommunityIcons name="cog" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Edit Story Settings</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      {/* Generate Story Button */}
      <TouchableOpacity
        onPress={handleGenerateStory}
        onPressIn={handleGeneratePressIn}
        onPressOut={handleGeneratePressOut}
        activeOpacity={0.8}
        disabled={!hasImage || isGenerating}
      >
        <Animated.View style={{ transform: [{ scale: generateAnimation }] }}>
          <LinearGradient
            colors={secondaryGradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.generateButton,
              (!hasImage || isGenerating) && styles.disabledButton
            ]}
          >
            {isGenerating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text style={styles.buttonText}>Generating Story...</Text>
              </View>
            ) : (
              <>
                <MaterialCommunityIcons name="sparkles" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Generate Story</Text>
              </>
            )}
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <MaterialCommunityIcons 
                name="alert-circle-outline" 
                size={32} 
                color={colors.status.warning} 
              />
              <Text style={styles.modalTitle}>Generate Story?</Text>
            </View>

            <Text style={styles.modalText}>
              This will create a story based on your drawing and settings. Continue?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmGeneration}
              >
                <Text style={styles.confirmButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  editButton: {
    ...sharedButtonStyle,
  },
  generateButton: {
    ...sharedButtonStyle,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    ...typography.button,
    color: '#FFFFFF',
    marginLeft: spacing.sm,
    fontWeight: '600',
  } as TextStyle,
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
    ...shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: modalTitleStyle,
  modalText: modalTextStyle,
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: colors.background.secondary,
    padding: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.text.primary,
    fontWeight: '500',
  } as TextStyle,
  confirmButton: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  confirmButtonText: {
    ...typography.button,
    color: '#FFFFFF',
    fontWeight: '600',
  } as TextStyle,
});

export default StoryActionButtons;
