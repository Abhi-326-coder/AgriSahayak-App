import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';

export default function ImpactDashboardScreen() {
  return (
    <Screen style={styles.screen}>
      <Header
        title="Farmer Impact Dashboard"
        subtitle="ರೈತರ ಪ್ರಭಾವ · Your Growth with AgriSahayak"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.impactHero}>
          <Text style={styles.heroLabel}>Net Additional Income Generated</Text>
          <Text style={styles.heroVal}>+₹42,800</Text>
          <Text style={styles.heroSub}>
            Via direct buyer matchmaking, subsidy claims & early disease prevention
          </Text>
        </View>

        <Text style={styles.sectionHeading}>Value Breakdown</Text>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🏪</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.statTitle}>Eliminated Middlemen Margin</Text>
            <Text style={styles.statDesc}>Direct sales to processors earned +₹18,500 over traditional mandi commission agents.</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🛡️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.statTitle}>Disease Yield Loss Saved</Text>
            <Text style={styles.statDesc}>Early blight detected 5 days before spread, preventing estimated ~18% crop damage (approx ₹16,300).</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🏛️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.statTitle}>Subsidies Secured</Text>
            <Text style={styles.statDesc}>PM-KISAN + PM-KUSUM subsidy paperwork initiated through AI agent.</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
  },
  impactHero: {
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  heroLabel: {
    fontSize: 13,
    color: Colors.textInverse,
    opacity: 0.85,
  },
  heroVal: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.accentGold,
    marginVertical: 4,
  },
  heroSub: {
    fontSize: 12,
    color: Colors.textInverse,
    opacity: 0.85,
    textAlign: 'center',
    lineHeight: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  statCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  statIcon: {
    fontSize: 28,
  },
  statTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  statDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
