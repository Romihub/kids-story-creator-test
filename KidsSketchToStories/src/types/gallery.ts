// src/types/gallery.ts
export interface BaseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  title: string;
}

export interface Drawing extends BaseItem {
  type: 'drawing';
  imageUrl: string;
  strokes?: any[]; // Add specific stroke type if needed
}

export interface Story extends BaseItem {
  type: 'story';
  pages: Array<{
    content: string;
    drawing?: {
      id: string;
      imageUrl: string;
    };
  }>;
}

// Type guard functions to help with type checking
export const isDrawing = (item: Drawing | Story): item is Drawing => {
  return item.type === 'drawing';
};

export const isStory = (item: Drawing | Story): item is Story => {
  return item.type === 'story';
};