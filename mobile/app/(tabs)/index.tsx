import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { FarmerGreeting } from '../../src/components/shared/FarmerGreeting';
import { AIInsightBanner } from '../../src/components/shared/AIInsightBanner';
import { QuickActionGrid } from '../../src/components/shared/QuickActionGrid';
import { RecommendationCard } from '../../src/components/shared/RecommendationCard';
import { LanguageSelector } from '../../src/components/shared/LanguageSelector';
import { Card } from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius } from '../../src/constants/spacing';
import { useFarmerStore } from '../../src/store/farmerStore';
import { useDashboard } from '../../src/features/dashboard/hooks/useDashboard';

export default function DashboardScreen() {
  const router = useRouter();
  const { farmer } = useFarmerStore();
  const { metrics } = useDashboard();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  return (
    <Screen style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primaryDark}
          />
        }
      >
        {/* Top bar with Language Selector */}
        <View style={styles.topBar}>
          <Text style={styles.appBrand}>🌾 AgriSahayak</Text>
          <LanguageSelector />
        </View>

        {/* Personalized Farmer Greeting from Stitch */}
        {farmer && <FarmerGreeting farmer={farmer} />}

        {/* AI Insight Banner */}
        <AIInsightBanner
          title="Optimal Selling Window Open"
          description="Tomato modal prices in Kolar APMC are up ₹240/qtl due to regional festive demand. Recommend selling 1,200 kg within 48 hours."
          impactText="Est. Extra Profit: +₹2,880"
          actionLabel="View Best Buyers"
          onPressAction={() => router.push('/(tabs)/marketplace')}
        />

        {/* Farm Condition Highlights */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>💧</Text>
            <Text style={styles.metricValue}>{metrics.soilMoisture}%</Text>
            <Text style={styles.metricLabel}>Soil Moisture (Good)</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>☀️</Text>
            <Text style={styles.metricValue}>{metrics.temperature}°C</Text>
            <Text style={styles.metricLabel}>Clear & Sunny</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>📈</Text>
            <Text style={styles.metricValue}>₹3,100</Text>
            <Text style={styles.metricLabel}>Avg Price / Qtl</Text>
          </View>
        </View>

        {/* Quick Action Grid (Navigates to detail screens) */}
        <Text style={styles.sectionTitle}>Smart Agricultural Services</Text>
        <QuickActionGrid />

        {/* Priority AI Recommendations */}
        <Text style={styles.sectionTitle}>AI Intelligence & Advisory</Text>

        <RecommendationCard
          id="rec-1"
          category="CROP PROTECTION"
          title="Early Blight Risk Warning"
          description="High humidity forecast tomorrow morning increases fungal vulnerability on 1.5 acres of your hybrid tomato plot. Apply copper oxychloride preventively."
          impactText="High Priority"
          badgeType="warning"
          actionLabel="View Advisory Flow"
          onPressAction={() => router.push('/crop-analysis' as any)}
        />

        <RecommendationCard
          id="rec-2"
          category="GOVERNMENT SUBSIDY"
          title="PM-Kisan 17th Installment Credited"
          description="₹2,000 subsidy credited to Canara Bank A/C ending 4821. Solar pump subsidy (PM-KUSUM) open for applications in Bengaluru Rural."
          impactText="₹1.4L Potential Aid"
          badgeType="success"
          actionLabel="Check Benefits"
          onPressAction={() => router.push('/government-benefits' as any)}
        />

        <View style={{ height: 32 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    paddingHorizontal: 2,
  },
  appBrand: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.3,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginVertical: Spacing.md,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  metricIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  metricLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
});
