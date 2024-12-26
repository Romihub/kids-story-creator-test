// src/services/firebase/analytics-service.ts
import analytics from '@react-native-firebase/analytics';
import { crashlyticsService } from './crashlytics-service';

export class AnalyticsService {
  static async logEvent(eventName: string, params?: object): Promise<void> {
    try {
      await analytics().logEvent(eventName, params);
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'analytics_log_event_error');
    }
  }

  static async logScreenView(screenName: string, screenClass?: string): Promise<void> {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenClass || screenName,
      });
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'analytics_screen_view_error');
    }
  }

  static async logUserProperty(name: string, value: string): Promise<void> {
    try {
      await analytics().setUserProperty(name, value);
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'analytics_user_property_error');
    }
  }

  static async logPurchase(amount: number, currency: string): Promise<void> {
    try {
      await analytics().logPurchase({
        value: amount,
        currency: currency,
      });
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'analytics_purchase_error');
    }
  }
}