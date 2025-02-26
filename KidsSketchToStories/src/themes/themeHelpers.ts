// src/themes/themeHelpers.ts
import { ColorValue } from 'react-native';
import { colors, AppColor } from './theme';

// Type-safe color getters
export const getColor = {
  // Background colors
  background: {
    primary: (): AppColor => colors.background.primary,
    secondary: (): AppColor => colors.background.secondary,
    tertiary: (): AppColor => colors.background.tertiary,
    card: (): AppColor => colors.background.card,
  },

  // Text colors
  text: {
    primary: (): AppColor => colors.text.primary,
    secondary: (): AppColor => colors.text.secondary,
    tertiary: (): AppColor => colors.text.tertiary,
    inverse: (): AppColor => colors.text.inverse,
    accent: (): AppColor => colors.text.accent,
    disabled: (): AppColor => colors.text.disabled,
    error: (): AppColor => colors.text.error,
    success: (): AppColor => colors.text.success,
  },

  // Border colors
  border: {
    light: (): AppColor => colors.border.light,
    main: (): AppColor => colors.border.main,
  },

  // Accent colors
  accent: {
    purple: (): AppColor => colors.accentPurple,
    pink: (): AppColor => colors.accentPink,
    green: (): AppColor => colors.accentGreen,
    blue: (): AppColor => colors.accentBlue,
  },

  // Status colors
  status: {
    success: (): AppColor => colors.success,
    warning: (): AppColor => colors.warning,
    error: (): AppColor => colors.error,
    info: (): AppColor => colors.info,
  },

  // Direct color accessors
  primary: (): AppColor => colors.primary,
  primaryLight: (): AppColor => colors.primaryLight,
  primaryDark: (): AppColor => colors.primaryDark,
  secondary: (): AppColor => colors.secondary,
  secondaryLight: (): AppColor => colors.secondaryLight,
  secondaryDark: (): AppColor => colors.secondaryDark,
  surface: (): AppColor => colors.surface,
  backdrop: (): AppColor => colors.backdrop,
  overlay: (): AppColor => colors.overlay,
} as const;

// Helper function to safely get a background color
export const getBackgroundColor = (
  key: keyof typeof colors.background
): ColorValue => {
  return colors.background[key];
};

// Helper function to safely get a text color
export const getTextColor = (
  key: keyof typeof colors.text
): ColorValue => {
  return colors.text[key];
};

// Helper function to safely get a border color
export const getBorderColor = (
  key: keyof typeof colors.border
): ColorValue => {
  return colors.border[key];
};

// Helper function to safely get a status color
export const getStatusColor = (
  key: 'success' | 'warning' | 'error' | 'info'
): ColorValue => {
  return colors[key];
};

// Helper function to safely get an accent color
export const getAccentColor = (
  key: 'accentPurple' | 'accentPink' | 'accentGreen' | 'accentBlue'
): ColorValue => {
  return colors[key];
};

// Helper for getting single color value from any path
export const getSingleColorValue = (color: ColorValue): ColorValue => {
  if (typeof color === 'string') {
    return color;
  }
  return '#000000'; // Default fallback
};

// Style helper functions
export const createBackgroundStyle = (color: ColorValue) => ({
  backgroundColor: getSingleColorValue(color),
});

export const createBorderStyle = (color: ColorValue) => ({
  borderColor: getSingleColorValue(color),
});

export const createTextStyle = (color: ColorValue) => ({
  color: getSingleColorValue(color),
});
