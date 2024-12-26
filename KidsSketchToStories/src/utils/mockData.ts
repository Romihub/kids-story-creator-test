// src/utils/mockData.ts
export const mockStory = {
    id: '1',
    title: 'Test Story',
    pages: [
      {
        id: '1',
        content: 'Once upon a time...',
        image: 'test-image-1.jpg'
      },
      {
        id: '2',
        content: 'There was a brave little artist...',
        image: 'test-image-2.jpg'
      }
    ],
    ageGroup: '5-8',
    theme: 'adventure'
};
  
export const mockDrawing = {
    id: '1',
    strokes: [
      // Mock stroke data
    ],
    createdAt: new Date().toISOString()
};