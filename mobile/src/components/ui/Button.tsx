import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { BorderRadius, TouchTargets } from '../../constants/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: Colors.primary },
    text: { color: Colors.onPrimary },
  },
  secondary: {
    container: { backgroundColor: Colors.primaryLight },
    text: { color: Colors.onPrimary },
  },
  gold: {
    container: { backgroundColor: Colors.gold },
    text: { color: Colors.onGold },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: Colors.primary,
    },
    text: { color: Colors.primary },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: Colors.primary },
  },
  danger: {
    container: { backgroundColor: Colors.error },
    text: { color: '#FFFFFF' },
  },
};

const sizeStyles: Record<string, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: { paddingHorizontal: 16, paddingVertical: 8, minHeight: 36 },
    text: { fontSize: 13 },
  },
  md: {
    container: { paddingHorizontal: 20, paddingVertical: 12, minHeight: TouchTargets.comfortable },
    text: { fontSize: 15 },
  },
  lg: {
    container: { paddingHorizontal: 24, paddingVertical: 16, minHeight: TouchTargets.large },
    text: { fontSize: 16 },
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  label,
  icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  style,
  disabled,
  ...props
}) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle.container,
        sizeStyle.container,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'gold' ? Colors.onGold : Colors.onPrimary}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={[styles.label, variantStyle.text, sizeStyle.text]}>{label}</Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: BorderRadius.DEFAULT,
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...Typography.titleLg,
    fontWeight: '700',
  },
});
