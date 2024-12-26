// src/tests/extended/Performance.test.ts
describe('Performance Tests', () => {
    test('Story generation performance', async () => {
      const metrics = await measurePerformance(() => generateStory());
      
      expect(metrics.duration).toBeLessThan(3000);
      expect(metrics.memoryUsage).toBeLessThan(100 * 1024 * 1024);
    });
});