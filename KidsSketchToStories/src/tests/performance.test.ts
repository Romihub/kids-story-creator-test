// src/tests/performance.test.ts
describe('Performance Tests', () => {
    test('should load profile data within threshold', async () => {
      const startTime = performance.now();
      
      await ProfileManager.getProfileSettings('user123');
      
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      expect(loadTime).toBeLessThan(1000); // 1 second threshold
    });
});