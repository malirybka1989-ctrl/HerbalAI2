/**
 * HerbaAI Brand Color Palette
 *
 * Sage Green (#8A9A5B): Primary - herbs, growth, tranquility
 * Deep Forest Green (#228B22): Secondary - depth, longevity, grounding
 * Soft Terracotta (#E2725B): Accent - warmth, hearth, tradition
 * Cream (#F5F5DC): Background - organic, soft canvas
 * Slate Grey (#708090): Tech Accent - precision, reliability
 */

export const colors = {
  primary: '#8A9A5B',
  primaryLight: '#A8B87A',
  primaryDark: '#6B7A3E',

  secondary: '#228B22',
  secondaryLight: '#32CD32',

  accent: '#E2725B',
  accentLight: '#E8927A',
  accentDark: '#C05A3E',

  background: '#F5F5DC',
  backgroundLight: '#FAF9E8',
  backgroundDark: '#E8E8C8',

  surface: '#FFFFFF',
  surfaceAlt: '#F0EFE2',

  textPrimary: '#2C2C2C',
  textSecondary: '#5A5A5A',
  textMuted: '#9A9A9A',
  textOnPrimary: '#FFFFFF',

  techAccent: '#708090',
  techAccentLight: '#8A9AA8',

  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  border: '#D4D4C0',
  divider: '#E5E5D5',

  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;