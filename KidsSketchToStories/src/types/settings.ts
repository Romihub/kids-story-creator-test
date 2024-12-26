// src/types/settings.ts
import { Profile } from './profile';

export interface UserSettings {
    theme: string;
    language: string;
    notifications: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
  }
  
  export type SettingKey = keyof UserSettings;

export interface SettingsComponentProps {
  profile: Profile;
  onUpdate: (updates: Partial<Profile>) => void;
}