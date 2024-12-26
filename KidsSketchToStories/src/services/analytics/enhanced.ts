// src/services/analytics/enhanced.ts
import analytics from '@react-native-firebase/analytics';
import { UserEngagement, StoryMetrics, DrawingMetrics } from './types';

export class EnhancedAnalytics {
  static async trackUserEngagement(data: UserEngagement) {
    await analytics().logEvent('user_engagement', {
      session_duration: data.sessionDuration,
      features_used: data.featuresUsed,
      completion_rate: data.completionRate,
      interaction_depth: data.interactionDepth
    });
  }

  static async trackStoryMetrics(metrics: StoryMetrics) {
    await analytics().logEvent('story_metrics', {
      generation_time: metrics.generationTime,
      word_count: metrics.wordCount,
      illustrations_count: metrics.illustrationsCount,
      engagement_score: metrics.engagementScore,
      sharing_count: metrics.sharingCount
    });
  }

  static async trackDrawingMetrics(metrics: DrawingMetrics) {
    await analytics().logEvent('drawing_metrics', {
      creation_time: metrics.creationTime,
      tools_used: metrics.toolsUsed,
      canvas_coverage: metrics.canvasCoverage,
      color_palette: metrics.colorPalette,
      complexity_score: metrics.complexityScore
    });
  }

  static async trackFeatureUsage(featureId: string, data: any) {
    await analytics().logEvent('feature_usage', {
      feature_id: featureId,
      duration: data.duration,
      success_rate: data.successRate,
      user_satisfaction: data.userSatisfaction
    });
  }
}