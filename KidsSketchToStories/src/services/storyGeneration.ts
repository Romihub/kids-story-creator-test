// src/services/storyGeneration.ts
//Multi-page Story Generation for Premium Users
import axios from 'axios';
import { useSubscription } from '../hooks/useSubscription';
import { API_URL } from '@env';

interface StoryGenerationOptions {
  baseContent: string;
  userImage?: string;
  authorName?: string;
  pageCount?: number;
  style?: string;
}

interface GeneratedPage {
  content: string;
  image?: string;
}

interface GeneratedStory {
  title: string;
  coverImage: string;
  pages: GeneratedPage[];
  author: string;
}

export class StoryGenerationService {
  static async generateStory(options: StoryGenerationOptions): Promise<GeneratedStory> {
    const { tier } = useSubscription();
    const pageCount = tier.id === 'free' ? 1 : (options.pageCount || 5);

    try {
      const response = await axios.post(`${API_URL}/ai/generate-story`, {
        ...options,
        pageCount,
        isPremium: tier.id !== 'free',
      });

      return response.data;
    } catch (error) {
      console.error('Failed to generate story:', error);
      throw new Error('Story generation failed');
    }
  }

  static async generateCoverWithUserPhoto(
    storyTheme: string,
    userPhoto: string,
    title: string
  ): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/ai/generate-cover`, {
        theme: storyTheme,
        userPhoto,
        title,
      });

      return response.data.coverUrl;
    } catch (error) {
      console.error('Failed to generate cover:', error);
      throw new Error('Cover generation failed');
    }
  }
}