// src/hooks/useAI.ts
import { useState } from 'react';
import { AIService } from '../services/ai/AIService';
import { AppError, ErrorCodes } from '../types/error';
import type { EnhanceOptions, Character } from '../types/ai';

interface AIState {
  loading: boolean;
  error: Error | null;
  progress: number;
}

// Add new interface to define return type
interface UseAIReturn {
  enhanceStory: (content: string, options: EnhanceOptions) => Promise<string>;
  generateIllustrations: (scene: string, style: string) => Promise<string[]>;
  suggestCharacters: (story: string) => Promise<Character[]>;
  cartoonizeImage: (imageUri: string) => Promise<string>;
  loading: boolean;
  error: Error | null;
  progress: number;
}

export const useAI = (): UseAIReturn => {
  const [state, setState] = useState<AIState>({
    loading: false,
    error: null,
    progress: 0,
  });

  const enhanceStory = async (content: string, options: EnhanceOptions) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const enhanced = await AIService.enhance(content, options, (progress) => {
        setState(prev => ({ ...prev, progress }));
      });
      return enhanced;
    } catch (error) {
      throw new AppError(ErrorCodes.AI, 'Failed to enhance story', false, { content });
    } finally {
      setState(prev => ({ ...prev, loading: false, progress: 0 }));
    }
  };

  const generateIllustrations = async (scene: string, style: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      return await AIService.generateImages(scene, style);
    } catch (error) {
      throw new AppError(ErrorCodes.AI, 'Failed to generate illustrations');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const suggestCharacters = async (story: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      return await AIService.suggestCharacters(story);
    } catch (error) {
      throw new AppError(ErrorCodes.AI, 'Failed to suggest characters');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const cartoonizeImage = async (imageUri: string): Promise<string> => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const cartoonized = await AIService.cartoonizeImage(imageUri, (progress) => {
        setState(prev => ({ ...prev, progress }));
      });
      return cartoonized;
    } catch (error) {
      throw new AppError(ErrorCodes.AI, 'Failed to cartoonize image', false, { imageUri });
    } finally {
      setState(prev => ({ ...prev, loading: false, progress: 0 }));
    }
  };

  return {
    enhanceStory,
    generateIllustrations,
    suggestCharacters,
    cartoonizeImage,
    loading: state.loading,
    error: state.error,
    progress: state.progress,
  };
}; 