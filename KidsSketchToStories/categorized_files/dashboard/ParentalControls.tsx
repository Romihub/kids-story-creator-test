// src/components/profile/advanced/ParentalControls.tsx
import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { TimeLimitSelector } from './TimeLimitSelector';
import { ContentFilterSelector } from './ContentFilterSelector';
import { ScheduleManager } from './ScheduleManager';
import { PinCodeManager } from './PinCodeManager';

interface Schedule {
  weekdays: { start: string; end: string };
  weekends: { start: string; end: string };
}

interface ParentalControlsState {
  timeLimit: number;
  contentFilter: 'strict' | 'moderate' | 'minimal';
  allowedThemes: string[];
  pinCode: string;
  scheduleEnabled: boolean;
  schedule: Schedule;
}

export const ParentalControls: React.FC = () => {
  const [settings, setSettings] = useState<ParentalControlsState>({
    timeLimit: 60,
    contentFilter: 'strict',
    allowedThemes: ['educational', 'nature'],
    pinCode: '',
    scheduleEnabled: false,
    schedule: {
      weekdays: { start: '15:00', end: '18:00' },
      weekends: { start: '10:00', end: '20:00' }
    }
  });

  const updateSetting = useCallback(<K extends keyof ParentalControlsState>(
    key: K,
    value: ParentalControlsState[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const updateSchedule = useCallback((newSchedule: Schedule) => {
    setSettings(prev => ({
      ...prev,
      schedule: newSchedule
    }));
  }, []);

  const setPin = useCallback((pin: string) => {
    setSettings(prev => ({
      ...prev,
      pinCode: pin
    }));
  }, []);

  const resetPin = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      pinCode: ''
    }));
  }, []);

  return (
    <View style={styles.container}>
      <TimeLimitSelector
        value={settings.timeLimit}
        onChange={(value) => updateSetting('timeLimit', value)}
      />
      <ContentFilterSelector
        value={settings.contentFilter}
        onChange={(value) => updateSetting('contentFilter', value)}
      />
      <ScheduleManager
        enabled={settings.scheduleEnabled}
        schedule={settings.schedule}
        onUpdate={updateSchedule}
      />
      <PinCodeManager
        onPinSet={setPin}
        onPinReset={resetPin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
});