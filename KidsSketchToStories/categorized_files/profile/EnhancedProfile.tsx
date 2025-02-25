// src/components/profile/EnhancedProfile.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { usePreferences } from '../../hooks/usePreferences';
import { ProfileHeader } from './ProfileHeader';
import { PreferencesSection } from './PreferencesSection';
import { SubscriptionSection } from './SubscriptionSection';
import { ActivityHistory } from './ActivityHistory';
import { DataManagement } from './settings/DataManagement';
import { User, Profile } from '../../types/auth';

export const EnhancedProfile: React.FC = () => {
  const { user } = useAuth();
  const { preferences, updatePreferences } = usePreferences();
  const [editing, setEditing] = useState(false);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please sign in to view your profile</Text>
      </View>
    );
  }

  const handlePreferenceUpdate = async (key: string, value: any) => {
    try {
      await updatePreferences({ [key]: value });
      // Show success feedback
    } catch (error) {
      // Handle error
      console.error('Failed to update preferences:', error);
    }
  };

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

  return (
    <View style={styles.container}>
      <ProfileHeader
        user={user}
        profile={user.profile || defaultProfile}
        onEdit={() => setEditing(true)}
      />
      <PreferencesSection
        preferences={preferences}
        onUpdate={handlePreferenceUpdate}
        editing={editing}
      />
      <SubscriptionSection />
      <ActivityHistory />
      <DataManagement />
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
});