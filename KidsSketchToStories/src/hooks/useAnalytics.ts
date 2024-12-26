// src/hooks/useAnalytics.ts
import { useCallback } from 'react';
import { AdvancedAnalytics } from '../services/AdvancedAnalytics';

export const useAnalytics = () => {
  const trackScreenEngagement = useCallback(async (screenName: string) => {
    const startTime = Date.now();
    return () => {
      const duration = Date.now() - startTime;
      AdvancedAnalytics.trackUserJourney({
        stage: screenName,
        timeSpent: duration,
        success: true,
        completionRate: 1
      });
    };
  }, []);

  const trackFeatureUsage = useCallback(async (featureId: string) => {
    const startTime = Date.now();
    let interactionCount = 0;

    return {
      incrementInteraction: () => {
        interactionCount++;
      },
      complete: async (success: boolean) => {
        const duration = Date.now() - startTime;
        await AdvancedAnalytics.trackFeatureEngagement({
          featureId,
          usageDuration: duration,
          interactionCount,
          successRate: success ? 1 : 0
        });
      }
    };
  }, []);

  return {
    trackScreenEngagement,
    trackFeatureUsage
  };
};