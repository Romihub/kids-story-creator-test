import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { List, Switch, Text, Divider, Avatar, Button } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateSettings } from '../store/slices/userSlice';
import { colors, typography, spacing, borderRadius, shadows } from '../themes/theme';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../types/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

interface UserSettings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

const defaultSettings: UserSettings = {
  theme: 'light',
  language: 'en',
  notifications: false,
  soundEnabled: true,
  vibrationEnabled: true
};

export const ProfileSettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const settings = useAppSelector((state) => 
    state.user.settings ? 
    { ...defaultSettings, ...state.user.settings as Partial<UserSettings> } : 
    defaultSettings
  );
  const { user, signOut } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleSettingChange = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    dispatch(updateSettings({ [key]: value }));
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfilePhotoUpdate = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        quality: 0.8,
      });

      if (result.assets && result.assets[0]?.uri) {
        setUploading(true);
        const uri = result.assets[0].uri;
        const filename = `profile_photos/${auth().currentUser?.uid}/photo.jpg`;
        const reference = storage().ref(filename);

        if (Platform.OS === 'ios') {
          await reference.putFile(uri);
        } else {
          const path = uri.replace('file://', '');
          await reference.putFile(path);
        }

        const url = await reference.getDownloadURL();
        await auth().currentUser?.updateProfile({
          photoURL: url,
        });
        setUploading(false);
      }
    } catch (error) {
      console.error('Error updating profile photo:', error);
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.photoContainer}
            onPress={handleProfilePhotoUpdate}
            disabled={uploading}
          >
            {user?.photoURL ? (
              <Image 
                source={{ uri: user.photoURL }} 
                style={styles.profilePhoto}
              />
            ) : (
              <Avatar.Icon 
                size={80} 
                icon="account"
                style={styles.defaultAvatar}
              />
            )}
            <View style={styles.editIconContainer}>
              <MaterialCommunityIcons 
                name="camera" 
                size={20} 
                color={colors.surface}
              />
            </View>
          </TouchableOpacity>
          
          <Text style={styles.userName}>
            {user?.displayName || 'Anonymous User'}
          </Text>
          <Text style={styles.userEmail}>
            {user?.email}
          </Text>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.editButton}
          >
            Edit Profile
          </Button>
        </View>

        <Divider style={styles.divider} />

        {/* Admin Section */}
        {user?.isAdmin && (
          <List.Section>
            <List.Subheader style={styles.subheader}>Admin</List.Subheader>
            <List.Item
              title="Admin Dashboard"
              description="Manage app and users"
              left={props => <List.Icon {...props} icon="shield-account" color={colors.primary} />}
              onPress={() => navigation.navigate('Admin', { screen: 'Dashboard' })}
            />
            <Divider />
          </List.Section>
        )}

        {/* Settings Sections */}
        <List.Section>
          <List.Subheader style={styles.subheader}>General</List.Subheader>
          <List.Item
            title="Theme"
            description="Dark mode / Light mode"
            left={props => <List.Icon {...props} icon="brightness-6" color={colors.primary} />}
            onPress={() => handleSettingChange('theme', settings.theme === 'light' ? 'dark' : 'light')}
          />
          <List.Item
            title="Language"
            description="Change app language"
            left={props => <List.Icon {...props} icon="translate" color={colors.primary} />}
            onPress={() => {/* Language selection logic */}}
          />
          <Divider />
        </List.Section>

        <List.Section>
          <List.Subheader style={styles.subheader}>Notifications</List.Subheader>
          <List.Item
            title="Push Notifications"
            left={props => <List.Icon {...props} icon="bell" color={colors.primary} />}
            right={() => (
              <Switch
                value={settings?.notifications || false}
                onValueChange={(value) => handleSettingChange('notifications', value)}
                color={colors.primary}
              />
            )}
          />
          <List.Item
            title="Sound"
            left={props => <List.Icon {...props} icon="volume-high" color={colors.primary} />}
            right={() => (
              <Switch
                value={settings.soundEnabled ?? true}
                onValueChange={(value) => handleSettingChange('soundEnabled', value)}
                color={colors.primary}
              />
            )}
          />
          <List.Item
            title="Vibration"
            left={props => <List.Icon {...props} icon="vibrate" color={colors.primary} />}
            right={() => (
              <Switch
                value={settings.vibrationEnabled ?? true}
                onValueChange={(value) => handleSettingChange('vibrationEnabled', value)}
                color={colors.primary}
              />
            )}
          />
          <Divider />
        </List.Section>

        <List.Section>
          <List.Subheader style={styles.subheader}>Account</List.Subheader>
          <List.Item
            title="Subscription"
            description="Manage your subscription"
            left={props => <List.Icon {...props} icon="star" color={colors.primary} />}
            onPress={() => navigation.navigate('Subscription')}
          />
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield" color={colors.primary} />}
            onPress={() => {/* Open privacy policy */}}
          />
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" color={colors.primary} />}
            onPress={() => {/* Open terms of service */}}
          />
          <Divider />
        </List.Section>

        <List.Section>
          <List.Item
            title="Sign Out"
            titleStyle={{ color: colors.error.main }}
            left={props => <List.Icon {...props} icon="logout" color={colors.error.main} />}
            onPress={handleSignOut}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileSection: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  defaultAvatar: {
    backgroundColor: colors.primary + '20',
  },
  editIconContainer: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
    padding: spacing.xs,
    ...shadows.sm,
  },
  userName: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  editButton: {
    marginTop: spacing.sm,
  },
  divider: {
    marginVertical: spacing.md,
  },
  subheader: {
    ...typography.h3,
    color: colors.text.secondary,
    paddingVertical: spacing.sm,
  },
});

export default ProfileSettingsScreen;
