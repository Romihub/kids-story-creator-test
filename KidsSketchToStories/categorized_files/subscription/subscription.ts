// src/types/subscription.ts
export interface SubscriptionTier {
  id: 'free' | 'premium' | 'professional';
  name: string;
  price: number;
  maxItems: number;
  features: {
    maxStories: number;
    canShare: boolean;
    regenerations: number;
    customThemes: boolean;
    customCover: boolean;
  };
}

export interface SubscriptionHook {
  tier: SubscriptionTier;
  loading: boolean;
  subscribe: (tierId: string) => Promise<void>;
  canShare: boolean;
  regenerationsLeft: number;
  maxStories: number;
}