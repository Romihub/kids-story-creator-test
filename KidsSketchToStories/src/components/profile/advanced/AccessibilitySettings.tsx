// src/components/profile/advanced/AccessibilitySettings.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextSizeAdjuster } from './TextSizeAdjuster';
import { ContrastAdjuster } from './ContrastAdjuster';
import { ToggleSection } from './ToggleSection';
import { VoiceControlManager } from './VoiceControlManager';

interface AccessibilitySettingsState {
  textSize: 'small' | 'medium' | 'large';
  contrast: 'low' | 'normal' | 'high';
  animations: boolean;
  soundEffects: boolean;
  voiceControl: boolean;
  colorBlindMode: boolean;
}

export const AccessibilitySettings: React.FC = () => {
  const [settings, setSettings] = useState<AccessibilitySettingsState>({
    textSize: 'medium',
    contrast: 'normal',
    animations: true,
    soundEffects: true,
    voiceControl: false,
    colorBlindMode: false
  });

  const updateSetting = <K extends keyof AccessibilitySettingsState>(
    key: K,
    value: AccessibilitySettingsState[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <View style={styles.container}>
      <TextSizeAdjuster
        value={settings.textSize}
        onChange={(value) => updateSetting('textSize', value)}
      />
      <ContrastAdjuster
        value={settings.contrast}
        onChange={(value) => updateSetting('contrast', value)}
      />
      <ToggleSection
        title="Animations"
        value={settings.animations}
        onChange={(value) => updateSetting('animations', value)}
      />
      <ToggleSection
        title="Sound Effects"
        value={settings.soundEffects}
        onChange={(value) => updateSetting('soundEffects', value)}
      />
      <VoiceControlManager
        enabled={settings.voiceControl}
        onToggle={(value) => updateSetting('voiceControl', value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
  },
});