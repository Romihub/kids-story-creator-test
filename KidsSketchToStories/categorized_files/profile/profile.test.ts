// src/tests/profile.test.ts
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ProfileManager } from '../services/profile/ProfileManager';
import { mockProfileData } from './mocks/profileData';

describe('Profile Manager', () => {
  beforeEach(() => {
    // Set up test environment
    jest.clearAllMocks();
  });

  test('should update user profile successfully', async () => {
    const updates = {
      displayName: 'New Name',
      avatar: 'new-avatar.jpg'
    };

    const result = await ProfileManager.updateProfile('user123', updates);
    expect(result).toBeTruthy();
  });

  test('should handle profile update errors', async () => {
    // Mock error scenario
    jest.spyOn(ProfileManager, 'updateProfile')
      .mockRejectedValue(new Error('Update failed'));

    await expect(
      ProfileManager.updateProfile('user123', {})
    ).rejects.toThrow('Update failed');
  });
});