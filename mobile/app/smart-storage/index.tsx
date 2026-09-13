import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';

const STORAGES = [
  {
    name: 'Devenahalli Agro Cold Hub',
    type: 'Controlled Atmosphere (CA) Cold Storage',
    distance: '14 km',
    capacityAvailable: '45 MT available',
    rate: '₹1.80 / kg / month',
    temp: '10°C - 12°C (Ideal for Tomato preservation)',
    govSubsidized: true,
  },
  {
    name: 'Kolar District Warehouse Corp',
    type: 'State Warehousing Corp (SWC)',
    distance: '32 km',
    capacityAvailable: '120 MT available',
    rate: '₹1.40 / kg / month',
    temp: 'Ambient / Dry Aerated',
    govSubsidized: true,
  },
];

export default function SmartStorageScreen() {
  return (
    <Screen style={styles.screen}>
      <Header
        title="Smart Storage"
        subtitle="ಶೀತಲ ಸಂಗ್ರಹಾಗಾರ · Cold Storage & Preservation"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.advisoryCard}>
          <Badge label="STORAGE VS IMMEDIATE SALE" variant="gold" size="sm" />
          <Text style={styles.advisoryTitle}>Preserve 500 kg Tomatoes for 10 Days?</Text>
          <Text style={styles.advisoryDesc}>
            Holding cost: ₹900. Projected price increase in 10 days due to post-festival supply dip: +₹380/qtl (+₹1,900 gain). Net profit: +₹1,000.
          </Text>
        </View>

        <Text style={styles.sectionHeading}>Nearby Verified Cold Storage Hubs</Text>
        {STORAGES.map((s, idx) => (
          <View key={idx} style={styles.storageCard}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.storageName}>{s.name}</Text>
                <Text style={styles.storageType}>{s.type}</Text>
              </View>
              {s.govSubsidized && (
                <Badge label="Govt Subsidized" variant="success" size="sm" />
              )}
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Rate</Text>
                <Text style={styles.infoVal}>{s.rate}</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Distance</Text>
                <Text style={styles.infoVal}>📍 {s.distance}</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Space</Text>
                <Text style={styles.infoVal}>{s.capacityAvailable}</Text>
              </View>
            </View>

            <Text style={styles.tempNote}>🌡️ {s.temp}</Text>

            <Button
              title="Book Storage Space"
              variant="outline"
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
  advisoryCard: {
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.xs,
    ...Shadows.md,
  },
  advisoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textInverse,
    marginTop: 2,
  },
  advisoryDesc: {
    fontSize: 13,
    color: Colors.textInverse,
    opacity: 0.85,
    lineHeight: 18,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  storageCard: {
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
    marginBottom: Spacing.sm,
  },
  storageName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  storageType: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoCol: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginTop: 2,
  },
  tempNote: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
});
