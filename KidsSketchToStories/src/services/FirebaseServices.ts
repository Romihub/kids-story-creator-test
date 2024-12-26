// src/services/FirebaseServices.ts
import { db, fbAuth, fbStorage, fbAnalytics, fbCrashlytics } from '../config/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// Basic type for document with timestamps
interface BaseDocument {
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
}

// User document type
interface UserData extends BaseDocument {
  email: string;
  displayName?: string;
  [key: string]: any;
}

// Story document type
interface StoryData extends BaseDocument {
  userId: string;
  title: string;
  content: string;
  coverUrl?: string;
  status: 'draft' | 'published';
  [key: string]: any;
}

type QueryOperator = '<' | '<=' | '==' | '>=' | '>' | '!=' | 'array-contains' | 'array-contains-any' | 'in' | 'not-in';
type QueryTuple = [string, QueryOperator, any];

export class FirebaseServices {
  // Authentication Methods
  static async signIn(email: string, password: string) {
    try {
      const userCredential = await fbAuth.signInWithEmailAndPassword(email, password);
      await fbAnalytics.logEvent('user_login');
      return userCredential.user;
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  static async signUp(email: string, password: string, userData: Partial<UserData>) {
    try {
      const userCredential = await fbAuth.createUserWithEmailAndPassword(email, password);
      
      // Create user document
      await db.collection('users').doc(userCredential.user.uid).set({
        ...userData,
        email,
        createdAt: FirebaseFirestoreTypes.Timestamp.now(),
        updatedAt: FirebaseFirestoreTypes.Timestamp.now()
      });

      await fbAnalytics.logEvent('user_signup');
      return userCredential.user;
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  static async signOut() {
    try {
      await fbAuth.signOut();
      await fbAnalytics.logEvent('user_logout');
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  // Firestore Methods
  static async getDocument<T extends BaseDocument>(collection: string, id: string): Promise<(T & { id: string }) | null> {
    try {
      const doc = await db.collection(collection).doc(id).get();
      return doc.exists ? { id: doc.id, ...(doc.data() as T) } : null;
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  static async setDocument<T extends BaseDocument>(collection: string, id: string, data: Partial<T>) {
    try {
      await db.collection(collection).doc(id).set({
        ...data,
        updatedAt: FirebaseFirestoreTypes.Timestamp.now()
      }, { merge: true });
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  static async addDocument<T extends BaseDocument>(collection: string, data: Omit<T, keyof BaseDocument>) {
    try {
      const docRef = await db.collection(collection).add({
        ...data,
        createdAt: FirebaseFirestoreTypes.Timestamp.now(),
        updatedAt: FirebaseFirestoreTypes.Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  static async queryDocuments<T extends BaseDocument>(
    collection: string,
    queries: QueryTuple[]
  ): Promise<(T & { id: string })[]> {
    try {
      let queryRef = db.collection(collection) as FirebaseFirestoreTypes.Query;
      
      queries.forEach(([field, operator, value]) => {
        queryRef = queryRef.where(field, operator, value);
      });
      
      const snapshot = await queryRef.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as T) }));
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  // Storage Methods
  static async uploadFile(uri: string, path: string, onProgress?: (progress: number) => void) {
    try {
      const reference = fbStorage.ref(path);
      const task = reference.putFile(uri);

      if (onProgress) {
        task.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        });
      }

      await task;
      const url = await reference.getDownloadURL();
      
      await fbAnalytics.logEvent('file_upload', { path });
      return url;
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  static async deleteFile(path: string) {
    try {
      await fbStorage.ref(path).delete();
      await fbAnalytics.logEvent('file_delete', { path });
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  // Story Methods
  static async createStory(userId: string, storyData: Partial<StoryData>, coverImage?: string) {
    try {
      let coverUrl = '';
      if (coverImage) {
        coverUrl = await this.uploadFile(
          coverImage,
          `users/${userId}/stories/covers/${Date.now()}.jpg`
        );
      }

      const storyId = await this.addDocument<StoryData>('stories', {
        ...storyData,
        userId,
        coverUrl,
        status: 'draft',
        title: storyData.title || '',
        content: storyData.content || ''
      });

      await fbAnalytics.logEvent('story_created', { storyId });
      return storyId;
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  static async getUserStories(userId: string): Promise<(StoryData & { id: string })[]> {
    try {
      const stories = await this.queryDocuments<StoryData>('stories', [
        ['userId', '==', userId]
      ]);
      return stories.sort((a, b) => 
        b.createdAt.toMillis() - a.createdAt.toMillis()
      );
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  // Analytics Methods
  static async logEvent(eventName: string, params?: Record<string, any>) {
    try {
      await fbAnalytics.logEvent(eventName, params);
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
    }
  }

  static async logScreenView(screenName: string) {
    try {
      await fbAnalytics.logScreenView({
        screen_name: screenName,
        screen_class: screenName
      });
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
    }
  }

  // Batch Operations
  static async batchUpdate<T extends BaseDocument>(operations: Array<{
    collection: string;
    id: string;
    data: Partial<T>;
  }>) {
    try {
      const batch = db.batch();
      
      operations.forEach(({ collection, id, data }) => {
        const ref = db.collection(collection).doc(id);
        batch.update(ref, {
          ...data,
          updatedAt: FirebaseFirestoreTypes.Timestamp.now()
        });
      });

      await batch.commit();
    } catch (error) {
      fbCrashlytics.recordError(error as Error);
      throw error;
    }
  }

  // Real-time subscriptions
  static subscribeToDocument<T extends BaseDocument>(
    collection: string,
    id: string,
    callback: (data: T & { id: string }) => void
  ) {
    return db.collection(collection).doc(id).onSnapshot(
      doc => callback({ id: doc.id, ...(doc.data() as T) }),
      error => fbCrashlytics.recordError(error)
    );
  }

  static subscribeToQuery<T extends BaseDocument>(
    collection: string,
    queries: QueryTuple[],
    callback: (data: (T & { id: string })[]) => void
  ) {
    let queryRef = db.collection(collection) as FirebaseFirestoreTypes.Query;
    
    queries.forEach(([field, operator, value]) => {
      queryRef = queryRef.where(field, operator, value);
    });

    return queryRef.onSnapshot(
      snapshot => callback(
        snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as T) }))
      ),
      error => fbCrashlytics.recordError(error)
    );
  }
}

// Usage Examples:
/*
// Authentication
await FirebaseServices.signIn('email@example.com', 'password');

// Create Story
const storyId = await FirebaseServices.createStory('userId123', {
  title: 'My Story',
  content: 'Once upon a time...'
}, 'path/to/cover.jpg');

// Real-time Updates
const unsubscribe = FirebaseServices.subscribeToDocument('stories', storyId, (story) => {
  console.log('Story updated:', story);
});

// Batch Updates
await FirebaseServices.batchUpdate([
  { collection: 'stories', id: 'story1', data: { status: 'published' } },
  { collection: 'stories', id: 'story2', data: { status: 'published' } }
]);

// Clean up subscription
unsubscribe();
*/