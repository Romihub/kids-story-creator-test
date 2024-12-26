// src/tests/mocks/MockProfileService.ts
export class MockProfileService {
    static mockProfile = {
      id: 'user123',
      displayName: 'Test User',
      settings: {
        theme: 'light',
        notifications: true
      }
    };
  
    static async getProfile() {
      return this.mockProfile;
    }
  
    static async updateProfile(updates: any) {
      this.mockProfile = { ...this.mockProfile, ...updates };
      return this.mockProfile;
    }
}