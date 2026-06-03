import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { pantryApi } from '../services';

export default function PantryScanScreen({ navigation }: any) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const [scanning, setScanning] = useState(false);

  const addIngredient = () => {
    const trimmed = inputText.trim().toLowerCase();
    if (!trimmed) return;
    if (ingredients.includes(trimmed)) {
      Alert.alert('Already added', `${trimmed} is already in your list`);
      return;
    }
    setIngredients([...ingredients, trimmed]);
    setInputText('');
  };

  const removeIngredient = (name: string) => {
    setIngredients(ingredients.filter((i) => i !== name));
  };

  const handleScan = async () => {
    if (ingredients.length === 0) {
      Alert.alert('No ingredients', 'Add at least one ingredient to scan');
      return;
    }
    setScanning(true);
    try {
      const result = await pantryApi.scan(ingredients);
      navigation.navigate('ScanResults', { scanId: result.id });
    } catch (error: any) {
      Alert.alert('Scan Failed', error.message || 'Could not complete scan. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  // Common quick-add ingredients
  const quickAdd = ['Ginger', 'Turmeric', 'Honey', 'Lemon', 'Cinnamon', 'Peppermint', 'Chamomile', 'Garlic'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Pantry Scan</Text>
        <Text style={styles.subtitle}>
          List the ingredients you have at home, and we'll suggest personalized wellness rituals
        </Text>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter an ingredient (e.g., Ginger)"
            placeholderTextColor={colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addIngredient}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Add Chips */}
        <View style={styles.chips}>
          {quickAdd.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                ingredients.includes(item.toLowerCase()) && styles.chipActive,
              ]}
              onPress={() => {
                const name = item.toLowerCase();
                if (ingredients.includes(name)) {
                  removeIngredient(name);
                } else {
                  setIngredients([...ingredients, name]);
                }
              }}
            >
              <Text
                style={[
                  styles.chipText,
                  ingredients.includes(item.toLowerCase()) && styles.chipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Current Ingredients */}
        {ingredients.length > 0 && (
          <View style={styles.ingredientsList}>
            <Text style={styles.sectionTitle}>
              Your Ingredients ({ingredients.length})
            </Text>
            {ingredients.map((item) => (
              <View key={item} style={styles.ingredientItem}>
                <Text style={styles.ingredientName}>{item}</Text>
                <TouchableOpacity onPress={() => removeIngredient(item)}>
                  <Text style={styles.removeButton}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Scan Button */}
        <TouchableOpacity
          style={[styles.scanButton, scanning && styles.scanButtonDisabled]}
          onPress={handleScan}
          disabled={scanning}
        >
          {scanning ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.scanButtonText}>
              {ingredients.length > 0
                ? `Discover Rituals for ${ingredients.length} Ingredients`
                : 'Add Ingredients to Scan'}
            </Text>
          )}
        </TouchableOpacity>
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
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.bodyLarge,
    color: colors.textPrimary,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '600',
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
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  chipTextActive: {
    color: colors.white,
  },
  sectionTitle: {
    ...typography.headlineSmall,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  ingredientsList: {
    marginBottom: spacing.lg,
  },
  ingredientItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ingredientName: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  removeButton: {
    ...typography.bodyLarge,
    color: colors.textMuted,
    padding: spacing.xs,
  },
  scanButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  scanButtonDisabled: {
    opacity: 0.7,
  },
  scanButtonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
});