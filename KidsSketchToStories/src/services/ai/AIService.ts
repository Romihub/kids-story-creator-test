// src/services/ai/AIService.ts
import { AI_API_KEY } from '@env';
import type { EnhanceOptions, Character, AIResponse } from '../../types/ai';
import { AppError, ErrorCodes } from '../../types/error';
import axios from 'axios';

type ProgressCallback = (progress: number) => void;

export class AIService {
  private static readonly API_URL = 'https://api.ai-service.com/v1';

  static async enhance(
    content: string, 
    options: EnhanceOptions,
    onProgress?: ProgressCallback
  ): Promise<string> {
    try {
      const response = await fetch(`${this.API_URL}/enhance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, options }),
      });

      if (!response.ok) throw new Error('Enhancement failed');
      const data = await response.json();
      return data.content;
    } catch (error) {
      throw new AppError(ErrorCodes.AI, 'Story enhancement failed');
    }
  }

  static async generateImages(scene: string, style: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.API_URL}/generate-images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scene, style }),
      });
      
      if (!response.ok) throw new Error('Image generation failed');
      const data = await response.json();
      return data.images;
    } catch (error) {
      throw new AppError(ErrorCodes.AI, 'Failed to generate images');
    }
  }

  static async suggestCharacters(story: string): Promise<Character[]> {
    try {
      const response = await fetch(`${this.API_URL}/suggest-characters`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story }),
      });
      
      if (!response.ok) throw new Error('Character suggestion failed');
      const data = await response.json();
      return data.characters;
    } catch (error) {
      throw new AppError(ErrorCodes.AI, 'Failed to suggest characters');
    }
  }

  static async cartoonizeImage(imageUri: string, onProgress?: (progress: number) => void): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await axios.post(`${this.API_URL}/api/cartoonize`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            onProgress(progress);
          }
        },
      });

      return response.data.cartoonizedImageUrl;
    } catch (error) {
      console.error('Cartoonization failed:', error);
      throw error;
    }
  }
} 