// src/types/profile.ts
export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    progress: number;
    unlocked: boolean;
    reward?: string;
  }>;
  preferences: {
    theme: string;
    notifications: boolean;
    privacy: 'public' | 'private' | 'friends';
    language: string;
  };
  stats: {
    storiesCreated: number;
    totalLikes: number;
    averageRating: number;
  };
} 