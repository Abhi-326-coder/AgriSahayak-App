import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Buyer, MatchedBuyer } from '../../types';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows } from '../../constants/spacing';

interface BuyerCardProps {
  buyer: Buyer | MatchedBuyer;
  rank?: number;
}

const getBuyerTypeEmoji = (type: string): string => {
  switch (type) {
    case 'Food Processor': return '🏭';
    case 'Wholesale Buyer': return '🏪';
    case 'Retail Chain': return '🛒';
    case 'Cooperative': return '🤝';
    default: return '🏢';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return { bg: Colors.successLight, text: Colors.success, border: Colors.success };
  if (score >= 75) return { bg: Colors.warningLight, text: Colors.goldText, border: Colors.gold };
  return { bg: Colors.surfaceVariant, text: Colors.textSecondary, border: Colors.border };
};

export const BuyerCard: React.FC<BuyerCardProps> = ({ buyer, rank }) => {
  const router = useRouter();
  const scoreStyle = getScoreColor(buyer.match_score);
  const isTopPick = rank === 1;
  const matchedBuyer = buyer as MatchedBuyer;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isTopPick && styles.topPickContainer,
        pressed && styles.pressed,
      ]}
      onPress={() => router.push(`/buyer/${buyer.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`${buyer.name}, ${buyer.match_score}% match`}
    >
      {/* Top Row: Badge + Distance */}
      <View style={styles.topRow}>
        {isTopPick ? (
          <View style={[styles.badge, { backgroundColor: Colors.primaryLight }]}>
            <Text style={styles.badgeText}>⭐ Top Pick · {buyer.match_score}% Match</Text>
          </View>
        ) : (
          <View style={[styles.badge, { backgroundColor: scoreStyle.bg, borderColor: scoreStyle.border, borderWidth: 1 }]}>
            <Text style={[styles.badgeText, { color: scoreStyle.text }]}>{buyer.match_score}% Match</Text>
          </View>
        )}
        <Text style={styles.distance}>📍 {buyer.distance} km</Text>
      </View>

      {/* Buyer Name + Type */}
      <View style={styles.nameRow}>
        <View style={styles.nameLeft}>
          <View style={styles.typeIcon}>
            <Text style={styles.typeEmoji}>{getBuyerTypeEmoji(buyer.type)}</Text>
          </View>
          <View>
            <View style={styles.nameVerifiedRow}>
              <Text style={styles.buyerName}>{buyer.name}</Text>
              {buyer.verified && <Text style={styles.verified}>✓</Text>}
            </View>
            <Text style={styles.buyerType}>{buyer.type}</Text>
          </View>
        </View>
        {/* Price Badge */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceLabel}>₹{buyer.price}/kg</Text>
        </View>
      </View>

      {/* Quantity + Payment */}
      <View style={styles.infoRow}>
        <Text style={styles.infoChip}>📦 {(buyer.min_quantity / 1000).toFixed(1)}–{(buyer.max_quantity / 1000).toFixed(1)}T</Text>
        <Text style={styles.infoChip}>💳 {buyer.payment_terms}</Text>
        <Text style={styles.infoChip}>📍 {buyer.location.split(',')[0]}</Text>
      </View>

      {/* Match Reasons (if MatchedBuyer) */}
      {matchedBuyer.match_reasons && matchedBuyer.match_reasons.length > 0 && (
        <View style={styles.reasonsRow}>
          {matchedBuyer.match_reasons.slice(0, 3).map((reason, i) => (
            <View key={i} style={styles.reasonChip}>
              <Text style={styles.reasonText}>✓ {reason}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Estimated Revenue (if MatchedBuyer) */}
      {matchedBuyer.estimated_revenue && (
        <View style={styles.revenueRow}>
          <Text style={styles.revenueLabel}>Estimated Revenue</Text>
          <Text style={styles.revenueValue}>
            ₹{matchedBuyer.estimated_revenue.toLocaleString('en-IN')}
          </Text>
        </View>
      )}

      {/* CTA */}
      <View style={styles.ctaRow}>
        <Text style={styles.ctaText}>View Details →</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
    ...Shadows.sm,
  },
  topPickContainer: {
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    ...Shadows.md,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  distance: {
    fontSize: 12,
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  nameLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  typeIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeEmoji: {
    fontSize: 22,
  },
  nameVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buyerName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  verified: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontWeight: '700',
  },
  buyerType: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  priceBadge: {
    backgroundColor: Colors.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(217,164,65,0.3)',
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.goldText,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  infoChip: {
    fontSize: 11,
    color: Colors.textSecondary,
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  reasonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  reasonChip: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  reasonText: {
    fontSize: 11,
    color: Colors.success,
    fontWeight: '600',
  },
  revenueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  revenueLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  revenueValue: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  ctaRow: {
    alignItems: 'flex-end',
  },
  ctaText: {
    fontSize: 13,
    color: Colors.primaryLight,
    fontWeight: '700',
  },
});
