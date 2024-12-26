// src/hooks/useTheme.ts
import { useState, useCallback } from 'react';

interface Theme {
  colors: Record<string, string>;
  typography: {
    fontFamily: string;
    // Add other typography properties as needed
  };
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>({
    colors: {
      primary: '#007AFF',
      secondary: '#5856D6',
      background: '#FFFFFF',
      text: '#000000',
    },
    typography: {
      fontFamily: 'System',
    },
  });

  const updateTheme = useCallback((updates: Partial<Theme>) => {
    setTheme(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  return {
    theme,
    updateTheme,
  };
}; 