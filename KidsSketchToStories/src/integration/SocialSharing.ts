// src/integration/SocialSharing.ts
export class SocialSharingIntegration {
    async shareToMultiplePlatforms(content: ShareableContent) {
      const platforms = ['instagram', 'facebook', 'twitter'];
      const results = await Promise.all(
        platforms.map(platform => this.shareToPlaftorm(platform, content))
      );
      
      return this.aggregateResults(results);
    }
}