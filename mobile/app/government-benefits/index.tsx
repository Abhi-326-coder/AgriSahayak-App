import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';

const SCHEMES = [
  {
    id: 'pm-kisan',
    title: 'PM-KISAN Samman Nidhi',
    category: 'Direct Income Support',
    amount: '₹6,000 / year (₹2,000 / 4 months)',
    status: 'ACTIVE_BENEFICIARY',
    statusLabel: 'Active Beneficiary',
    lastCredited: '17th Installment received (Aug 2026)',
    actionText: 'View Payment History',
  },
  {
    id: 'pm-kusum',
    title: 'PM-KUSUM Solar Irrigation Pump Scheme',
    category: 'Renewable Energy Subsidy',
    amount: 'Up to 60% Govt Subsidy (₹1,40,000)',
    status: 'ELIGIBLE_APPLY_NOW',
    statusLabel: 'Eligible · Apply Now',
    lastCredited: 'Applications open for Bengaluru Rural farmers',
    actionText: 'Start Simple Application',
  },
  {
    id: 'pmfby',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Comprehensive Crop Insurance',
    amount: 'Full coverage against drought, flood, pest',
    status: 'ENROLLED',
    statusLabel: 'Policy Active · Kharif 2026',
    lastCredited: 'Sum insured: ₹1,20,000 across 3 acres',
    actionText: 'File Claim / View Certificate',
  },
  {
    id: 'kcc',
    title: 'Kisan Credit Card (KCC)',
    category: 'Concessional Agricultural Credit',
    amount: 'Up to ₹3,00,000 at 4% interest',
    status: 'APPROVED',
    statusLabel: 'Active Limit: ₹1,80,000',
    lastCredited: 'Canara Bank, Devenahalli Branch',
    actionText: 'View Loan Details',
  },
];

export default function GovernmentBenefitsScreen() {
  return (
    <Screen style={styles.screen}>
      <Header
        title="Government Benefits"
        subtitle="ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು · Subsidies & Entitlements"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Total Benefit Claimed Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Direct Subsidies Credited</Text>
          <Text style={styles.summaryAmount}>₹38,000</Text>
          <Text style={styles.summarySub}>
            Aadhaar Linked Account: Canara Bank (..4821)
          </Text>
        </View>

        <Text style={styles.sectionHeading}>Your Eligible Welfare Schemes</Text>

        {SCHEMES.map((scheme) => (
          <View key={scheme.id} style={styles.schemeCard}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.schemeCategory}>{scheme.category}</Text>
                <Text style={styles.schemeTitle}>{scheme.title}</Text>
              </View>
              <Badge
                label={scheme.statusLabel}
                variant={
                  scheme.status === 'ELIGIBLE_APPLY_NOW'
                    ? 'gold'
                    : scheme.status === 'ACTIVE_BENEFICIARY' || scheme.status === 'ENROLLED'
                    ? 'success'
                    : 'info'
                }
                size="sm"
              />
            </View>

            <View style={styles.benefitBox}>
              <Text style={styles.benefitText}>🎁 {scheme.amount}</Text>
              <Text style={styles.lastCreditedText}>{scheme.lastCredited}</Text>
            </View>

            <Button
              title={scheme.actionText}
              variant={scheme.status === 'ELIGIBLE_APPLY_NOW' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => {}}
            />
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
  schemeCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  schemeCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.accentGold,
    textTransform: 'uppercase',
  },
  schemeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  benefitBox: {
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  benefitText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 2,
  },
  lastCreditedText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
