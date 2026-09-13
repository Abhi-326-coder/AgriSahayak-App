import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { Button } from '../../src/components/ui/Button';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius } from '../../src/constants/spacing';
import { LanguageSelector } from '../../src/components/shared/LanguageSelector';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.logo}>🌾</Text>
        <Text style={styles.appName}>AgriSahayak</Text>
        <Text style={styles.tagline}>
          AI-Powered Agricultural Intelligence Platform
        </Text>
        <Text style={styles.kannadaTagline}>
          ರೈತರಿಗೆ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಆಧಾರಿತ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ
        </Text>

        <View style={styles.langBox}>
          <Text style={styles.langPrompt}>Select Language / ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ</Text>
          <LanguageSelector />
        </View>

        <View style={styles.btnRow}>
          <Button
            title="Enter Dashboard (Demo Mode) →"
            variant="primary"
            onPress={() => router.replace('/(tabs)')}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  logo: {
    fontSize: 64,
    marginBottom: Spacing.sm,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  kannadaTagline: {
    fontSize: 14,
    color: Colors.secondaryGreen,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  langBox: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  langPrompt: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  btnRow: {
    width: '100%',
    maxWidth: 320,
  },
});
