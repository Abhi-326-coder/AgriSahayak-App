import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';

const GUIDES = [
  {
    title: 'Tomato Early & Late Blight Identification & Cure',
    category: 'Disease Management',
    readTime: '4 min read · ICAR Bangalore Guide',
    icon: '🔬',
  },
  {
    title: 'Drip Fertigation Schedule for Kharif Tomato',
    category: 'Soil & Nutrition',
    readTime: '6 min read · UAS Dharwad',
    icon: '💧',
  },
  {
    title: 'Post-Harvest Sorting for Export Grade Tomato',
    category: 'Market Quality',
    readTime: '3 min read · APEDA Standard',
    icon: '📦',
  },
  {
    title: 'Solar Water Pump Installation & KUSUM Subsidy Walkthrough',
    category: 'Govt Schemes',
    readTime: '5 min read · Step-by-step',
    icon: '☀️',
  },
];

export default function KnowledgeCenterScreen() {
  return (
    <Screen style={styles.screen}>
      <Header
        title="Knowledge Center"
        subtitle="ಕೃಷಿ ಜ್ಞಾನ ಕೇಂದ್ರ · KVK & Scientific Guides"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.sectionHeading}>Agricultural Best Practices</Text>

        {GUIDES.map((g, i) => (
          <Pressable key={i} style={styles.guideCard}>
            <Text style={styles.guideIcon}>{g.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.guideCategory}>{g.category}</Text>
              <Text style={styles.guideTitle}>{g.title}</Text>
              <Text style={styles.guideTime}>{g.readTime}</Text>
            </View>
          </Pressable>
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
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  guideIcon: {
    fontSize: 28,
  },
  guideCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.accentGold,
    textTransform: 'uppercase',
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  guideTime: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
});
