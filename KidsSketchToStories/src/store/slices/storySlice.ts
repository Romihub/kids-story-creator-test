//src/store/slices/storySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define Story interface
export interface Story {
  id: string;
  title: string;
  pages: Array<{
    content: string;
    drawing?: {
      id: string;
      imageUrl: string;
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

interface StoryState {
  stories: Story[];
  currentStory: Story | null;
  loading: boolean;
  error: string | null;
}

const initialState: StoryState = {
  stories: [],
  currentStory: null,
  loading: false,
  error: null,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<Story[]>) => {
      state.stories = action.payload;
    },
    setCurrentStory: (state, action: PayloadAction<Story>) => {
      state.currentStory = action.payload;
    },
    addStory: (state, action: PayloadAction<Story>) => {
      state.stories.push(action.payload);
    },
    updateStory: (state, action: PayloadAction<Story>) => {
      const index = state.stories.findIndex(story => story.id === action.payload.id);
      if (index !== -1) {
        state.stories[index] = action.payload;
      }
    },
    deleteStory: (state, action: PayloadAction<string>) => {
      state.stories = state.stories.filter(story => story.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  setStories,
  setCurrentStory,
  addStory,
  updateStory,
  deleteStory,
  setLoading,
  setError,
} = storySlice.actions;

// Export reducer
export default storySlice.reducer;

// Export state type for use with useSelector
export type StoryRootState = {
  story: StoryState;
};