// src/services/firebase/firestore-service.ts
import firestore from '@react-native-firebase/firestore';
import { crashlyticsService } from './crashlytics-service';

export class FirestoreService {
  static async getDocument(collection: string, id: string): Promise<any> {
    try {
      const doc = await firestore().collection(collection).doc(id).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'firestore_get_doc_error');
      throw error;
    }
  }

  static async setDocument(collection: string, id: string, data: any): Promise<void> {
    try {
      await firestore().collection(collection).doc(id).set(data, { merge: true });
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'firestore_set_doc_error');
      throw error;
    }
  }

  static async updateDocument(collection: string, id: string, data: any): Promise<void> {
    try {
      await firestore().collection(collection).doc(id).update(data);
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'firestore_update_doc_error');
      throw error;
    }
  }

  static async deleteDocument(collection: string, id: string): Promise<void> {
    try {
      await firestore().collection(collection).doc(id).delete();
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'firestore_delete_doc_error');
      throw error;
    }
  }

  static async queryDocuments(collection: string, field: string, operator: any, value: any): Promise<any[]> {
    try {
      const snapshot = await firestore()
        .collection(collection)
        .where(field, operator, value)
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'firestore_query_error');
      throw error;
    }
  }
}