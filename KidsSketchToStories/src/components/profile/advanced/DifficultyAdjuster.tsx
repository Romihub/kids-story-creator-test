// src/components/profile/advanced/DifficultyAdjuster.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

interface DifficultyAdjusterProps {
  value: DifficultyLevel;
  onChange: (level: DifficultyLevel) => void;
}

const difficultyLevels: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];

export const DifficultyAdjuster: React.FC<DifficultyAdjusterProps> = ({
  value,
  onChange,
}) => {
  const getCurrentIndex = () => difficultyLevels.indexOf(value);
  
  const handleSliderChange = (index: number) => {
    onChange(difficultyLevels[index]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Difficulty Level</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2}
        step={1}
        value={getCurrentIndex()}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#DEDEDE"
      />
      <View style={styles.labels}>
        <Text style={styles.label}>Beginner</Text>
        <Text style={styles.label}>Intermediate</Text>
        <Text style={styles.label}>Advanced</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  slider: {
    height: 40,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
}); 