// src/hooks/useAchievements.ts
import { useState, useCallback } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
  reward?: string;
}

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const showAchievementDetails = useCallback((achievement: Achievement) => {
    // Implementation for showing achievement details
    console.log('Show achievement details:', achievement);
  }, []);

  const updateAchievement = useCallback((id: string, updates: Partial<Achievement>) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id ? { ...achievement, ...updates } : achievement
      )
    );
  }, []);

  return {
    achievements,
    showAchievementDetails,
    updateAchievement,
  };
}; 