export const colors = {
  primary: '#6B4EFF', // Playful purple
  secondary: '#FF6B4E', // Energetic orange
  accent: '#4EFF6B', // Lively green
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: {
    primary: '#333333',
    secondary: '#666666',
    disabled: '#999999'
  },
  border: '#EEEEEE',
  success: {
    main: '#4CAF50',
    light: '#E8F5E9',
    dark: '#388E3C'
  },
  error: {
    main: '#F44336',
    light: '#FFEBEE',
    dark: '#D32F2F'
  },
  warning: {
    main: '#FFC107',
    light: '#FFF8E1',
    dark: '#FFA000'
  }
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold' as const
  },
  body1: {
    fontSize: 16,
    fontWeight: 'normal' as const
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal' as const
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500' as const
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500' as const
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5
  }
};

export const gradients = {
  primary: ['#6B4EFF', '#9747FF'],
  secondary: ['#FF6B4E', '#FF4E6B'],
  accent: ['#4EFF6B', '#6BFF4E']
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients
};
