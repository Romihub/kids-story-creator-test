// src/services/firebase/index.ts
import { db, fbAuth, fbStorage, fbAnalytics, fbCrashlytics, fbMessaging } from '../../config/firebase';
import type { MessageType } from '../../types/firebase';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

// Initialize Firebase services
const initializeServices = async () => {
  try {
    // Request messaging permission
    const hasPermission = await messaging.requestPermission();
    
    if (hasPermission) {
      const token = await messaging.getFCMToken();
      if (token) {
        console.log('FCM Token:', token);
        // Store token for later use
        await storage.setFCMToken(token);
      }
    }

    // Set up background handler
    fbMessaging.setBackgroundMessageHandler(async (remoteMessage: MessageType) => {
      console.log('Background message:', remoteMessage);
      await analytics.logEvent('background_message_received', remoteMessage.data);
    });

    // Set up auth state observer
    fbAuth.onAuthStateChanged(async (user) => {
      if (user) {
        await crashlytics.setUserId(user.uid);
        await analytics.logEvent('user_authenticated');
      } else {
        await crashlytics.setUserId('');
        await analytics.logEvent('user_signed_out');
      }
    });

    console.log('Firebase services initialized');
    await analytics.logEvent('app_initialized');
  } catch (error) {
    console.error('Firebase initialization error:', error);
    crashlytics.recordError(error as Error);
  }
};

// Message handling
const messaging = {
  async requestPermission() {
      try {
        const authStatus = await fbMessaging.requestPermission();
        return (
          authStatus === FirebaseMessagingTypes.AuthorizationStatus.AUTHORIZED ||
          authStatus === FirebaseMessagingTypes.AuthorizationStatus.PROVISIONAL
        );
      } catch (error) {
        crashlytics.recordError(error as Error);
        return false;
      }
  },
  
  async getFCMToken() {
      try {
        return await fbMessaging.getToken();
      } catch (error) {
        crashlytics.recordError(error as Error);
        return null;
      }
  },
  
  onMessage(callback: (message: FirebaseMessagingTypes.RemoteMessage) => void) {
      return fbMessaging.onMessage(callback);
  },

  async subscribeTopic(topic: string) {
    try {
      await fbMessaging.subscribeToTopic(topic);
      await analytics.logEvent('topic_subscribed', { topic });
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  async unsubscribeTopic(topic: string) {
    try {
      await fbMessaging.unsubscribeFromTopic(topic);
      await analytics.logEvent('topic_unsubscribed', { topic });
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  }
};

// Auth handling
const auth = {
  async signIn(email: string, password: string) {
    try {
      const result = await fbAuth.signInWithEmailAndPassword(email, password);
      await analytics.logEvent('user_login', { method: 'email' });
      return result;
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  async signUp(email: string, password: string, userData?: Record<string, any>) {
    try {
      const result = await fbAuth.createUserWithEmailAndPassword(email, password);
      if (userData && result.user) {
        await firestore.setDocument('users', result.user.uid, {
          email,
          ...userData,
          createdAt: new Date()
        });
      }
      await analytics.logEvent('user_signup', { method: 'email' });
      return result;
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  async signOut() {
    try {
      await fbAuth.signOut();
      await analytics.logEvent('user_logout');
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  onAuthStateChanged(callback: FirebaseAuthTypes.AuthListenerCallback) {
    return fbAuth.onAuthStateChanged(callback);
  },

  getCurrentUser() {
    return fbAuth.currentUser;
  }
};

// Storage handling
const storage = {
  async uploadFile(filePath: string, storagePath: string, onProgress?: (progress: number) => void) {
    try {
      const reference = fbStorage.ref(storagePath);
      const task = reference.putFile(filePath);

      if (onProgress) {
        task.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        });
      }

      await task;
      const url = await reference.getDownloadURL();
      await analytics.logEvent('file_uploaded', { path: storagePath });
      return url;
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  async deleteFile(storagePath: string) {
    try {
      await fbStorage.ref(storagePath).delete();
      await analytics.logEvent('file_deleted', { path: storagePath });
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  async setFCMToken(token: string) {
    try {
      const user = auth.getCurrentUser();
      if (user) {
        await firestore.setDocument('users', user.uid, {
          fcmToken: token,
          tokenUpdatedAt: new Date()
        }, true);
      }
    } catch (error) {
      crashlytics.recordError(error as Error);
    }
  }
};

// Firestore handling
const firestore = {
  async getDocument(collection: string, id: string) {
    try {
      const doc = await db.collection(collection).doc(id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  async setDocument(collection: string, id: string, data: any, merge = false) {
    try {
      await db.collection(collection).doc(id).set(data, { merge });
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  async updateDocument(collection: string, id: string, data: any) {
    try {
      await db.collection(collection).doc(id).update(data);
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  async deleteDocument(collection: string, id: string) {
    try {
      await db.collection(collection).doc(id).delete();
    } catch (error) {
      crashlytics.recordError(error as Error);
      throw error;
    }
  },

  onDocumentChange(collection: string, id: string, callback: (data: any) => void) {
    return db.collection(collection).doc(id).onSnapshot(
      doc => callback({ id: doc.id, ...doc.data() }),
      error => crashlytics.recordError(error)
    );
  }
};

// Analytics handling
const analytics = {
  async logEvent(eventName: string, params?: Record<string, any>) {
    try {
      await fbAnalytics.logEvent(eventName, params);
    } catch (error) {
      crashlytics.recordError(error as Error);
    }
  },

  async logScreenView(screenName: string, screenClass?: string) {
    try {
      await fbAnalytics.logScreenView({
        screen_name: screenName,
        screen_class: screenClass || screenName
      });
    } catch (error) {
      crashlytics.recordError(error as Error);
    }
  },

  async setUserProperties(properties: Record<string, string>) {
    try {
      const entries = Object.entries(properties);
      await Promise.all(
        entries.map(([name, value]) => fbAnalytics.setUserProperty(name, value))
      );
    } catch (error) {
      crashlytics.recordError(error as Error);
    }
  }
};

// Crashlytics handling
const crashlytics = {
  async setUserId(userId: string) {
    await fbCrashlytics.setUserId(userId);
  },

  recordError(error: Error, jsErrorName?: string) {
    fbCrashlytics.recordError(error, jsErrorName);
  },

  log(message: string) {
    fbCrashlytics.log(message);
  },

  async setAttribute(key: string, value: string) {
    await fbCrashlytics.setAttribute(key, value);
  }
};

export {
  initializeServices,
  messaging,
  auth,
  storage,
  firestore,
  analytics,
  crashlytics
};