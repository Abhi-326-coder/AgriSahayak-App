import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { LanguageSelector } from '../../src/components/shared/LanguageSelector';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';
import { useFarmerStore } from '../../src/store/farmerStore';

export default function ProfileScreen() {
  const { farmer } = useFarmerStore();

  if (!farmer) return null;

  return (
    <Screen style={styles.screen}>
      <Header title="Farmer Profile" subtitle="ರೈತರ ವಿವರಗಳು · Account & Settings" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Profile Card */}
        <View style={styles.profileHero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👨‍🌾</Text>
          </View>
          <Text style={styles.farmerName}>{farmer.name}</Text>
          <Text style={styles.farmerPhone}>{farmer.phone}</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Aadhaar & KCC Verified</Text>
          </View>
        </View>

        {/* Farm & Land Holdings */}
        <Text style={styles.sectionHeading}>Land & Cultivation Details</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>{farmer.location}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Land Holding</Text>
            <Text style={styles.detailValue}>{farmer.total_acres} Acres</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Primary Crop</Text>
            <Text style={styles.detailValue}>🍅 {farmer.primary_crop}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Soil Classification</Text>
            <Text style={styles.detailValue}>Red Loamy Soil</Text>
          </View>
        </View>

        {/* Language Preferences */}
        <Text style={styles.sectionHeading}>Preferred Language</Text>
        <View style={styles.detailsCard}>
          <View style={styles.langRow}>
            <Text style={styles.detailLabel}>Select Display & Audio</Text>
            <LanguageSelector />
          </View>
        </View>

        {/* Support & KVK Helpline */}
        <Text style={styles.sectionHeading}>Kisan Assistance & Helpline</Text>
        <View style={styles.helplineCard}>
          <Text style={styles.helplineTitle}>📞 Kisan Call Center (KCC)</Text>
          <Text style={styles.helplineSubtitle}>
            Toll-free agricultural advisor helpline: 1800-180-1551 (6 AM - 10 PM)
          </Text>
          <Button
            title="Call KVK Bengaluru Rural"
            variant="outline"
            size="sm"
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
  profileHero: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  avatarEmoji: {
    fontSize: 36,
  },
  farmerName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  farmerPhone: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: Spacing.sm,
  },
  verifiedBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondaryGreen,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  detailsCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  helplineCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  helplineTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  helplineSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: 18,
  },
});
