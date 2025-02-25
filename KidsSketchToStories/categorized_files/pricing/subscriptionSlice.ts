// src/store/slices/subscriptionSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SubscriptionTier, SubscriptionStatus } from '../../types';
import { PaymentService } from '../../services/payment';

interface SubscriptionState {
  currentTier: SubscriptionTier;
  status: SubscriptionStatus;
  expiryDate: string | null;
  features: {
    remainingRegenerations: number;
    storiesCreated: number;
    storiesLimit: number;
  };
  loading: boolean;
  error: string | null;
}

export const purchaseSubscription = createAsyncThunk(
  'subscription/purchase',
  async ({ tierId, paymentMethodId }: { tierId: string; paymentMethodId: string }) => {
    const response = await PaymentService.createSubscription(tierId, paymentMethodId);
    return response;
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    currentTier: 'free',
    status: 'active',
    expiryDate: null,
    features: {
      remainingRegenerations: 1,
      storiesCreated: 0,
      storiesLimit: 3,
    },
    loading: false,
    error: null,
  } as SubscriptionState,
  reducers: {
    useRegeneration: (state) => {
      if (state.features.remainingRegenerations > 0) {
        state.features.remainingRegenerations--;
      }
    },
    addStory: (state) => {
      state.features.storiesCreated++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(purchaseSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTier = action.payload.tier;
        state.expiryDate = action.payload.expiryDate;
        state.features = action.payload.features;
      })
      .addCase(purchaseSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Subscription failed';
      });
  },
});