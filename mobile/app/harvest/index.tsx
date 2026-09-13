import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';

export default function HarvestTrackerScreen() {
  return (
    <Screen style={styles.screen}>
      <Header
        title="My Harvest Tracker"
        subtitle="ನನ್ನ ಬೆಳೆ ಕೊಯ್ಲು · Batches & Yield Logs"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Harvested (Current Season)</Text>
          <Text style={styles.summaryAmount}>240 Quintals</Text>
          <Text style={styles.summarySub}>Plot A & B · 3 Acres · Tomato Hybrid</Text>
        </View>

        <Text style={styles.sectionHeading}>Harvest Batches</Text>

        <View style={styles.batchCard}>
          <View style={styles.batchHeader}>
            <View>
              <Text style={styles.batchTitle}>Batch #3 (Latest Picking)</Text>
              <Text style={styles.batchDate}>Harvested 2 days ago · 45 Quintals</Text>
            </View>
            <Badge label="Ready to Sell" variant="gold" size="sm" />
          </View>
          <Text style={styles.batchDetails}>
            Grade A: 38 Qtl · Grade B: 7 Qtl · Recommended target price: ₹3,150/qtl
          </Text>
          <Button title="Match Buyers for this Batch →" variant="primary" size="sm" onPress={() => {}} />
        </View>

        <View style={styles.batchCard}>
          <View style={styles.batchHeader}>
            <View>
              <Text style={styles.batchTitle}>Batch #2</Text>
              <Text style={styles.batchDate}>Harvested 10 days ago · 110 Quintals</Text>
            </View>
            <Badge label="Sold · Settled" variant="success" size="sm" />
          </View>
          <Text style={styles.batchDetails}>
            Sold to GreenHarvest Foods @ ₹3,100/qtl · ₹3,41,000 paid via UPI
          </Text>
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
  summaryCard: {
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.textInverse,
    opacity: 0.85,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.accentGold,
    marginVertical: 4,
  },
  summarySub: {
    fontSize: 12,
    color: Colors.textInverse,
    opacity: 0.9,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  batchCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  batchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  batchTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  batchDate: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  batchDetails: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: 18,
  },
});
