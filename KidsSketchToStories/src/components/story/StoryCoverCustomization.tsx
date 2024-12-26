// src/components/story/StoryCoverCustomization.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSubscription } from '../../hooks/useSubscription';

interface StoryCoverCustomizationProps {
  onSave: (details: {
    title: string;
    authorName?: string;
    userPhoto?: string;
  }) => void;
  initialTitle?: string;
}

export const StoryCoverCustomization: React.FC<StoryCoverCustomizationProps> = ({
  onSave,
  initialTitle = '',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [authorName, setAuthorName] = useState('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [useCustomPhoto, setUseCustomPhoto] = useState(false);
  const { tier } = useSubscription();

  const handlePhotoSelect = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        maxWidth: 1024,
        maxHeight: 1024,
      });

      if (result.assets && result.assets[0].uri) {
        setUserPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select photo');
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a story title');
      return;
    }

    onSave({
      title: title.trim(),
      authorName: authorName.trim() || undefined,
      userPhoto: useCustomPhoto ? userPhoto || undefined : undefined,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Your Story Cover</Text>
      
      <View style={styles.inputContainer}>
        {/* Title Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Story Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter your story title"
            style={styles.input}
          />
        </View>

        {/* Author Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Author Name (Optional)</Text>
          <TextInput
            value={authorName}
            onChangeText={setAuthorName}
            placeholder="How should we show your name?"
            style={styles.input}
          />
        </View>

        {/* Cover Photo Option - Premium Feature */}
        {tier.features.customCover && (
          <View style={styles.photoSection}>
            <Text style={styles.label}>Cover Photo</Text>
            
            <TouchableOpacity 
              onPress={() => setUseCustomPhoto(!useCustomPhoto)}
              style={styles.checkboxContainer}
            >
              <View style={[
                styles.checkbox,
                useCustomPhoto && styles.checkboxChecked
              ]}>
                {useCustomPhoto && (
                  <Icon name="check" size={18} color="white" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                Use my photo on the cover
              </Text>
            </TouchableOpacity>

            {useCustomPhoto && (
              <View style={styles.photoContainer}>
                {userPhoto ? (
                  <View style={styles.selectedPhotoContainer}>
                    <Image 
                      source={{ uri: userPhoto }} 
                      style={styles.selectedPhoto}
                    />
                    <TouchableOpacity 
                      onPress={handlePhotoSelect}
                      style={styles.editButton}
                    >
                      <Icon name="edit" size={20} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity 
                    onPress={handlePhotoSelect}
                    style={styles.uploadButton}
                  >
                    <Icon name="add-photo-alternate" size={32} color="#666" />
                    <Text style={styles.uploadText}>Upload Photo</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          onPress={handleSave}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  photoSection: {
    gap: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  photoContainer: {
    marginTop: 8,
  },
  selectedPhotoContainer: {
    position: 'relative',
  },
  selectedPhoto: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  editButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    color: '#666666',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StoryCoverCustomization;