import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Badge } from '../../src/components/ui/Badge';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';

const FORECAST = [
  { day: 'Today', temp: '28° / 19°', condition: 'Sunny & Clear', icon: '☀️', rainProb: '10%' },
  { day: 'Tomorrow', temp: '27° / 20°', condition: 'High Humidity / Light Shower', icon: '🌦️', rainProb: '65%' },
  { day: 'Wednesday', temp: '26° / 18°', condition: 'Scattered Showers', icon: '🌧️', rainProb: '80%' },
  { day: 'Thursday', temp: '29° / 19°', condition: 'Partly Cloudy', icon: '⛅', rainProb: '20%' },
];

export default function WeatherScreen() {
  return (
    <Screen style={styles.screen}>
      <Header
        title="Weather Intelligence"
        subtitle="ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ · Microclimate Advisory"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Current Weather Card */}
        <View style={styles.heroCard}>
          <Text style={styles.locationText}>📍 Devenahalli, Bengaluru Rural</Text>
          <Text style={styles.currentTemp}>28°C</Text>
          <Text style={styles.conditionText}>Clear Skies · High Solar Radiation</Text>

          <View style={styles.weatherMetricsRow}>
            <View style={styles.wMetric}>
              <Text style={styles.wVal}>62%</Text>
              <Text style={styles.wKey}>Humidity</Text>
            </View>
            <View style={styles.wMetric}>
              <Text style={styles.wVal}>14 km/h</Text>
              <Text style={styles.wKey}>Wind Speed</Text>
            </View>
            <View style={styles.wMetric}>
              <Text style={styles.wVal}>68%</Text>
              <Text style={styles.wKey}>Soil Moisture</Text>
            </View>
          </View>
        </View>

        {/* Agricultural Advisory based on Weather */}
        <Text style={styles.sectionHeading}>Agricultural Weather Advisory</Text>
        <View style={styles.advisoryCard}>
          <View style={styles.advisoryHeader}>
            <Badge label="SPRAYING ADVISORY" variant="warning" size="sm" />
          </View>
          <Text style={styles.advisoryTitle}>Delay Foliar Spraying to Thursday</Text>
          <Text style={styles.advisoryDesc}>
            Rain expected on Wednesday afternoon (80% probability). Any chemical foliar spray applied today or tomorrow will wash off before systemic absorption.
          </Text>
        </View>

        {/* 4-Day Forecast */}
        <Text style={styles.sectionHeading}>4-Day Cluster Forecast</Text>
        {FORECAST.map((f, idx) => (
          <View key={idx} style={styles.forecastCard}>
            <Text style={styles.fDay}>{f.day}</Text>
            <Text style={styles.fIcon}>{f.icon}</Text>
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <Text style={styles.fCondition}>{f.condition}</Text>
              <Text style={styles.fRain}>Rain Risk: {f.rainProb}</Text>
            </View>
            <Text style={styles.fTemp}>{f.temp}</Text>
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
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  locationText: {
    fontSize: 13,
    color: Colors.accentGold,
    fontWeight: '600',
  },
  currentTemp: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.textInverse,
    marginVertical: 4,
  },
  conditionText: {
    fontSize: 14,
    color: Colors.textInverse,
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  weatherMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
    paddingTop: Spacing.md,
  },
  wMetric: {
    alignItems: 'center',
  },
  wVal: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  wKey: {
    fontSize: 11,
    color: Colors.textInverse,
    opacity: 0.7,
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  advisoryCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  advisoryHeader: {
    marginBottom: Spacing.xs,
  },
  advisoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  advisoryDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  forecastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xs,
  },
  fDay: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    width: 80,
  },
  fIcon: {
    fontSize: 22,
  },
  fCondition: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  fRain: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  fTemp: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
});
