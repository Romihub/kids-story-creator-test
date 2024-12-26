// src/services/profile/enhanced.ts
export class UserProfileService {
    static async updateProfile(userId: string, data: Partial<UserProfile>) {
      try {
        // Update Firestore
        await firestore()
          .collection('users')
          .doc(userId)
          .update(data);
  
        // Update local storage
        await AsyncStorage.setItem(
          `user_profile_${userId}`,
          JSON.stringify(data)
        );
  
        // Track update
        await EnhancedAnalytics.trackProfileUpdate(data);
  
      } catch (error) {
        throw new AppError(
          ErrorCodes.PROFILE,
          'Profile update failed',
          true,
          error
        );
      }
    }
  
    static async getPreferences(userId: string): Promise<UserPreferences> {
      try {
        const doc = await firestore()
          .collection('users')
          .doc(userId)
          .collection('preferences')
          .doc('settings')
          .get();
  
        return doc.data() as UserPreferences;
      } catch (error) {
        throw new AppError(
          ErrorCodes.PROFILE,
          'Failed to fetch preferences',
          true,
          error
        );
      }
    }
}