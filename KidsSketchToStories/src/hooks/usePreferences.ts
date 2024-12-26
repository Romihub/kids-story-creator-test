// src/hooks/usePreferences.ts
import { useState, useCallback } from 'react';

interface Preferences {
  theme: string;
  notifications: boolean;
  language: string;
  privacy: 'public' | 'private' | 'friends';
}

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    theme: 'light',
    notifications: true,
    language: 'en',
    privacy: 'public',
  });

  const updatePreferences = useCallback(async (updates: Partial<Preferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
    // Here you would typically make an API call to persist the changes
  }, []);

  return {
    preferences,
    updatePreferences,
  };
};