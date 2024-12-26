// src/hooks/useAnalyticsTracking.ts
import { useCallback } from 'react';
import { AdvancedAnalytics } from '../services/AdvancedAnalytics';

export const useAnalyticsTracking = () => {
  const trackScreenView = useCallback((screenName: string, params?: Record<string, any>) => {
    AdvancedAnalytics.trackScreenView(screenName, params);
  }, []);

  const trackUserAction = useCallback((action: string, data: Record<string, any>) => {
    AdvancedAnalytics.trackUserAction(action, data);
  }, []);

  return {
    trackScreenView,
    trackUserAction
  };
};