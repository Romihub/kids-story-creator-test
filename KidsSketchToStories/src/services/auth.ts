// src/services/auth.ts
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export class AuthService {
  static async signIn(email: string, password: string) {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      return result.user;
    } catch (error) {
      throw new AppError(
        ErrorCodes.AUTH,
        'Sign in failed',
        true,
        error
      );
    }
  }

  static async signInWithGoogle() {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      throw new AppError(
        ErrorCodes.AUTH,
        'Google sign in failed',
        true,
        error
      );
    }
  }

  static async signOut() {
    try {
      await auth().signOut();
    } catch (error) {
      throw new AppError(
        ErrorCodes.AUTH,
        'Sign out failed',
        true,
        error
      );
    }
  }
}