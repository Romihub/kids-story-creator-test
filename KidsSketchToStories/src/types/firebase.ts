// src/types/firebase.ts
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export interface MessageType extends FirebaseMessagingTypes.RemoteMessage {}

export interface FirestoreIndexes {
  indexes: Array<{
    collectionGroup: string;
    queryScope: 'COLLECTION' | 'COLLECTION_GROUP';
    fields: Array<{
      fieldPath: string;
      order: 'ASCENDING' | 'DESCENDING';
    }>;
  }>;
  fieldOverrides: Array<{
    collectionGroup: string;
    fieldPath: string;
    ttl: boolean;
    indexes: Array<{
      order: 'ASCENDING' | 'DESCENDING';
      queryScope: 'COLLECTION' | 'COLLECTION_GROUP';
    }>;
  }>;
}