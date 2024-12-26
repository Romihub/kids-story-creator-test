// src/hooks/useSubscription.ts
import { useState, useEffect } from 'react';
import { subscriptionTiers } from '../services/subscription';
import { StyleSheet } from 'react-native';

export const useSubscription = () => {
  const [currentTier, setCurrentTier] = useState(subscriptionTiers[0]);
  const [loading, setLoading] = useState(false);

  const subscribe = async (tierId: string) => {
    setLoading(true);
    try {
      // Implement subscription logic
      const tier = subscriptionTiers.find(t => t.id === tierId);
      if (tier) {
        setCurrentTier(tier);
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return {
    tier: currentTier,
    loading,
    subscribe,
    canShare: currentTier.features.canShare,
    regenerationsLeft: currentTier.features.regenerations,
    maxStories: currentTier.features.maxStories,
  };
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  // ... more styles
});