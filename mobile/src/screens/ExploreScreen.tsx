import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover wellness traditions from around the world</Text>

        {/* Traditions */}
        <View style={styles.traditions}>
          <TraditionCard
            icon="☯️"
            title="Traditional Chinese Medicine"
            description="Explore warming and cooling ingredients, meridians, and balance"
            color={colors.primary}
          />
          <TraditionCard
            icon="🪷"
            title="Ayurveda"
            description="Discover your dosha and balancing rituals"
            color={colors.accent}
          />
          <TraditionCard
            icon="🌿"
            title="Folk Wisdom"
            description="Time-honored European and global folk traditions"
            color={colors.techAccent}
          />
          <TraditionCard
            icon="🌙"
            title="Astrological Wellness"
            description="Align your rituals with the moon and planets"
            color={colors.secondary}
          />
          <TraditionCard
            icon="👐"
            title="Acupressure"
            description="Stimulate pressure points for daily well-being"
            color={colors.primaryLight}
          />
        </View>

        {/* Coming Soon */}
        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonTitle}>Premium Content Coming Soon</Text>
          <Text style={styles.comingSoonDesc}>
            One-on-one consultations with certified practitioners and in-depth course libraries.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TraditionCard({
  icon,
  title,
  description,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <TouchableOpacity style={[styles.traditionCard, { borderLeftColor: color }]}>
      <Text style={styles.traditionIcon}>{icon}</Text>
      <View style={styles.traditionText}>
        <Text style={styles.traditionTitle}>{title}</Text>
        <Text style={styles.traditionDesc}>{description}</Text>
      </View>
    </TouchableOpacity>
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
  title: {
    ...typography.displaySmall,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  traditions: {
    gap: spacing.md,
  },
  traditionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    borderLeftWidth: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  traditionIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  traditionText: {
    flex: 1,
  },
  traditionTitle: {
    ...typography.headlineSmall,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  traditionDesc: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  comingSoon: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  comingSoonTitle: {
    ...typography.headlineSmall,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  comingSoonDesc: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});