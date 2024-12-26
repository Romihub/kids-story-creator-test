// src/tests/integration.test.ts
describe('Integration Tests', () => {
    test('should sync data across platforms', async () => {
      const googleDrive = new GoogleDriveIntegration();
      await googleDrive.initialize();
  
      const stories = mockStories;
      await googleDrive.backupStories(stories);
  
      const restoredStories = await googleDrive.restoreStories();
      expect(restoredStories).toEqual(stories);
    });
});