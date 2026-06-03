import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { setAuthToken } from '../services';

export default function ProfileScreen({ navigation }: any) {
  const handleLogout = () => {
    setAuthToken(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.profileName}>Wellness Seeker</Text>
          <Text style={styles.profileEmail}>user@example.com</Text>
        </View>

        {/* Subscription */}
        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionLabel}>Current Plan</Text>
          <Text style={styles.subscriptionPlan}>Free Trial</Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <MenuItem icon="📋" title="Wellness Goals" />
          <MenuItem icon="🚫" title="Allergies & Contraindications" />
          <MenuItem icon="🔔" title="Notifications" />
          <MenuItem icon="📊" title="Scan History" />
          <MenuItem icon="❤️" title="Favorites" />
          <MenuItem icon="📖" title="Course Library" />
          <MenuItem icon="📅" title="My Consultations" />
          <MenuItem icon="⚙️" title="Settings" />
          <MenuItem icon="❓" title="Help & Support" />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          ⚠️ This content is for informational and educational purposes only.
          Not medical advice.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({ icon, title }: { icon: string; title: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuItemIcon}>{icon}</Text>
      <Text style={styles.menuItemTitle}>{title}</Text>
      <Text style={styles.menuItemArrow}>›</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 36,
  },
  profileName: {
    ...typography.headlineLarge,
    color: colors.textPrimary,
  },
  profileEmail: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  subscriptionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  subscriptionLabel: {
    ...typography.labelSmall,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subscriptionPlan: {
    ...typography.headlineLarge,
    color: colors.primary,
    marginVertical: spacing.sm,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  upgradeButtonText: {
    ...typography.labelLarge,
    color: colors.textOnPrimary,
  },
  menuSection: {
    gap: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  menuItem: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  menuItemTitle: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    flex: 1,
  },
  menuItemArrow: {
    ...typography.bodyLarge,
    color: colors.textMuted,
  },
  logoutButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoutText: {
    ...typography.bodyLarge,
    color: colors.error,
  },
  disclaimer: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});