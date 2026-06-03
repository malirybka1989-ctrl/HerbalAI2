import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo / Brand area */}
        <View style={styles.logoArea}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>🌿</Text>
          </View>
          <Text style={styles.brandName}>HerbaAI</Text>
          <Text style={styles.tagline}>
            Ancient wisdom meets{'\n'}modern intelligence
          </Text>
        </View>

        {/* Value props */}
        <View style={styles.features}>
          <FeatureItem
            icon="🧘"
            title="Pantry Scan"
            description="Turn what you already have into personalized wellness rituals"
          />
          <FeatureItem
            icon="🌙"
            title="Daily Wisdom"
            description="Personalized recommendations based on season, moon phase, and your goals"
          />
          <FeatureItem
            icon="🪴"
            title="Ancient Traditions"
            description="TCM, Ayurveda, astrology, and folk wisdom — all in one place"
          />
        </View>

        {/* Action */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.replace('Auth')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.replace('Auth')}
          >
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
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
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: spacing.xl,
  },
  logoArea: {
    alignItems: 'center',
    paddingTop: spacing.xxxl,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    fontSize: 48,
  },
  brandName: {
    ...typography.displayLarge,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  features: {
    paddingVertical: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...typography.labelLarge,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  featureDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  actions: {
    gap: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
  secondaryButton: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    ...typography.buttonSmall,
    color: colors.textSecondary,
  },
});