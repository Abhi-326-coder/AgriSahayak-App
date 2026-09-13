import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';
import { useBuyers } from '../../src/features/marketplace/hooks/useMarketplace';

export default function BuyerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: buyers } = useBuyers();

  const buyer = buyers?.find((b) => b.id.toString() === id) || {
    id: Number(id) || 1,
    name: 'GreenHarvest Foods Ltd',
    company_type: 'Food Processor & Exporter',
    crop_interested: 'Tomato (Hybrid / Fresh)',
    price_offered_per_quintal: 3100,
    distance_km: 25,
    match_score: 94,
    payment_terms: 'Instant UPI on Weighbridge Weighment',
    verified: true,
    rating: 4.8,
  };

  return (
    <Screen style={styles.screen}>
      <Header title="Buyer Details" subtitle="ಖರೀದಿದಾರರ ವಿವರಗಳು" showBack />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Buyer Header Card */}
        <View style={styles.buyerCard}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.buyerName}>{buyer.name}</Text>
              <Text style={styles.buyerType}>{buyer.company_type}</Text>
            </View>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreVal}>{buyer.match_score}%</Text>
              <Text style={styles.scoreSub}>AI Match</Text>
            </View>
          </View>

          <View style={styles.badgesRow}>
            {buyer.verified && <Badge label="✓ Verified Buyer" variant="success" size="sm" />}
            <Badge label={`★ ${buyer.rating} Rating`} variant="gold" size="sm" />
            <Badge label={`📍 ${buyer.distance_km} km away`} variant="info" size="sm" />
          </View>
        </View>

        {/* Commercial Terms */}
        <Text style={styles.sectionHeading}>Procurement Offer Terms</Text>
        <View style={styles.termsCard}>
          <View style={styles.termRow}>
            <Text style={styles.termLabel}>Price Offered</Text>
            <Text style={styles.termValueHighlight}>
              ₹{buyer.price_offered_per_quintal} / Quintal
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.termRow}>
            <Text style={styles.termLabel}>Target Crop</Text>
            <Text style={styles.termValue}>🍅 {buyer.crop_interested}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.termRow}>
            <Text style={styles.termLabel}>Payment Guarantee</Text>
            <Text style={styles.termValue}>{buyer.payment_terms}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.termRow}>
            <Text style={styles.termLabel}>Logistics / Pickup</Text>
            <Text style={styles.termValue}>Farm Gate Pickup Available</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            title="Lock Deal & Request Farm Pickup"
            variant="primary"
            onPress={() => {}}
          />
          <Button
            title="Call Buyer Procurement Agent"
            variant="outline"
            onPress={() => {}}
          />
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
  buyerCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  buyerName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  buyerType: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  scoreCircle: {
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.md,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  scoreVal: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.accentGold,
  },
  scoreSub: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.textInverse,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: 4,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  termsCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  termRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  termLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  termValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    maxWidth: '60%',
    textAlign: 'right',
  },
  termValueHighlight: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  actions: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
