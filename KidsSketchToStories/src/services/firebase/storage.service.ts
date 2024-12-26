// src/services/firebase/storage-service.ts
import storage from '@react-native-firebase/storage';
import { crashlyticsService } from './crashlytics-service';

export class StorageService {
  // Original methods
  static async uploadImage(uri: string, path: string): Promise<string> {
    try {
      const reference = storage().ref(path);
      await reference.putFile(uri);
      return reference.getDownloadURL();
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'upload_image_error');
      throw error;
    }
  }

  static async uploadStoryAsset(userId: string, uri: string, type: 'image' | 'audio'): Promise<string> {
    try {
      const extension = uri.split('.').pop();
      const path = `users/${userId}/stories/${Date.now()}.${extension}`;
      return this.uploadImage(uri, path);
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'upload_story_asset_error');
      throw error;
    }
  }

  static async deleteFile(path: string): Promise<void> {
    try {
      await storage().ref(path).delete();
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'delete_file_error');
      throw error;
    }
  }

  // Enhanced methods with progress tracking
  static async uploadWithProgress(
    uri: string, 
    path: string, 
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      const reference = storage().ref(path);
      const task = reference.putFile(uri);

      if (onProgress) {
        task.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        });
      }

      await task;
      return reference.getDownloadURL();
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'upload_with_progress_error');
      throw error;
    }
  }

  static async uploadUserContent(
    userId: string,
    uri: string,
    contentType: 'drawings' | 'stories' | 'photos',
    fileName: string,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      const path = `users/${userId}/${contentType}/${fileName}`;
      return this.uploadWithProgress(uri, path, onProgress);
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'upload_user_content_error');
      throw error;
    }
  }

  static async getDownloadURL(path: string): Promise<string> {
    try {
      return await storage().ref(path).getDownloadURL();
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'get_download_url_error');
      throw error;
    }
  }

  static async listFiles(path: string): Promise<string[]> {
    try {
      const reference = storage().ref(path);
      const result = await reference.listAll();
      return result.items.map(item => item.fullPath);
    } catch (error) {
      crashlyticsService.recordError(error as Error, 'list_files_error');
      throw error;
    }
  }
}