import { useState, useCallback, useEffect } from 'react';

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

export const useProgressTracking = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    setMilestones([
      {
        id: '1',
        title: 'First Story Created',
        completed: true,
        date: '2024-03-01',
      },
      {
        id: '2',
        title: 'Complete 5 Stories',
        completed: false,
      },
      {
        id: '3',
        title: 'Share with Friends',
        completed: false,
      },
    ]);

    setSkills([
      {
        name: 'Creativity',
        level: 3,
        maxLevel: 5,
      },
      {
        name: 'Storytelling',
        level: 2,
        maxLevel: 5,
      },
      {
        name: 'Drawing',
        level: 4,
        maxLevel: 5,
      },
      {
        name: 'Vocabulary',
        level: 3,
        maxLevel: 5,
      },
    ]);

    setChallenges([
      {
        id: '1',
        title: 'Adventure Time',
        description: 'Create an adventure story with multiple characters',
        completed: true,
      },
      {
        id: '2',
        title: 'Colorful World',
        description: 'Use at least 5 different colors in your story',
        completed: false,
      },
      {
        id: '3',
        title: 'Emotional Journey',
        description: 'Include three different emotions in your story',
        completed: false,
      },
    ]);
  }, []);

  const showMilestoneDetails = useCallback((id: string) => {
    const milestone = milestones.find(m => m.id === id);
    // In a real app, this would show a modal or navigate to a details screen
    console.log('Showing milestone details:', milestone);
  }, [milestones]);

  const showSkillDetails = useCallback((skillName: string) => {
    const skill = skills.find(s => s.name === skillName);
    // In a real app, this would show a modal with skill progression details
    console.log('Showing skill details:', skill);
  }, [skills]);

  const startChallenge = useCallback((id: string) => {
    const challenge = challenges.find(c => c.id === id);
    if (challenge && !challenge.completed) {
      // In a real app, this would navigate to the challenge screen
      console.log('Starting challenge:', challenge);
    }
  }, [challenges]);

  const updateSkill = useCallback((skillName: string, newLevel: number) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => 
        skill.name === skillName 
          ? { ...skill, level: Math.min(newLevel, skill.maxLevel) }
          : skill
      )
    );
  }, []);

  const completeChallenge = useCallback((id: string) => {
    setChallenges(prevChallenges =>
      prevChallenges.map(challenge =>
        challenge.id === id
          ? { ...challenge, completed: true }
          : challenge
      )
    );
  }, []);

  const completeMilestone = useCallback((id: string) => {
    setMilestones(prevMilestones =>
      prevMilestones.map(milestone =>
        milestone.id === id
          ? { ...milestone, completed: true, date: new Date().toISOString().split('T')[0] }
          : milestone
      )
    );
  }, []);

  return {
    milestones,
    skills,
    challenges,
    showMilestoneDetails,
    showSkillDetails,
    startChallenge,
    updateSkill,
    completeChallenge,
    completeMilestone,
  };
}; 