// src/services/settings.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserSettings } from '../types/settings';

const SETTINGS_STORAGE_KEY = '@app_settings';

export const SettingsService = {
  async saveSettings(settings: UserSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },

  async loadSettings(): Promise<UserSettings | null> {
    try {
      const settings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error loading settings:', error);
      return null;
    }
  },

  async updateSetting(key: keyof UserSettings, value: any): Promise<void> {
    try {
      const settings = await this.loadSettings();
      if (settings) {
        const updatedSettings = { ...settings, [key]: value };
        await this.saveSettings(updatedSettings);
      }
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  },
};