// src/tests/automation/scenarios/PerformanceTests.ts
export class PerformanceTests {
    @Test('Story generation performance under load')
    async testStoryGenerationPerformance() {
      const metrics = new PerformanceMetrics();
      
      // Test with increasing load
      for (let i = 1; i <= 100; i++) {
        await metrics.measure(async () => {
          const story = await StoryGenerator.generate({
            complexity: 'high',
            length: 'medium',
            withImages: true
          });
          
          metrics.record({
            generationTime: story.generationTime,
            memoryUsage: process.memoryUsage(),
            responseSize: JSON.stringify(story).length
          });
        });
      }
  
      expect(metrics.averageGenerationTime).toBeLessThan(3000);
      expect(metrics.maxMemoryUsage).toBeLessThan(1024 * 1024 * 100);
    }
}