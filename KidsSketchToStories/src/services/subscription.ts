// src/services/subscription.ts
import { SubscriptionTier } from '../types/subscription';

export const subscriptionTiers: SubscriptionTier[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      maxItems: 10,
      features: {
        maxStories: 3,
        canShare: false,
        regenerations: 1,
        customThemes: false,
        customCover: false,
      },
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 4.99,
      maxItems: 50,
      features: {
        maxStories: 20,
        canShare: true,
        regenerations: 2,
        customThemes: true,
        customCover: true,
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 9.99,
      maxItems: 100,
      features: {
        maxStories: -1, // unlimited
        canShare: true,
        regenerations: -1, // unlimited
        customThemes: true,
        customCover: true,
      },
    },
];