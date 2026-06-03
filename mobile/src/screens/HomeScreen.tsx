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

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Good Morning 🌿</Text>
          <Text style={styles.greetingSubtitle}>
            Your daily wellness insight awaits
          </Text>
        </View>

        {/* Daily Suggestion Card */}
        <TouchableOpacity style={styles.dailyCard}>
          <Text style={styles.dailyLabel}>Today's Wisdom</Text>
          <Text style={styles.dailyTitle}>Warming Ginger Infusion</Text>
          <Text style={styles.dailyTradition}>Traditional Chinese Medicine</Text>
          <Text style={styles.dailyDescription}>
            In TCM, fresh ginger is traditionally used to warm the body and support digestion.
            A perfect start to your morning.
          </Text>
          <View style={styles.dailyAction}>
            <Text style={styles.dailyActionText}>Read More →</Text>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('PantryScan')}
          >
            <Text style={styles.quickActionIcon}>🔍</Text>
            <Text style={styles.quickActionLabel}>Scan Pantry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>🌙</Text>
            <Text style={styles.quickActionLabel}>Moon Phase</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>📖</Text>
            <Text style={styles.quickActionLabel}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>🧘</Text>
            <Text style={styles.quickActionLabel}>Rituals</Text>
          </TouchableOpacity>
        </View>

        {/* Recently Used */}
        <Text style={styles.sectionTitle}>Recently Used</Text>
        <View style={styles.recentList}>
          <RecentItem name="Ginger" category="Spice" />
          <RecentItem name="Peppermint" category="Herb" />
          <RecentItem name="Turmeric" category="Spice" />
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          ⚠️ This content is for informational and educational purposes only.
          Not medical advice. Always consult a qualified healthcare provider.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function RecentItem({ name, category }: { name: string; category: string }) {
  return (
    <View style={styles.recentItem}>
      <Text style={styles.recentItemName}>{name}</Text>
      <Text style={styles.recentItemCategory}>{category}</Text>
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
  greeting: {
    marginBottom: spacing.lg,
  },
  greetingTitle: {
    ...typography.displayMedium,
    color: colors.textPrimary,
  },
  greetingSubtitle: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  dailyCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dailyLabel: {
    ...typography.labelSmall,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  dailyTitle: {
    ...typography.headlineMedium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  dailyTradition: {
    ...typography.labelMedium,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  dailyDescription: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  dailyAction: {
    marginTop: spacing.md,
  },
  dailyActionText: {
    ...typography.labelLarge,
    color: colors.primary,
  },
  sectionTitle: {
    ...typography.headlineSmall,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  quickAction: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: spacing.xs,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  quickActionLabel: {
    ...typography.labelSmall,
    color: colors.textPrimary,
  },
  recentList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  recentItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentItemName: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
  },
  recentItemCategory: {
    ...typography.labelMedium,
    color: colors.textMuted,
  },
  disclaimer: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: spacing.lg,
    lineHeight: 18,
  },
});