// src/config/subscriptionTiers.ts
//Updated Subscription Model with Monthly/Yearly Options
export interface SubscriptionTier {
    id: string;
    name: string;
    features: {
      pageLimit: number;
      customCover: boolean;
      aiEnhancements: boolean;
      unlimitedStories: boolean;
      premium: boolean;
    };
    pricing: {
      monthly: {
        price: number;
        currency: string;
      };
      yearly: {
        price: number;
        currency: string;
        savings: number;
      };
    };
}
  
export const subscriptionTiers: SubscriptionTier[] = [
    {
      id: 'free',
      name: 'Free',
      features: {
        pageLimit: 1,
        customCover: false,
        aiEnhancements: false,
        unlimitedStories: false,
        premium: false,
      },
      pricing: {
        monthly: {
          price: 0,
          currency: 'USD',
        },
        yearly: {
          price: 0,
          currency: 'USD',
          savings: 0,
        },
      },
    },
    {
      id: 'premium',
      name: 'Premium',
      features: {
        pageLimit: 10,
        customCover: true,
        aiEnhancements: true,
        unlimitedStories: false,
        premium: true,
      },
      pricing: {
        monthly: {
          price: 4.99,
          currency: 'USD',
        },
        yearly: {
          price: 49.99,
          currency: 'USD',
          savings: 9.89,
        },
      },
    },
    {
      id: 'unlimited',
      name: 'Unlimited',
      features: {
        pageLimit: -1, // unlimited
        customCover: true,
        aiEnhancements: true,
        unlimitedStories: true,
        premium: true,
      },
      pricing: {
        monthly: {
          price: 9.99,
          currency: 'USD',
        },
        yearly: {
          price: 99.99,
          currency: 'USD',
          savings: 19.89,
        },
      },
    },
];
  
export const getSubscriptionFeatures = (tierId: string) => {
    return subscriptionTiers.find(tier => tier.id === tierId)?.features;
};
  
export const calculateYearlySavings = (tierId: string): number => {
    const tier = subscriptionTiers.find(t => t.id === tierId);
    if (!tier) return 0;
    
    const monthlyTotal = tier.pricing.monthly.price * 12;
    const yearlyTotal = tier.pricing.yearly.price;
    return monthlyTotal - yearlyTotal;
};