import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { RecommendationCard } from '../../src/components/shared/RecommendationCard';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';

export default function RecommendationsScreen() {
  const router = useRouter();

  return (
    <Screen style={styles.screen}>
      <Header
        title="AI Recommendations"
        subtitle="ಎಐ ಸಲಹೆಗಳು · Tailored Actionable Insights"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <RecommendationCard
          id="rec-1"
          category="CROP PROTECTION"
          title="Preventive Fungicide Spray for Early Blight"
          description="High humidity detected in Bengaluru Rural. Apply copper oxychloride (3g/L) before Wednesday rainfall."
          impactText="Prevents ~15% yield loss"
          badgeType="warning"
          actionLabel="View Treatment Protocol"
          onPressAction={() => router.push('/crop-analysis' as any)}
        />

        <RecommendationCard
          id="rec-2"
          category="MARKET TIMING"
          title="Direct Sale Opportunity in Kolar Mandi"
          description="Kolar wholesale rate is ₹3,150/qtl, higher than Bengaluru APMC by ₹230/qtl. Verified buyer Ninjacart accepting direct farm pickup."
          impactText="+₹4,600 Extra Income"
          badgeType="gold"
          actionLabel="Review Buyer Matches"
          onPressAction={() => router.push('/(tabs)/marketplace')}
        />

        <RecommendationCard
          id="rec-3"
          category="GOVERNMENT SUBSIDY"
          title="PM-KUSUM Solar Irrigation Subsidy"
          description="Applications close in 14 days for Bengaluru Rural district. Up to 60% capital cost covered for 3HP solar pump."
          impactText="Save ₹1,40,000"
          badgeType="success"
          actionLabel="Check Eligibility"
          onPressAction={() => router.push('/government-benefits' as any)}
        />

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
});
