// src/tests/automation/VisualRegression.ts
export class VisualRegressionTests {
    async compareScreenshots() {
      const screens = ['home', 'drawing', 'story'];
      
      for (const screen of screens) {
        const currentScreenshot = await this.captureScreen(screen);
        const baselineScreenshot = await this.getBaseline(screen);
        
        const diff = await this.compareImages(
          currentScreenshot,
          baselineScreenshot
        );
        
        if (diff.different) {
          await this.reportVisualRegression(screen, diff);
        }
      }
    }
}