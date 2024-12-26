import { useState, useCallback } from 'react';

interface CreatorStats {
  stories: number;
  likes: number;
  rating: number;
}

interface CreatorSettings {
  watermark: boolean;
  autoPublish: boolean;
  copyright: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
}

export const useCreatorProfile = () => {
  const [stats, setStats] = useState<CreatorStats>({
    stories: 0,
    likes: 0,
    rating: 0,
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  const [settings, setSettings] = useState<CreatorSettings>({
    watermark: true,
    autoPublish: false,
    copyright: '',
  });

  const updateSettings = useCallback((newSettings: Partial<CreatorSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
    // Here you would typically make an API call to save the settings
  }, []);

  const showPortfolioItem = useCallback((id: string) => {
    // Implementation for showing portfolio item details
    console.log('Showing portfolio item:', id);
  }, []);

  // Load creator data
  const loadCreatorData = useCallback(async () => {
    try {
      // Here you would typically make API calls to fetch the data
      // For now, we'll use mock data
      setStats({
        stories: 12,
        likes: 156,
        rating: 4.8,
      });

      setPortfolio([
        {
          id: '1',
          title: 'Adventure in the Forest',
          thumbnail: 'https://example.com/thumbnail1.jpg',
        },
        {
          id: '2',
          title: 'The Magic Castle',
          thumbnail: 'https://example.com/thumbnail2.jpg',
        },
        // Add more portfolio items as needed
      ]);

      setSettings({
        watermark: true,
        autoPublish: false,
        copyright: '© 2024 Creator Name',
      });
    } catch (error) {
      console.error('Failed to load creator data:', error);
    }
  }, []);

  // Load data on mount
  useState(() => {
    loadCreatorData();
  });

  return {
    stats,
    portfolio,
    settings,
    updateSettings,
    showPortfolioItem,
    refreshData: loadCreatorData,
  };
}; 