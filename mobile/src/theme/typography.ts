import { TextStyle } from 'react-native';

/**
 * HerbaAI Typography
 * Headlines: Cormorant Garamond (serif) — classic herbalism feel
 * Body: Inter (sans-serif) — modern readability
 */

export const typography: Record<string, TextStyle> = {
  // Display / Hero
  displayLarge: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0.25,
  },
  displayMedium: {
    fontFamily: 'CormorantGaramond-SemiBold',
    fontSize: 30,
    lineHeight: 38,
  },
  displaySmall: {
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 24,
    lineHeight: 32,
  },

  // Headlines
  headlineLarge: {
    fontFamily: 'CormorantGaramond-SemiBold',
    fontSize: 22,
    lineHeight: 28,
  },
  headlineMedium: {
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 20,
    lineHeight: 26,
  },
  headlineSmall: {
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 18,
    lineHeight: 24,
  },

  // Body (Inter)
  bodyLarge: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
  },

  // Labels
  labelLarge: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
  },

  // Button
  button: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  buttonSmall: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
} as const;