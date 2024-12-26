// src/hooks/useProfile.ts
import { useState, useCallback } from 'react';
import { Profile } from '../types/profile';

const DEFAULT_PROFILE: Profile = {
  id: '1',
  userId: '1',
  displayName: 'Default User',
  bio: '',
  avatar: '',
  achievements: [],
  preferences: {
    theme: 'light',
    notifications: true,
    privacy: 'public',
    language: 'en',
  },
  stats: {
    storiesCreated: 0,
    totalLikes: 0,
    averageRating: 0,
  },
};

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfile(prev => {
      // Handle nested updates properly
      const newProfile = { ...prev };
      
      Object.entries(updates).forEach(([key, value]) => {
        if (key === 'preferences' || key === 'stats') {
          newProfile[key] = {
            ...newProfile[key],
            ...(value as any),
          };
        } else {
          (newProfile as any)[key] = value;
        }
      });

      return newProfile;
    });
  }, []);

  const updatePreferences = useCallback((updates: Partial<Profile['preferences']>) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...updates,
      },
    }));
  }, []);

  const updateStats = useCallback((updates: Partial<Profile['stats']>) => {
    setProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        ...updates,
      },
    }));
  }, []);

  const addAchievement = useCallback((achievement: Profile['achievements'][0]) => {
    setProfile(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement],
    }));
  }, []);

  return {
    profile,
    updateProfile,
    updatePreferences,
    updateStats,
    addAchievement,
  };
}; 