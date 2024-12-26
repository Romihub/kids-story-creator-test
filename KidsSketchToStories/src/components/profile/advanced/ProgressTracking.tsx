// src/components/profile/advanced/ProgressTracking.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MilestoneTimeline } from './MilestoneTimeline';
import { SkillsRadar } from './SkillsRadar';
import { ChallengeBoard } from './ChallengeBoard';
import { useProgressTracking } from '../../../hooks/useProgressTracking';

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  date?: string;
}

interface Skill {
  name: string;
  level: number;
  maxLevel: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const ProgressTracking: React.FC = () => {
  const { 
    milestones, 
    skills, 
    challenges,
    showMilestoneDetails,
    showSkillDetails,
    startChallenge
  } = useProgressTracking();

  return (
    <View style={styles.container}>
      <MilestoneTimeline
        milestones={milestones}
        onMilestonePress={showMilestoneDetails}
      />
      <SkillsRadar
        skills={skills}
        onSkillPress={showSkillDetails}
      />
      <ChallengeBoard
        challenges={challenges}
        onChallengeSelect={startChallenge}
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