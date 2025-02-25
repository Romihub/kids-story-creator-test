import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';

export interface SubscriptionState {
  type: 'free' | 'pro' | null;
  expiresAt: string | null;
  features: string[];
  storiesGenerated: number; // Track number of stories generated
  maxFreeStories: number; // Maximum stories allowed for free users
}

const initialState: SubscriptionState = {
  type: null,
  expiresAt: null,
  features: [],
  storiesGenerated: 0,
  maxFreeStories: 3, // Free users can generate 3 short stories
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<Omit<SubscriptionState, 'storiesGenerated' | 'maxFreeStories'>>) => {
      state.type = action.payload.type;
      state.expiresAt = action.payload.expiresAt;
      state.features = action.payload.features;
    },
    incrementStoriesGenerated: (state) => {
      state.storiesGenerated += 1;
    },
    clearSubscription: (state) => {
      state.type = null;
      state.expiresAt = null;
      state.features = [];
      state.storiesGenerated = 0;
    },
    resetStoriesCount: (state) => {
      state.storiesGenerated = 0;
    }
  },
});

export const { 
  setSubscription, 
  clearSubscription, 
  incrementStoriesGenerated,
  resetStoriesCount 
} = subscriptionSlice.actions;

// Selectors
export const selectUserSubscription = (state: RootState) => state.subscription;
export const selectIsProUser = (state: RootState) => state.subscription.type === 'pro';
export const selectCanGenerateStory = (state: RootState) => {
  const { type, storiesGenerated, maxFreeStories } = state.subscription;
  if (type === 'pro') return true;
  return storiesGenerated < maxFreeStories;
};
export const selectStoriesRemaining = (state: RootState) => {
  const { type, storiesGenerated, maxFreeStories } = state.subscription;
  if (type === 'pro') return Infinity;
  return Math.max(0, maxFreeStories - storiesGenerated);
};

export default subscriptionSlice.reducer;
