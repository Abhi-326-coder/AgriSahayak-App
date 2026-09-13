import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';

const MANDIS = [
  { name: 'Kolar APMC Mandi', distance: '38 km', tomatoRate: '₹3,150', trend: '▲ +8.2%', modal: '₹3,000' },
  { name: 'Yeshwanthpur APMC', distance: '26 km', tomatoRate: '₹2,920', trend: '▼ -2.1%', modal: '₹2,850' },
  { name: 'Chikkaballapur APMC', distance: '22 km', tomatoRate: '₹3,050', trend: '▲ +4.5%', modal: '₹2,950' },
  { name: 'Hosakote Sub-Market', distance: '19 km', tomatoRate: '₹2,880', trend: '— 0.0%', modal: '₹2,880' },
];

export default function MarketIntelligenceScreen() {
  const router = useRouter();

  return (
    <Screen style={styles.screen}>
      <Header
        title="Market Intelligence"
        subtitle="ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ · Real-time APMC Mandi Rates"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Recommendation card */}
        <View style={styles.heroCard}>
          <Badge label="AI MARKET TIMING" variant="gold" size="sm" />
          <Text style={styles.heroTitle}>Optimal Mandi for Tomatoes: Kolar APMC</Text>
          <Text style={styles.heroDesc}>
            Price differential is +₹230/qtl compared to Bengaluru local market. After deducting ₹80/qtl transport cost, net gain is +₹150/qtl.
          </Text>
          <Button
            title="Match Kolar Direct Buyers →"
            variant="gold"
            size="sm"
            onPress={() => router.push('/(tabs)/marketplace')}
          />
        </View>

        {/* Mandi comparison table */}
        <Text style={styles.sectionHeading}>Nearby APMC Mandi Benchmarks</Text>
        {MANDIS.map((mandi, i) => (
          <View key={i} style={styles.mandiCard}>
            <View style={styles.mandiHeader}>
              <View>
                <Text style={styles.mandiName}>{mandi.name}</Text>
                <Text style={styles.mandiDist}>📍 {mandi.distance} away</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.mandiRate}>{mandi.tomatoRate}</Text>
                <Text
                  style={[
                    styles.mandiTrend,
                    {
                      color: mandi.trend.includes('▲')
                        ? '#2E7D32'
                        : mandi.trend.includes('▼')
                        ? '#C62828'
                        : Colors.textMuted,
                    },
                  ]}
                >
                  {mandi.trend}
                </Text>
              </View>
            </View>
          </View>
        ))}

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
  heroCard: {
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.xs,
    ...Shadows.md,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textInverse,
    marginTop: 2,
  },
  heroDesc: {
    fontSize: 13,
    color: Colors.textInverse,
    opacity: 0.85,
    lineHeight: 18,
    marginBottom: Spacing.xs,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  mandiCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  mandiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mandiName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  mandiDist: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  mandiRate: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  mandiTrend: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
});
