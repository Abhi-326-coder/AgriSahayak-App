import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

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
  actions: QuickActionItem[];
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({ actions }) => {
  return (
    <View style={styles.grid}>
      {actions.map((action) => (
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
