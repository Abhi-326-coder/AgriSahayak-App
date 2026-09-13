import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows } from '../../constants/spacing';

type CardVariant = 'default' | 'elevated' | 'insight' | 'primary';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
  padding = 16,
}) => {
  return (
    <View style={[styles.base, variantStyles[variant], { padding }, style]}>
      {children}
    </View>
  );
};

const variantStyles: Record<CardVariant, ViewStyle> = {
  default: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  elevated: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.md,
  },
  insight: {
    // AI insight card — dark green with gold border
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.goldTransparent30,
    ...Shadows.lg,
  },
  primary: {
    backgroundColor: Colors.primary,
    ...Shadows.md,
  },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
});
