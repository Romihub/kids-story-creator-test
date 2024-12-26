// src/services/firebase/crashlytics-service.ts
import crashlytics from '@react-native-firebase/crashlytics';

class CrashlyticsService {
  private crashlytics = crashlytics();

  async setUserId(userId: string): Promise<void> {
    await this.crashlytics.setUserId(userId);
  }

  async setAttribute(key: string, value: string): Promise<void> {
    await this.crashlytics.setAttribute(key, value);
  }

  async setAttributes(attributes: { [key: string]: string }): Promise<void> {
    await this.crashlytics.setAttributes(attributes);
  }

  log(message: string): void {
    this.crashlytics.log(message);
  }

  recordError(error: Error, jsErrorName?: string): void {
    this.crashlytics.recordError(error, jsErrorName);
  }

  async crash(): Promise<void> {
    await this.crashlytics.crash();
  }
}

export const crashlyticsService = new CrashlyticsService();