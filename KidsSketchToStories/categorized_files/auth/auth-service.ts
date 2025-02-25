// src/services/firebase/auth-service.ts
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

class AuthService {
  private auth = auth();

  // Sign in methods
  async signInWithEmail(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      return await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signUp(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      return await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  // Auth state
  onAuthStateChanged(callback: (user: FirebaseAuthTypes.User | null) => void) {
    return this.auth.onAuthStateChanged(callback);
  }

  // Current user
  getCurrentUser(): FirebaseAuthTypes.User | null {
    return this.auth.currentUser;
  }

  // Update profile
  async updateProfile(updates: { displayName?: string; photoURL?: string }): Promise<void> {
    const user = this.getCurrentUser();
    if (!user) throw new Error('No user logged in');

    try {
      await user.updateProfile(updates);
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();