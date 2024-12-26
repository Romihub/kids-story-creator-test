//src/screens/SettingsScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateSettings } from '../store/slices/userSlice';

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
  const settings = useAppSelector((state) => state.user.settings as UserSettings);

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    dispatch(updateSettings({ [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <List.Section>
          <List.Subheader>General</List.Subheader>
          
          <List.Item
            title="Theme"
            description="Dark mode / Light mode"
            left={props => <List.Icon {...props} icon="brightness-6" />}
            onPress={() => handleSettingChange('theme', settings.theme === 'light' ? 'dark' : 'light')}
          />

          <List.Item
            title="Language"
            description="Change app language"
            left={props => <List.Icon {...props} icon="translate" />}
            onPress={() => {/* Language selection logic */}}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          
          <List.Item
            title="Push Notifications"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={settings?.notifications || false}
                onValueChange={(value) => handleSettingChange('notifications', value)}
              />
            )}
          />

          <List.Item
            title="Sound"
            left={props => <List.Icon {...props} icon="volume-high" />}
            right={() => (
              <Switch
                value={settings.soundEnabled ?? true}
                onValueChange={(value) => handleSettingChange('soundEnabled', value)}
              />
            )}
          />

          <List.Item
            title="Vibration"
            left={props => <List.Icon {...props} icon="vibrate" />}
            right={() => (
              <Switch
                value={settings.vibrationEnabled ?? true}
                onValueChange={(value) => handleSettingChange('vibrationEnabled', value)}
              />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Account</List.Subheader>
          
          <List.Item
            title="Subscription"
            description="Manage your subscription"
            left={props => <List.Icon {...props} icon="star" />}
            onPress={() => {/* Subscription management logic */}}
          />

          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield" />}
            onPress={() => {/* Open privacy policy */}}
          />

          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            onPress={() => {/* Open terms of service */}}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
  },
});

export default SettingsScreen;