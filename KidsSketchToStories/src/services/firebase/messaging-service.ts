// src/services/firebase/messaging-service.ts
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class MessagingService {
  private messaging = messaging();

  async requestPermission(): Promise<boolean> {
    try {
      const authStatus = await this.messaging.requestPermission();
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    } catch (error) {
      console.error('Messaging permission request error:', error);
      return false;
    }
  }

  async getFCMToken(): Promise<string | null> {
    try {
      return await this.messaging.getToken();
    } catch (error) {
      console.error('Get FCM token error:', error);
      return null;
    }
  }

  async subscribeTopic(topic: string): Promise<void> {
    try {
      await this.messaging.subscribeToTopic(topic);
    } catch (error) {
      console.error('Topic subscription error:', error);
      throw error;
    }
  }

  async unsubscribeTopic(topic: string): Promise<void> {
    try {
      await this.messaging.unsubscribeFromTopic(topic);
    } catch (error) {
      console.error('Topic unsubscription error:', error);
      throw error;
    }
  }

  onMessage(callback: (message: any) => void) {
    return this.messaging.onMessage(callback);
  }

  onNotificationOpenedApp(callback: (message: any) => void) {
    return this.messaging.onNotificationOpenedApp(callback);
  }

  async getInitialNotification() {
    return await this.messaging.getInitialNotification();
  }

  // Configure background handler
  setBackgroundMessageHandler(handler: (message: any) => Promise<void>) {
    messaging().setBackgroundMessageHandler(handler);
  }
}

export const messagingService = new MessagingService();