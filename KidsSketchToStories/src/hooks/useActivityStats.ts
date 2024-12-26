import { useState, useCallback } from 'react';

interface ActivityStats {
  activities: {
    type: string;
    count: number;
    icon: string;
    color: string;
  }[];
  chartData: {
    labels: string[];
    datasets: {
      data: number[];
      color?: (opacity: number) => string;
    }[];
  };
}

export const useActivityStats = () => {
  const [stats, setStats] = useState<ActivityStats>({
    activities: [
      { type: 'Stories', count: 12, icon: 'book', color: '#007AFF' },
      { type: 'Drawings', count: 24, icon: 'palette', color: '#FF9500' },
      { type: 'Characters', count: 8, icon: 'account', color: '#34C759' },
    ],
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        data: [20, 45, 28, 80, 99, 43],
      }],
    },
  });

  return { stats };
}; 