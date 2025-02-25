import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface UserStats {
  storiesCreated: number;
  drawingsUploaded: number;
  wordsLearned: number;
  lastActive: string;
}

export interface UserSubscription {
  type: 'free' | 'premium' | 'family';
  status: 'active' | 'expired' | 'cancelled';
  expiryDate?: string;
  features: string[];
}

export interface AuthUser extends FirebaseAuthTypes.User {
  isAdmin?: boolean;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  preferences?: UserPreferences;
  stats?: UserStats;
  subscription?: UserSubscription;
  createdAt?: string;
  updatedAt?: string;
  parentEmail?: string; // For child accounts
  isChild?: boolean;
  age?: number;
  parentalControls?: {
    contentRestrictions: boolean;
    timeLimit?: number; // minutes per day
    allowedFeatures: string[];
  };
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}
