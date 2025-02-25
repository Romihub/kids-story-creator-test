import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Switch, Text, Divider } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateSettings } from '../store/slices/userSlice';
import { colors, typography, spacing } from '../themes/theme';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../types/navigation';

// Define settings interface
interface UserSettings {
  theme: string;
  language: string;
  notifications: boolean;
  soundEnabled?: boolean;
  vibrationEnabled?: boolean;
}

export const SettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const settings = useAppSelector((state) => state.user.settings as UserSettings);
  const { user, signOut } = useAuth();

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    dispatch(updateSettings({ [key]: value }));
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
  subheader: {
    ...typography.h3,
    color: colors.text.secondary,
    paddingVertical: spacing.sm,
  },
});

export default SettingsScreen;
