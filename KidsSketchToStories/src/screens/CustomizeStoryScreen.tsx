import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../themes/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import type { PhotoQuality, ImageLibraryOptions } from 'react-native-image-picker';
import { Button } from '../components/shared/Button';
import { StoryProgressBar } from '../components/navigation/StoryProgressBar';
import { RootStackParamList, NavigationProps } from '../types/navigation';
import { useAppSelector } from '../store/hooks';
import { selectUserSubscription } from '../store/slices/subscriptionSlice';
import { useStoryCreation } from '../hooks/useStoryCreation';

type CustomizeStoryScreenRouteProp = RouteProp<RootStackParamList, 'CustomizeStory'>;

type AgeGroup = '3-5' | '6-8' | '9-12';
type StoryLength = 'short' | 'medium' | 'long';
type Theme = 'Adventure' | 'Fantasy' | 'Educational' | 'Friendship' | 'Family' | 'Nature' | 'Space' | 'Animals' | 'Mystery';

const themes: Theme[] = [
  'Adventure',
  'Fantasy',
  'Educational',
  'Friendship',
  'Family',
  'Nature',
  'Space',
  'Animals',
  'Mystery'
];

export const CustomizeStoryScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<CustomizeStoryScreenRouteProp>();
  const subscription = useAppSelector(selectUserSubscription);
  const isPro = subscription?.type === 'pro';

  const {
    settings,
    updateSettings,
    navigateToGenerate,
    handleBackNavigation,
    canNavigateToGenerate,
  } = useStoryCreation();

  const [coverImage, setCoverImage] = useState<string | null>(settings.coverImage || null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(settings.ageGroup as AgeGroup || '6-8');
  const [author, setAuthor] = useState(settings.author || '');
  const [gender, setGender] = useState<'boy' | 'girl' | null>(settings.gender || null);
  const [storyLength, setStoryLength] = useState<StoryLength>(settings.storyLength || 'short');
  const [selectedTheme, setSelectedTheme] = useState<Theme>(settings.theme as Theme || 'Adventure');

  // Update story creation state when settings change
  useEffect(() => {
    updateSettings({
      coverImage,
      ageGroup,
      author,
      gender,
      storyLength,
      theme: selectedTheme,
    });
  }, [coverImage, ageGroup, author, gender, storyLength, selectedTheme, updateSettings]);

  const handleImagePick = async (source: 'gallery' | 'upload') => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: (0.8 as unknown) as PhotoQuality,
    } as ImageLibraryOptions;

    try {
      const response = await (source === 'gallery' 
        ? ImagePicker.launchImageLibrary(options)
        : ImagePicker.launchCamera(options));

      if (response.assets && response.assets[0]?.uri) {
        setCoverImage(response.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSave = () => {
    if (!ageGroup) {
      Alert.alert('Required Field', 'Please select an age group');
      return;
    }

    if (!isPro && storyLength !== 'short') {
      Alert.alert('Pro Feature', 'Upgrade to Pro to access longer stories');
      return;
    }

    if (canNavigateToGenerate()) {
      navigateToGenerate();
    } else {
      Alert.alert('Error', 'Please complete all required fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StoryProgressBar
        currentStep="customize"
        onStepPress={handleBackNavigation}
        canNavigateBack={true}
      />
      
      <ScrollView style={styles.scrollView}>
        {/* Cover Image Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story Cover (Optional)</Text>
          <View style={styles.coverOptions}>
            <TouchableOpacity 
              style={styles.coverOption}
              onPress={() => handleImagePick('gallery')}
            >
              <MaterialCommunityIcons name="image" size={32} color={colors.primary} />
              <Text style={styles.coverOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.coverOption}
              onPress={() => handleImagePick('upload')}
            >
              <MaterialCommunityIcons name="upload" size={32} color={colors.secondary} />
              <Text style={styles.coverOptionText}>Upload from Phone</Text>
            </TouchableOpacity>
          </View>
          {coverImage && (
            <Image source={{ uri: coverImage }} style={styles.coverPreview} />
          )}
        </View>

        {/* Age Group Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age Group *</Text>
          <View style={styles.ageOptions}>
            {(['3-5', '6-8', '9-12'] as AgeGroup[]).map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.ageOption,
                  ageGroup === age && styles.selectedOption
                ]}
                onPress={() => setAgeGroup(age)}
              >
                <Text style={[
                  styles.ageOptionText,
                  ageGroup === age && styles.selectedOptionText
                ]}>
                  {age} years
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Author Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Author (Optional)</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Enter author name"
            placeholderTextColor={colors.text.secondary}
          />
        </View>

        {/* Gender Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Main Character (Optional)</Text>
          <View style={styles.genderOptions}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'boy' && styles.selectedOption
              ]}
              onPress={() => setGender('boy')}
            >
              <MaterialCommunityIcons name="face-man" size={24} color={gender === 'boy' ? colors.background : colors.primary} />
              <Text style={[
                styles.genderOptionText,
                gender === 'boy' && styles.selectedOptionText
              ]}>Boy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'girl' && styles.selectedOption
              ]}
              onPress={() => setGender('girl')}
            >
              <MaterialCommunityIcons name="face-woman" size={24} color={gender === 'girl' ? colors.background : colors.primary} />
              <Text style={[
                styles.genderOptionText,
                gender === 'girl' && styles.selectedOptionText
              ]}>Girl</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Story Length Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story Length</Text>
          <View style={styles.lengthOptions}>
            {(['short', 'medium', 'long'] as StoryLength[]).map((length) => (
              <TouchableOpacity
                key={length}
                style={[
                  styles.lengthOption,
                  storyLength === length && styles.selectedOption,
                  !isPro && length !== 'short' && styles.disabledOption
                ]}
                onPress={() => isPro ? setStoryLength(length) : length === 'short' ? setStoryLength(length) : null}
              >
                <Text style={[
                  styles.lengthOptionText,
                  storyLength === length && styles.selectedOptionText,
                  !isPro && length !== 'short' && styles.disabledOptionText
                ]}>
                  {length.charAt(0).toUpperCase() + length.slice(1)}
                  {!isPro && length !== 'short' && ' 🔒'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story Theme</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.themesScroll}
          >
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme}
                style={[
                  styles.themeOption,
                  selectedTheme === theme && styles.selectedOption
                ]}
                onPress={() => setSelectedTheme(theme)}
              >
                <Text style={[
                  styles.themeOptionText,
                  selectedTheme === theme && styles.selectedOptionText
                ]}>
                  {theme}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Generate Story"
          onPress={handleSave}
          variant="primary"
          style={styles.saveButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  coverOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  coverOption: {
    flex: 1,
    margin: spacing.xs,
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  coverOptionText: {
    ...typography.body2,
    color: colors.text.primary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  coverPreview: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  ageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ageOption: {
    flex: 1,
    margin: spacing.xs,
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  ageOptionText: {
    ...typography.body1,
    color: colors.text.primary,
  },
  input: {
    ...typography.body1,
    color: colors.text.primary,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  genderOptionText: {
    ...typography.body1,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  lengthOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lengthOption: {
    flex: 1,
    margin: spacing.xs,
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  lengthOptionText: {
    ...typography.body1,
    color: colors.text.primary,
  },
  themesScroll: {
    flexGrow: 0,
  },
  themeOption: {
    padding: spacing.md,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  themeOptionText: {
    ...typography.body1,
    color: colors.text.primary,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  selectedOptionText: {
    color: colors.background,
  },
  disabledOption: {
    backgroundColor: colors.surface,
    opacity: 0.5,
  },
  disabledOptionText: {
    color: colors.text.disabled,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveButton: {
    width: '100%',
  },
});

export default CustomizeStoryScreen;
