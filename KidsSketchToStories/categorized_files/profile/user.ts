import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
  reward?: string;
}

interface UserPreferences {
  theme: string;
  notifications: boolean;
  privacy: 'public' | 'private' | 'friends';
  language: string;
}

interface UserStats {
  storiesCreated: number;
  totalLikes: number;
  averageRating: number;
}

export interface Profile {
  id: string;
  userId: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  achievements: Achievement[];
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

// Extending Firebase User type
export type User = FirebaseAuthTypes.User & {
  profile?: Profile;
};

// Database user document type
export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  profile?: Profile;
  createdAt: Date;
  updatedAt: Date;
} 