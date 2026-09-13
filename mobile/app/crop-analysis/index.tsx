import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';

export default function CropAnalysisScreen() {
  const router = useRouter();

  return (
    <Screen style={styles.screen}>
      <Header
        title="Crop Quality Intelligence"
        subtitle="ಕೃಷಿ ಗುಣಮಟ್ಟ ವಿಶ್ಲೇಷಣೆ · AI Vision & Diagnosis"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Camera Scan Trigger Card */}
        <View style={styles.scanHero}>
          <Text style={styles.scanIcon}>📸</Text>
          <Text style={styles.scanTitle}>Instant Leaf & Fruit AI Scanner</Text>
          <Text style={styles.scanSubtitle}>
            Take a photo of leaves, stems, or tomatoes to detect diseases, nutrient deficiencies, or grading.
          </Text>
          <Button
            title="Open Camera / Upload Photo"
            variant="gold"
            onPress={() => {}}
          />
        </View>

        {/* Latest Scan Result */}
        <Text style={styles.sectionHeading}>Latest Batch Quality Assessment</Text>
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View>
              <Text style={styles.cropTitle}>🍅 Hybrid Tomato (Plot A)</Text>
              <Text style={styles.scanTime}>Scanned today at 09:30 AM</Text>
            </View>
            <Badge label="Grade A Quality" variant="success" />
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>94.2%</Text>
              <Text style={styles.metricKey}>Uniform Color</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>65-72mm</Text>
              <Text style={styles.metricKey}>Diameter Size</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>0.8%</Text>
              <Text style={styles.metricKey}>Surface Blemish</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>Optimal</Text>
              <Text style={styles.metricKey}>Firmness</Text>
            </View>
          </View>

          {/* Premium Market Matching Suggestion */}
          <View style={styles.matchingBanner}>
            <Text style={styles.matchingText}>
              💡 <Text style={styles.bold}>Grade A Qualification:</Text> Eligible for premium retail procurement (+₹400/quintal over mandi standard).
            </Text>
            <Button
              title="View Premium Buyers →"
              variant="primary"
              size="sm"
              onPress={() => router.push('/(tabs)/marketplace')}
            />
          </View>
        </View>

        {/* Disease Risk Monitoring */}
        <Text style={styles.sectionHeading}>Disease & Pest Alerts</Text>
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>⚠️ Early Blight Vulnerability</Text>
            <Badge label="Medium Risk" variant="warning" size="sm" />
          </View>
          <Text style={styles.alertDesc}>
            Favorable humidity conditions (82%) observed in Devenahalli cluster. Preventive spray of Mancozeb 75% WP @ 2g/L recommended within 24 hours.
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
  scanHero: {
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  scanIcon: {
    fontSize: 48,
    marginBottom: Spacing.xs,
  },
  scanTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textInverse,
    marginBottom: 4,
  },
  scanSubtitle: {
    fontSize: 13,
    color: Colors.textInverse,
    opacity: 0.85,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 18,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  resultCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cropTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  scanTime: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  metricItem: {
    width: '47%',
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  metricVal: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  metricKey: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  matchingBanner: {
    backgroundColor: '#FFF8E1',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.accentGold,
    gap: Spacing.xs,
  },
  matchingText: {
    fontSize: 12,
    color: Colors.textPrimary,
    lineHeight: 16,
  },
  bold: {
    fontWeight: '700',
  },
  alertCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  alertDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
