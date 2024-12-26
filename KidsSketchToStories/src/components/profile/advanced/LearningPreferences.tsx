// src/components/profile/advanced/LearningPreferences.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LearningStyleSelector } from './LearningStyleSelector';
import { DifficultyAdjuster } from './DifficultyAdjuster';
import { InteractivitySettings } from './InteractivitySettings';
import { FeedbackPreferences } from './FeedbackPreferences';

type LearningStyle = 'visual' | 'auditory' | 'kinesthetic';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
type InteractivityLevel = 'low' | 'medium' | 'high';
type FeedbackFrequency = 'minimal' | 'moderate' | 'frequent';

interface LearningPreferencesState {
  learningStyle: LearningStyle;
  difficultyLevel: DifficultyLevel;
  interactivityLevel: InteractivityLevel;
  feedbackFrequency: FeedbackFrequency;
}

export const LearningPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<LearningPreferencesState>({
    learningStyle: 'visual',
    difficultyLevel: 'intermediate',
    interactivityLevel: 'high',
    feedbackFrequency: 'frequent'
  });

  const updatePreference = <K extends keyof LearningPreferencesState>(
    key: K,
    value: LearningPreferencesState[K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <View style={styles.container}>
      <LearningStyleSelector
        value={preferences.learningStyle}
        onChange={(style) => updatePreference('learningStyle', style)}
      />
      <DifficultyAdjuster
        value={preferences.difficultyLevel}
        onChange={(level) => updatePreference('difficultyLevel', level)}
      />
      <InteractivitySettings
        value={preferences.interactivityLevel}
        onChange={(level) => updatePreference('interactivityLevel', level)}
      />
      <FeedbackPreferences
        value={preferences.feedbackFrequency}
        onChange={(freq) => updatePreference('feedbackFrequency', freq)}
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