/**
 * AgriSahayak Design System — Typography
 * ========================================
 * Fonts: Plus Jakarta Sans (display) + Noto Sans (body/multilingual)
 * Supports Indic scripts: Devanagari, Kannada, Telugu, Tamil
 */

import { TextStyle } from 'react-native';

// Font families
export const FontFamilies = {
  display: 'PlusJakartaSans',      // Headlines, financial metrics, app name
  displayBold: 'PlusJakartaSans-Bold',
  displaySemiBold: 'PlusJakartaSans-SemiBold',
  displayExtraBold: 'PlusJakartaSans-ExtraBold',
  body: 'NotoSans',                // Body text, multilingual content
  bodyMedium: 'NotoSans-Medium',
  bodySemiBold: 'NotoSans-SemiBold',
  bodyBold: 'NotoSans-Bold',
} as const;

// Font sizes (matches Stitch design spec)
export const FontSizes = {
  xs: 11,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 26,
  '4xl': 32,
  metric: 36,
} as const;

// Line heights (1.45x minimum for Indic scripts)
export const LineHeights = {
  tight: 1.2,
  normal: 1.45,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// Typography presets (matching Stitch tokens)
export const Typography = {
  // Display
  displayLg: {
    fontFamily: FontFamilies.displayBold,
    fontSize: FontSizes['4xl'],
    lineHeight: FontSizes['4xl'] * 1.2,
    letterSpacing: -0.5,
  } as TextStyle,

  displayMobile: {
    fontFamily: FontFamilies.displayBold,
    fontSize: FontSizes['3xl'],
    lineHeight: FontSizes['3xl'] * 1.25,
    letterSpacing: -0.3,
  } as TextStyle,

  // Headlines (Plus Jakarta Sans)
  headlineXl: {
    fontFamily: FontFamilies.displayBold,
    fontSize: FontSizes['4xl'],
    lineHeight: FontSizes['4xl'] * 1.25,
    letterSpacing: -0.3,
  } as TextStyle,

  headlineLg: {
    fontFamily: FontFamilies.displaySemiBold,
    fontSize: FontSizes['2xl'],
    lineHeight: FontSizes['2xl'] * 1.33,
    letterSpacing: -0.1,
  } as TextStyle,

  headlineMd: {
    fontFamily: FontFamilies.displaySemiBold,
    fontSize: FontSizes.xl,
    lineHeight: FontSizes.xl * 1.4,
  } as TextStyle,

  headlineSm: {
    fontFamily: FontFamilies.displaySemiBold,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * 1.33,
  } as TextStyle,

  // Title
  titleLg: {
    fontFamily: FontFamilies.displaySemiBold,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * 1.5,
  } as TextStyle,

  // Body (Noto Sans — multilingual)
  bodyLg: {
    fontFamily: FontFamilies.body,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * 1.625,
  } as TextStyle,

  bodyMd: {
    fontFamily: FontFamilies.body,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.57,
  } as TextStyle,

  bodySm: {
    fontFamily: FontFamilies.body,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * 1.5,
  } as TextStyle,

  // Labels (Noto Sans — multilingual badges)
  labelLg: {
    fontFamily: FontFamilies.bodySemiBold,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.43,
    letterSpacing: 0.15,
  } as TextStyle,

  labelMd: {
    fontFamily: FontFamilies.bodySemiBold,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * 1.33,
    letterSpacing: 0.25,
  } as TextStyle,

  labelSm: {
    fontFamily: FontFamilies.bodySemiBold,
    fontSize: FontSizes.xs,
    lineHeight: FontSizes.xs * 1.27,
    letterSpacing: 0.4,
  } as TextStyle,

  // Financial metrics (Plus Jakarta Sans ExtraBold)
  metricXl: {
    fontFamily: FontFamilies.displayExtraBold,
    fontSize: FontSizes.metric,
    lineHeight: FontSizes.metric * 1.17,
    letterSpacing: -0.7,
  } as TextStyle,

  metricLg: {
    fontFamily: FontFamilies.displayBold,
    fontSize: FontSizes['3xl'],
    lineHeight: FontSizes['3xl'] * 1.3,
    letterSpacing: -0.5,
  } as TextStyle,
} as const;

export type TypographyKey = keyof typeof Typography;
