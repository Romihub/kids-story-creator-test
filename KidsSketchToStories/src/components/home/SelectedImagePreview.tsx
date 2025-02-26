// src/components/home/SelectedImagePreview.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Modal, 
  Animated 
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { RootNavigationProp } from '../../types/navigation';

interface SelectedImagePreviewProps {
  imageUri: string;
  onChangeImage: () => void;
}

export const SelectedImagePreview: React.FC<SelectedImagePreviewProps> = ({ 
  imageUri, 
  onChangeImage 
}) => {
  const navigation = useNavigation<RootNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(1));

  // Handle image press animation
  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Handle full screen preview
  const openFullScreenPreview = () => {
    setModalVisible(true);
  };

  const closeFullScreenPreview = () => {
    setModalVisible(false);
  };

  // Handle image edit
  const handleEditImage = () => {
    navigation.navigate('Drawing', {
      id: 'edit', // Using 'edit' as the ID for editing existing images
      imageUri,
      mode: 'edit'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Selected Drawing</Text>
        <TouchableOpacity 
          style={styles.changeButton}
          onPress={onChangeImage}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="refresh" size={16} color={colors.primary} />
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={openFullScreenPreview}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View 
          style={[
            styles.imageContainer,
            { transform: [{ scale: animation }] }
          ]}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <MaterialCommunityIcons
                name="image-outline"
                size={48}
                color={colors.text.secondary}
              />
              <Text style={styles.placeholderText}>Drawing Preview</Text>
            </View>
          )}
          
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Tap to Preview</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.caption}>
        <MaterialCommunityIcons name="sparkles" size={16} color={colors.accentPurple} />
        {' '}This drawing will be used to create your story
      </Text>

      {/* Full Screen Preview Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeFullScreenPreview}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={closeFullScreenPreview}
              style={styles.modalCloseButton}
            >
              <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Preview</Text>
            <TouchableOpacity 
              onPress={handleEditImage}
              style={styles.modalEditButton}
            >
              <MaterialCommunityIcons name="pencil" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalImageContainer}>
            <Image
              source={{ uri: imageUri }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.modalFooter}>
            <Text style={styles.modalFooterText}>
              This image will be used to generate your story
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}10`,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  changeButtonText: {
    ...typography.button,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    ...shadows.sm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    backgroundColor: colors.background.secondary,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: spacing.sm,
  },
  overlayText: {
    ...typography.button,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  caption: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalCloseButton: {
    padding: spacing.sm,
  },
  modalTitle: {
    ...typography.h2,
    color: '#FFFFFF',
  },
  modalEditButton: {
    padding: spacing.sm,
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalImage: {
    width: '100%',
    height: '80%',
    borderRadius: borderRadius.md,
  },
  modalFooter: {
    padding: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalFooterText: {
    ...typography.body2,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default SelectedImagePreview;
