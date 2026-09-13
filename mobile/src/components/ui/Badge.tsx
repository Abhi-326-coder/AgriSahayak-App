import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'gold' | 'primary' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const variantConfig: Record<BadgeVariant, { bg: string; text: string; dot?: string }> = {
  success: {
    bg: Colors.successLight,
    text: Colors.successText,
    dot: Colors.success,
  },
  warning: {
    bg: Colors.warningLight,
    text: Colors.goldText,
    dot: Colors.gold,
  },
  error: {
    bg: Colors.errorLight,
    text: Colors.errorText,
    dot: Colors.error,
  },
  info: {
    bg: Colors.skyLight,
    text: Colors.sky,
  },
  gold: {
    bg: Colors.gold,
    text: Colors.onGold,
  },
  primary: {
    bg: Colors.primary,
    text: Colors.onPrimary,
  },
  neutral: {
    bg: Colors.surfaceVariant,
    text: Colors.textSecondary,
  },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  dot = false,
  style,
  textStyle,
}) => {
  const config = variantConfig[variant];

  return (
    <View style={[styles.container, { backgroundColor: config.bg }, style]}>
      {dot && config.dot && (
        <View style={[styles.dot, { backgroundColor: config.dot }]} />
      )}
      <Text style={[styles.label, { color: config.text }, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
