/**
 * AgriSahayak Design System — Colors
 * ====================================
 * Extracted from Stitch prototype: AgriSahayak AI Platform Prototype 1
 * Design theme: "Modern Institutional Agritech"
 *
 * Primary: Deep Forest Green #173F35
 * Secondary: Agricultural Green #2F6B4F
 * Accent: Harvest Gold #D9A441
 * Background: Warm Ivory #F7F5EF
 */

export const Colors = {
  // ---- Primary Palette ----
  primary: '#173F35',        // Deep Forest Green — headers, primary buttons, nav
  primaryDark: '#0E2822',    // Darker green — gradients, pressed states
  primaryLight: '#2F6B4F',   // Agricultural Green — secondary elements, icons
  primaryContainer: '#C1ECDD',

  // ---- Secondary / Accent ----
  secondary: '#2D694D',      // Agricultural Green
  secondaryContainer: '#AEEDCA',

  // ---- Gold / Financial ----
  gold: '#D9A441',           // Harvest Gold — financial metrics, premium CTAs
  goldLight: '#FDF3DF',      // Gold surface — card backgrounds
  goldDark: '#C59235',       // Darker gold — pressed states
  goldText: '#875C0E',       // Readable gold text on light backgrounds

  // ---- Surface / Background ----
  background: '#F7F5EF',     // Warm Ivory — main background
  surface: '#FFFFFF',        // Card surfaces
  surfaceVariant: '#EEE9DD', // Muted sand — secondary containers
  surfaceContainer: '#FFF1E8',
  surfaceContainerHigh: '#FFE3CE',

  // ---- Text ----
  textPrimary: '#1E2925',    // Deep Charcoal Green — primary text
  textSecondary: '#526059',  // Secondary descriptions
  textMuted: '#717975',      // Timestamps, metadata
  textLight: '#A6CFC1',      // Light text on dark backgrounds
  onPrimary: '#FFFFFF',      // Text on primary color
  onGold: '#173F35',         // Text on gold backgrounds

  // ---- Status ----
  success: '#2F6B4F',
  successLight: '#E2F0E7',
  successText: '#2F6B4F',

  warning: '#D9A441',
  warningLight: '#FFF5DE',
  warningText: '#875C0E',

  error: '#BA1A1A',
  errorLight: '#FFDAD6',
  errorText: '#93000A',

  terracotta: '#B9684A',     // Terracotta alert — spoilage risks, warnings
  terracottaLight: '#FFF0E8',

  // ---- Agricultural Feature Colors ----
  soil: '#8A6748',           // Warm Earth — borders, structural accents
  leaf: '#2F6B4F',
  sky: '#2C5F8A',            // Government/info features
  skyLight: '#E8EFF6',

  // ---- Borders ----
  border: '#E8E4D8',         // Standard card border
  borderLight: '#F0EBE1',
  borderSoil: 'rgba(138, 103, 72, 0.18)',
  borderPrimary: 'rgba(23, 63, 53, 0.08)',

  // ---- Shadows (as rgba strings) ----
  shadowPrimary: 'rgba(23, 63, 53, 0.07)',
  shadowLight: 'rgba(23, 63, 53, 0.04)',

  // ---- Transparent variants ----
  primaryTransparent10: 'rgba(23, 63, 53, 0.10)',
  primaryTransparent20: 'rgba(23, 63, 53, 0.20)',
  goldTransparent15: 'rgba(217, 164, 65, 0.15)',
  goldTransparent30: 'rgba(217, 164, 65, 0.30)',
  successTransparent12: 'rgba(47, 107, 79, 0.12)',
  // ---- Aliases ----
  cardBackground: '#FFFFFF',
  textInverse: '#FFFFFF',
  accentGold: '#D9A441',
  secondaryGreen: '#2F6B4F',
} as const;

export type ColorKey = keyof typeof Colors;
