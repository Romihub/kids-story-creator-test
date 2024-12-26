// src/types/auth.ts
export type { User, Profile } from './user';

// Auth-specific types
export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
} 