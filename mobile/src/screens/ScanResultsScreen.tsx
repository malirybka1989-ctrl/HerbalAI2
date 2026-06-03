import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function ScanResultsScreen({ route, navigation }: any) {
  // In a full implementation, scanId would be used to fetch results from the API
  const { scanId } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🌿</Text>
          <Text style={styles.headerTitle}>Your Wellness Rituals</Text>
          <Text style={styles.headerSubtitle}>
            Based on the ingredients you have in your pantry
          </Text>
        </View>

        {/* Suggestion Cards */}
        <View style={styles.suggestions}>
          <SuggestionCard
            tradition="Traditional Chinese Medicine"
            title="Warming Ginger Infusion"
            description="In TCM, fresh ginger is traditionally used to warm the body and support the digestive system."
            instructions="Slice 3-5 thin pieces of fresh ginger. Steep in hot water for 5-10 minutes. Sip slowly."
            color={colors.primary}
          />
          <SuggestionCard
            tradition="Ayurveda"
            title="Golden Milk Ritual"
            description="An Ayurvedic evening practice traditionally used for grounding and vitality."
            instructions="Whisk 1/2 tsp turmeric with 1 cup warm plant-based milk and a pinch of black pepper."
            color={colors.accent}
          />
          <SuggestionCard
            tradition="Folk Wisdom"
            title="Starlight Steep"
            description="A beloved European folk tradition for evening relaxation."
            instructions="Steep 1 tbsp dried chamomile in hot water for 5 minutes before bed."
            color={colors.techAccent}
          />
        </View>

        {/* Save / Favorites */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>❤️ Save to Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back to Pantry</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          ⚠️ This content is for informational and educational purposes only. It is not
          medical advice, diagnosis, or treatment. Always consult a qualified healthcare
          provider before making changes to your health regimen.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SuggestionCard({
  tradition,
  title,
  description,
  instructions,
  color,
}: {
  tradition: string;
  title: string;
  description: string;
  instructions: string;
  color: string;
}) {
  return (
    <View style={[styles.suggestionCard, { borderLeftColor: color }]}>
      <Text style={styles.traditionLabel}>{tradition}</Text>
      <Text style={styles.suggestionTitle}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsLabel}>How to practice:</Text>
        <Text style={styles.instructionsText}>{instructions}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  },
  suggestions: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  suggestionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  traditionLabel: {
    ...typography.labelSmall,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  suggestionTitle: {
    ...typography.headlineMedium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
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