/**
 * AgriSahayak Design System — Spacing & Sizing
 * Based on 8pt spatial cadence from Stitch spec
 */

export const Spacing = {
  xs: 4,      // space-xs: 0.25rem
  sm: 8,      // space-sm: 0.5rem
  md: 16,     // space-md: 1rem
  lg: 24,     // space-lg: 1.5rem
  xl: 32,     // space-xl: 2rem
  '2xl': 48,  // space-2xl: 3rem

  // Mobile-specific
  gutterMobile: 16,   // gutter-mobile: 1rem
  marginMobile: 16,   // margin-mobile: 1rem
} as const;

export const BorderRadius = {
  sm: 4,      // rounded-sm: 0.25rem
  DEFAULT: 8, // rounded: 0.5rem
  md: 12,     // rounded-md: 0.75rem
  lg: 16,     // rounded-lg: 1rem
  xl: 24,     // rounded-xl: 1.5rem
  full: 9999, // rounded-full
} as const;

// Minimum touch targets for rural farmers with large fingers
export const TouchTargets = {
  minimum: 44,    // iOS HIG minimum
  comfortable: 48, // AgriSahayak standard (matches Stitch button spec)
  large: 56,      // Large action buttons (voice AI mic button)
} as const;

export const Shadows = {
  sm: {
    shadowColor: 'rgba(23, 63, 53, 1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: 'rgba(23, 63, 53, 1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 9,
    elevation: 4,
  },
  lg: {
    shadowColor: 'rgba(23, 63, 53, 1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export type SpacingKey = keyof typeof Spacing;
