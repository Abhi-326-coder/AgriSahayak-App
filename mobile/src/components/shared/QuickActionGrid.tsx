import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

import { useRouter } from 'expo-router';

interface QuickActionItem {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  bgColor: string;
  iconBgColor: string;
  onPress: () => void;
}

interface QuickActionGridProps {
  actions?: QuickActionItem[];
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({ actions }) => {
  const router = useRouter();

  const defaultActions: QuickActionItem[] = [
    {
      id: 'sell',
      emoji: '🏪',
      title: 'Smart Marketplace',
      subtitle: 'Verified buyers & direct pricing',
      bgColor: '#FFFFFF',
      iconBgColor: '#E8F5E9',
      onPress: () => router.push('/(tabs)/marketplace'),
    },
    {
      id: 'quality',
      emoji: '🔬',
      title: 'Crop Quality Scan',
      subtitle: 'AI disease & grade detection',
      bgColor: '#FFFFFF',
      iconBgColor: '#FFF3E0',
      onPress: () => router.push('/crop-analysis' as any),
    },
    {
      id: 'schemes',
      emoji: '🏛️',
      title: 'Govt Benefits',
      subtitle: 'PM-KISAN, KUSUM subsidies',
      bgColor: '#FFFFFF',
      iconBgColor: '#E1F5FE',
      onPress: () => router.push('/government-benefits' as any),
    },
    {
      id: 'market',
      emoji: '📈',
      title: 'Market Intelligence',
      subtitle: 'Live APMC Mandi rates',
      bgColor: '#FFFFFF',
      iconBgColor: '#F3E5F5',
      onPress: () => router.push('/market-intelligence' as any),
    },
    {
      id: 'weather',
      emoji: '🌦️',
      title: 'Weather Advisory',
      subtitle: 'Microclimate & spraying alert',
      bgColor: '#FFFFFF',
      iconBgColor: '#E0F7FA',
      onPress: () => router.push('/weather' as any),
    },
    {
      id: 'storage',
      emoji: '❄️',
      title: 'Smart Storage',
      subtitle: 'Find nearby cold storage hubs',
      bgColor: '#FFFFFF',
      iconBgColor: '#E8EAF6',
      onPress: () => router.push('/smart-storage' as any),
    },
  ];

  const items = actions || defaultActions;

  return (
    <View style={styles.grid}>
      {items.map((action) => (
        <Pressable
          key={action.id}
          style={({ pressed }) => [
            styles.card,
            { backgroundColor: action.bgColor || Colors.surface },
            pressed && styles.pressed,
          ]}
          onPress={action.onPress}
          accessibilityRole="button"
          accessibilityLabel={action.title}
        >
          <View style={[styles.iconContainer, { backgroundColor: action.iconBgColor }]}>
            <Text style={styles.emoji}>{action.emoji}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {action.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {action.subtitle}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    // 2-column grid with gap
    width: '47.5%',
    borderRadius: BorderRadius.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
    // Shadow
    shadowColor: Colors.shadowPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    lineHeight: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
    marginTop: -2,
  },
});
