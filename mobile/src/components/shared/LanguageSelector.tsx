import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { useFarmerStore } from '../../store/farmerStore';

const LANGUAGES = [
  { code: 'kn', name: 'ಕನ್ನಡ', label: 'Kannada' },
  { code: 'en', name: 'English', label: 'English' },
  { code: 'hi', name: 'हिंदी', label: 'Hindi' },
];

export const LanguageSelector: React.FC = () => {
  const { farmer, setLanguage } = useFarmerStore();
  const currentLang = farmer?.language || 'kn';

  return (
    <View style={styles.container}>
      {LANGUAGES.map((lang) => {
        const isSelected = currentLang === lang.code;
        return (
          <Pressable
            key={lang.code}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => setLanguage(lang.code as any)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {lang.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.textInverse,
    fontWeight: '700',
  },
});
