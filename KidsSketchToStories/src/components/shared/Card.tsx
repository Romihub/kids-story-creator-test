import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { shadows, borderRadius, colors } from '../../themes/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'primary' }) => {
  const cardStyle = [
    styles.card,
    variant === 'secondary' && styles.secondaryCard,
    variant === 'outline' && styles.outlineCard,
    style
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: 16,
    ...shadows.md,
    marginBottom: 8
  },
  secondaryCard: {
    backgroundColor: colors.surface,
  },
  outlineCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm
  }
});

export default Card;
