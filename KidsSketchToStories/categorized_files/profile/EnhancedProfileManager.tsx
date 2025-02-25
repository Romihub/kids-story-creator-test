// src/components/profile/EnhancedProfileManager.tsx
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { ProfileHeader } from "./ProfileHeader";
import { TabView } from "./TabView";
import { GeneralSettings } from "./settings/GeneralSettings";
import { PrivacySettings } from "./settings/PrivacySettings";
import { PreferencesSettings } from "./settings/PreferencesSettings";
import { DataManagement } from "./settings/DataManagement";
import { SettingsComponentProps } from "../../types/settings";
import { User, Profile } from "../../types/auth";

interface Section {
  id: string;
  title: string;
  component: React.ComponentType<SettingsComponentProps>;
}

export const EnhancedProfileManager: React.FC = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [activeSection, setActiveSection] = useState<string>('general');

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please sign in to manage your profile</Text>
      </View>
    );
  }

  const defaultProfile: Profile = {
    id: user.uid,
    userId: user.uid,
    email: user.email || '',
    displayName: user.displayName || 'User',
    avatar: user.photoURL || '',
    achievements: [],
    stats: {
      storiesCreated: 0,
      totalLikes: 0,
      averageRating: 0
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    preferences: {
      theme: 'light',
      notifications: true,
      privacy: 'private',
      language: 'en'
    }
  };

  const sections: Section[] = [
    {
      id: 'general',
      title: 'General Settings',
      component: GeneralSettings
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      component: PrivacySettings
    },
    {
      id: 'preferences',
      title: 'App Preferences',
      component: PreferencesSettings
    },
    {
      id: 'data',
      title: 'Data Management',
      component: DataManagement as React.ComponentType<SettingsComponentProps>
    }
  ];

  return (
    <View style={styles.container}>
      <ProfileHeader
        user={user}
        profile={profile || defaultProfile}
      />
      <TabView
        sections={sections}
        activeSection={activeSection}
        onChangeSection={setActiveSection}
      />
      <View style={styles.content}>
        {sections.map(section => (
          section.id === activeSection && (
            <section.component
              key={section.id}
              profile={profile || defaultProfile}
              onUpdate={updateProfile}
            />
          )
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});