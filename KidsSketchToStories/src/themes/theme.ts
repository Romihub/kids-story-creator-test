// src/themes/theme.ts
import { Platform, TextStyle, ColorValue } from 'react-native';

// Type definitions
export type FontWeight = NonNullable<TextStyle['fontWeight']>;
export type AppColor = string & ColorValue;
export type GradientColors = [AppColor, AppColor];

// Font weights
export const fontWeights = {
  normal: 'normal' as FontWeight,
  medium: '500' as FontWeight,
  semibold: '600' as FontWeight,
  bold: 'bold' as FontWeight,
} as const;

// Color utility functions
export const colorUtilities = {
  withOpacity: (color: string, opacity: number): AppColor => {
    if (color.startsWith('#')) {
      const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const formattedHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
          : { r: 0, g: 0, b: 0 };
      };
      
      const { r, g, b } = hexToRgb(color);
      return `rgba(${r}, ${g}, ${b}, ${opacity})` as AppColor;
    } else if (color.startsWith('rgb')) {
      return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`) as AppColor;
    } else if (color.startsWith('rgba')) {
      return color.replace(/[\d\.]+\)$/g, `${opacity})`) as AppColor;
    }
    
    return color as AppColor;
  },
  
  adjustBrightness: (color: string, amount: number): AppColor => {
    const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
      const toHex = (c: number): string => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    if (color.startsWith('#')) {
      const rgb = hexToRgb(color);
      if (rgb) {
        const newR = Math.min(255, Math.max(0, Math.round(rgb.r * (1 + amount))));
        const newG = Math.min(255, Math.max(0, Math.round(rgb.g * (1 + amount))));
        const newB = Math.min(255, Math.max(0, Math.round(rgb.b * (1 + amount))));
        return rgbToHex(newR, newG, newB) as AppColor;
      }
    }
    return color as AppColor;
  },

  createGradientColor: (startColor: AppColor, endColor: AppColor): GradientColors => {
    return [startColor, endColor];
  },

  getAlphaColor: (color: AppColor, alpha: number): AppColor => {
    return colorUtilities.withOpacity(color, alpha);
  },
} as const;

// Color palette definitions
export const palette = {
  // Primary colors
  primary: {
    lightest: '#F5F0FF' as AppColor,
    lighter: '#E9E3FF' as AppColor,
    light: '#D4CAFF' as AppColor,
    main: '#6366F1' as AppColor,
    dark: '#5335DF' as AppColor,
    darkest: '#3D28B3' as AppColor,
  },

  // Secondary colors
  secondary: {
    lightest: '#FFF0F0' as AppColor,
    lighter: '#FFE5E0' as AppColor,
    light: '#FFCEC5' as AppColor,
    main: '#FF6B4E' as AppColor,
    dark: '#E84633' as AppColor,
    darkest: '#C53320' as AppColor,
  },

  // Accents
  accent: {
    purple: '#6B4EFF' as AppColor,
    pink: '#FF4E8B' as AppColor,
    green: '#4EFF6B' as AppColor,
    blue: '#4A90E2' as AppColor,
  },

  // Neutral colors
  gray: {
    white: '#FFFFFF' as AppColor,
    lightest: '#F8F9FA' as AppColor,
    lighter: '#F1F3F5' as AppColor,
    light: '#E9ECEF' as AppColor,
    medium: '#CED4DA' as AppColor,
    dark: '#ADB5BD' as AppColor,
    darker: '#6C757D' as AppColor,
    darkest: '#343A40' as AppColor,
    black: '#212529' as AppColor,
  },

  // Feedback colors
  feedback: {
    success: '#20B2AA' as AppColor,
    warning: '#FFB547' as AppColor,
    error: '#FF5252' as AppColor,
    info: '#2196F3' as AppColor,
  },
} as const;

// Theme colors
export const colors = {
  // Base colors
  primary: palette.primary.main,
  primaryLight: colorUtilities.withOpacity(palette.accent.purple, 0.12),
  primaryDark: palette.primary.dark,

  secondary: palette.secondary.main,
  secondaryLight: colorUtilities.withOpacity(palette.secondary.main, 0.12),
  secondaryDark: palette.secondary.dark,

  // Accent colors (individual colors, not object)
  accentPurple: palette.accent.purple,
  accentPink: palette.accent.pink,
  accentGreen: palette.accent.green,
  accentBlue: palette.accent.blue,

  // Feedback colors (exposed directly)
  success: palette.feedback.success,
  warning: palette.feedback.warning,
  error: palette.feedback.error,
  info: palette.feedback.info,
  
  // Background colors
  background: {
    primary: palette.gray.white,
    secondary: palette.gray.lightest,
    tertiary: palette.primary.lightest,
    card: palette.gray.white,
  },

  // Text colors
  text: {
    primary: palette.gray.darkest,
    secondary: palette.gray.darker,
    tertiary: palette.gray.dark,
    inverse: palette.gray.white,
    accent: palette.primary.main,
    disabled: palette.gray.medium,
    error: palette.feedback.error,
    success: palette.feedback.success,
  },

  // Border colors
  border: {
    light: palette.gray.light,
    main: palette.gray.medium,
  },

  // UI Element colors
  surface: palette.gray.white,
  backdrop: colorUtilities.withOpacity('#000000', 0.5),
  overlay: colorUtilities.withOpacity('#FFFFFF', 0.8),
} as const;

// Rest of the file stays the same
export const gradients = {
  primary: {
    colors: colorUtilities.createGradientColor(colors.primary, '#8B5CF6'),
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  secondary: {
    colors: colorUtilities.createGradientColor(colors.secondary, colors.accentPink),
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  success: {
    colors: colorUtilities.createGradientColor(colors.success, '#4ECDC4'),
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  heroBackground: {
    colors: colorUtilities.createGradientColor('#6366F1', '#8B5CF6'),
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  appBackground: {
    colors: ['#F5F0FF', '#FFF0F5', '#F0FFFF'] as AppColor[],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;

// Existing styles and other exports remain unchanged
export const styles = {
  buttons: {
    primary: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: 16,
      paddingVertical: 14,
      paddingHorizontal: 22,
    },
  },
  cards: {
    default: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
    },
    highlighted: {
      backgroundColor: colors.background.tertiary,
      borderRadius: 20,
      padding: 20,
    },
  },
} as const;

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: fontWeights.bold,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: fontWeights.bold,
    lineHeight: 32,
  },
  h3: {
    fontSize: 18,
    fontWeight: fontWeights.bold,
    lineHeight: 24,
  },
  h4: {
    fontSize: 16,
    fontWeight: fontWeights.bold,
    lineHeight: 22,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: fontWeights.semibold,
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: fontWeights.semibold,
    lineHeight: 24,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 100,
} as const;

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),
} as const;

export default {
  colors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
  styles,
  fontWeights,
  colorUtilities,
} as const;
