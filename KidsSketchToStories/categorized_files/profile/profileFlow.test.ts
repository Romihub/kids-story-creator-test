// src/tests/e2e/profileFlow.test.ts
import { device, element, by } from 'detox';

describe('Profile Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should allow user to update profile settings', async () => {
    await element(by.id('profileSettingsButton')).tap();
    await element(by.id('displayNameInput')).typeText('New Name');
    await element(by.id('saveButton')).tap();

    await expect(element(by.text('Profile Updated'))).toBeVisible();
  });
});