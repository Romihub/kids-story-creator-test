//src/types/story.ts
export interface StoryPage {
    content: string;
    drawing?: {
      id: string;
      imageUrl: string;
    };
    narration?: string;
    updatedAt: string;
}
  
export interface Story {
    id: string;
    title: string;
    authorName?: string;
    coverPhoto?: string;
    pages: StoryPage[];
    createdAt: string;
    updatedAt: string;
    ageGroup: '3-6' | '7-9' | '10-12';
    status?: 'draft' | 'published';
}

export interface CreateStoryInput extends Partial<Omit<Story, 'id' | 'createdAt' | 'updatedAt'>> {
    title: string;
}