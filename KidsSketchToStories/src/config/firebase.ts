// src/config/firebase.ts
import auth from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import firebase from '@react-native-firebase/app';

// Export Firebase instances
export const db = firestore();
export const fbAuth = auth();
export const fbStorage = storage();
export const fbAnalytics = analytics();
export const fbMessaging = messaging();
export const fbCrashlytics = crashlytics();

// Export Firestore utility functions
export const FieldValue = {
    serverTimestamp: () => firestore.FieldValue.serverTimestamp(),
    increment: (n: number) => firestore.FieldValue.increment(n),
    arrayUnion: (...elements: any[]) => firestore.FieldValue.arrayUnion(...elements),
    arrayRemove: (...elements: any[]) => firestore.FieldValue.arrayRemove(...elements)
};

// Export type definitions
export type DocumentData = FirebaseFirestoreTypes.DocumentData;
export type Timestamp = FirebaseFirestoreTypes.Timestamp;
export type DocumentSnapshot = FirebaseFirestoreTypes.DocumentSnapshot;
export type QuerySnapshot = FirebaseFirestoreTypes.QuerySnapshot;
export type CollectionReference = FirebaseFirestoreTypes.CollectionReference;
export type DocumentReference = FirebaseFirestoreTypes.DocumentReference;

// Configure Firestore settings
db.settings({
    cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
    persistence: true
});

// Export base Firebase app
export { firebase };