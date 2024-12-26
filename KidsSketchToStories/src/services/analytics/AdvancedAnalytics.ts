// src/services/analytics/AdvancedAnalytics.ts
import analytics from '@react-native-firebase/analytics';
import { Platform } from 'react-native';

export class AdvancedAnalytics {
  // User Journey Events
  static async trackUserJourney(data: {
    stage: string;
    success: boolean;
    timeSpent: number;
    completionRate: number;
  }) {
    await analytics().logEvent('user_journey', {
      stage: data.stage,
      success: data.success,
      time_spent: data.timeSpent,
      completion_rate: data.completionRate,
      platform: Platform.OS,
      timestamp: new Date().toISOString()
    });
  }

  // Drawing Analytics
  static async trackDrawingSession(data: {
    duration: number;
    toolsUsed: string[];
    colorsUsed: string[];
    undoCount: number;
    redoCount: number;
    canvasSize: string;
    completed: boolean;
  }) {
    await analytics().logEvent('drawing_session', {
      ...data,
      device_type: Platform.OS,
      timestamp: new Date().toISOString()
    });
  }

  // Story Generation Analytics
  static async trackStoryGeneration(data: {
    drawingId: string;
    generationTime: number;
    wordCount: number;
    ageGroup: string;
    theme: string;
    regenerationCount: number;
    success: boolean;
  }) {
    await analytics().logEvent('story_generation', {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  // Feature Usage Analytics
  static async trackFeatureEngagement(data: {
    featureId: string;
    usageDuration: number;
    interactionCount: number;
    successRate: number;
    userRating?: number;
  }) {
    await analytics().logEvent('feature_engagement', {
      ...data,
      subscription_tier: await this.getUserTier(),
      timestamp: new Date().toISOString()
    });
  }

  // Performance Analytics
  static async trackPerformanceMetrics(data: {
    screenName: string;
    loadTime: number;
    renderTime: number;
    memoryUsage: number;
    errorCount: number;
  }) {
    await analytics().logEvent('performance_metrics', {
      ...data,
      device_model: Platform.constants.Model,
      os_version: Platform.Version,
      timestamp: new Date().toISOString()
    });
  }

  // User Behavior Analytics
  static async trackUserBehavior(data: {
    action: string;
    context: string;
    result: string;
    metadata: any;
  }) {
    await analytics().logEvent('user_behavior', {
      ...data,
      session_id: await this.getSessionId(),
      timestamp: new Date().toISOString()
    });
  }

  // Custom Event Tracking
  static async trackCustomEvent(eventName: string, data: any) {
    await analytics().logEvent(eventName, {
      ...data,
      timestamp: new Date().toISOString(),
      user_tier: await this.getUserTier(),
      session_id: await this.getSessionId()
    });
  }
}