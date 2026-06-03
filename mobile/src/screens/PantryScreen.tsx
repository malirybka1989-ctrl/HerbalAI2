import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function PantryScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Pantry</Text>
        <Text style={styles.subtitle}>
          Add ingredients you have at home to get personalized wellness suggestions
        </Text>

        {/* Search input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ingredients..."
            placeholderTextColor={colors.textMuted}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Pantry scan CTA */}
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('PantryScan')}
        >
          <Text style={styles.scanButtonIcon}>🔍</Text>
          <View style={styles.scanButtonText}>
            <Text style={styles.scanButtonTitle}>Scan Your Pantry</Text>
            <Text style={styles.scanButtonDesc}>
              Tell us what you have and discover wellness rituals
            </Text>
          </View>
        </TouchableOpacity>

        {/* Common ingredients quick-add */}
        <Text style={styles.sectionTitle}>Quick Add</Text>
        <View style={styles.chips}>
          {['Ginger', 'Turmeric', 'Honey', 'Lemon', 'Cinnamon', 'Peppermint', 'Chamomile', 'Garlic'].map(
            (item) => (
              <TouchableOpacity key={item} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* My ingredients */}
        <Text style={styles.sectionTitle}>Your Ingredients</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🪴</Text>
          <Text style={styles.emptyTitle}>Your pantry is empty</Text>
          <Text style={styles.emptyDesc}>
            Add ingredients to get started with personalized wellness rituals
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  searchContainer: {
    marginBottom: spacing.lg,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.bodyLarge,
    color: colors.textPrimary,
  },
  scanButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  scanButtonIcon: {
    fontSize: 36,
    marginRight: spacing.md,
  },
  scanButtonText: {
    flex: 1,
  },
  scanButtonTitle: {
    ...typography.headlineSmall,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  scanButtonDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  sectionTitle: {
    ...typography.headlineSmall,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
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
    marginBottom: spacing.sm,
  },
  emptyDesc: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});