import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing, Shadows } from '../../constants/spacing';
import { Badge } from '../ui/Badge';

export interface RecommendationCardProps {
  id: string;
  category: string;
  title: string;
  description: string;
  impactText?: string;
  badgeType?: 'success' | 'warning' | 'info' | 'gold';
  actionLabel?: string;
  onPressAction?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  category,
  title,
  description,
  impactText,
  badgeType = 'gold',
  actionLabel = 'Take Action',
  onPressAction,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Badge label={category} variant={badgeType} size="sm" />
        {impactText && <Text style={styles.impactText}>{impactText}</Text>}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {onPressAction && (
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
          onPress={onPressAction}
        >
          <Text style={styles.actionButtonText}>{actionLabel} →</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.accentGold,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  actionButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
  },
  actionButtonPressed: {
    backgroundColor: Colors.border,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
});
