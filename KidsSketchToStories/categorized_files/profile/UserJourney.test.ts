// src/tests/extended/UserJourney.test.ts
describe('User Journey Tests', () => {
    test('Complete onboarding flow', async () => {
      await navigateToOnboarding();
      await completeProfileSetup();
      await selectPreferences();
      await finishTutorial();
      
      expect(getCurrentScreen()).toBe('HomeScreen');
    });
  
    test('Story creation journey', async () => {
      await startNewStory();
      await createDrawing();
      await generateStory();
      await customizeStory();
      await saveAndShare();
      
      expect(getStoryStatus()).toBe('published');
    });
});