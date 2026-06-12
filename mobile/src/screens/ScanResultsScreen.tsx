import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function ScanResultsScreen({ route, navigation }: any) {
  const { scanResult } = route.params || {};

  if (!scanResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading your wellness rituals...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { ai_response, ingredients_used } = scanResult;
  const suggestions = ai_response?.suggestions || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🌿</Text>
          <Text style={styles.headerTitle}>Your Wellness Rituals</Text>
          <Text style={styles.headerSubtitle}>
            Based on {ingredients_used?.join(', ')}
          </Text>
        </View>

        {/* Essence */}
        <View style={styles.essenceCard}>
          <Text style={styles.essenceText}>{ai_response?.essence}</Text>
        </View>

        {/* Suggestions grouped by tradition */}
        {suggestions.length > 0 ? (
          suggestions.map((group: any, idx: number) => (
            <View key={idx} style={styles.traditionGroup}>
              <View style={styles.traditionHeader}>
                <Text style={styles.traditionLabel}>
                  {group.tradition === 'TCM'
                    ? '☯️'
                    : group.tradition === 'Ayurveda'
                    ? '🪷'
                    : group.tradition === 'Folk Wisdom'
                    ? '🌿'
                    : group.tradition === 'Astrology'
                    ? '🌙'
                    : '👐'}{' '}
                  {group.tradition}
                </Text>
              </View>
              {group.items.map((item: any, iIdx: number) => (
                <View key={iIdx} style={styles.suggestionCard}>
                  <Text style={styles.suggestionTitle}>{item.title}</Text>
                  <Text style={styles.ingredientLabel}>
                    Using: {item.ingredient}
                  </Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <View style={styles.instructionsBox}>
                    <Text style={styles.instructionsLabel}>How to practice:</Text>
                    <Text style={styles.instructionsText}>{item.instructions}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🪴</Text>
            <Text style={styles.emptyTitle}>
              No suggestions found for these ingredients yet
            </Text>
            <Text style={styles.emptyDesc}>
              Try adding different ingredients or check back as we expand our knowledge base
            </Text>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>❤️ Save to Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Scan More Ingredients</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          ⚠️ {ai_response?.safety_note || 'This content is for informational and educational purposes only. It is not medical advice, diagnosis, or treatment.'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  headerTitle: {
    ...typography.displaySmall,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  essenceCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  essenceText: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  traditionGroup: {
    marginBottom: spacing.lg,
  },
  traditionHeader: {
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },
  traditionLabel: {
    ...typography.headlineSmall,
    color: colors.accent,
    fontSize: 17,
  },
  suggestionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  suggestionTitle: {
    ...typography.headlineMedium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  ingredientLabel: {
    ...typography.labelMedium,
    color: colors.primary,
    marginBottom: spacing.sm,
    textTransform: 'capitalize',
  },
  description: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  instructionsBox: {
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  instructionsLabel: {
    ...typography.labelMedium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  instructionsText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.headlineMedium,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptyDesc: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  saveButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.accent,
  },
  backButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  backButtonText: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
  },
  disclaimer: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});