import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows } from '../../constants/spacing';

interface AIInsightBannerProps {
  profit?: string;
  title?: string;
  description: string;
  impactText?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  strategy?: string;
  allocation?: { label: string; percent: number; color: string }[];
  onExplore?: () => void;
}

export const AIInsightBanner: React.FC<AIInsightBannerProps> = ({
  profit,
  title,
  description,
  impactText,
  actionLabel,
  onPressAction,
  strategy,
  allocation,
  onExplore,
}) => {
  const router = useRouter();
  const displayProfit = profit || impactText || '+₹2,880';
  const handleAction = onPressAction || onExplore || (() => router.push('/(tabs)/marketplace'));


  return (
    <View style={styles.container}>
      {/* Glow accent */}
      <View style={styles.glowAccent} />

      {/* Header row */}
      <View style={styles.headerRow}>
        <View style={styles.aiLabel}>
          <Text style={styles.aiIcon}>🤖</Text>
          <Text style={styles.aiLabelText}>AgriSahayak Decision Engine</Text>
        </View>
        <View style={styles.profitBadge}>
          <Text style={styles.profitText}>{displayProfit}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Strategy */}
      {strategy && (
        <View style={styles.strategyBox}>
          <Text style={styles.strategyLabel}>💡 Strategy</Text>
          <Text style={styles.strategyText}>{strategy}</Text>
        </View>
      )}

      {/* Allocation bar */}
      {allocation && allocation.length > 0 && (
        <View style={styles.allocationContainer}>
          <View style={styles.allocationBar}>
            {allocation.map((segment, i) => (
              <View
                key={i}
                style={[
                  styles.allocationSegment,
                  { flex: segment.percent, backgroundColor: segment.color },
                ]}
              />
            ))}
          </View>
          <View style={styles.legendRow}>
            {allocation.map((segment, i) => (
              <View key={i} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: segment.color }]} />
                <Text style={styles.legendText}>{segment.percent}% {segment.label}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* CTA */}
      <Pressable
        style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaPressed]}
        onPress={handleAction}
        accessibilityRole="button"
        accessibilityLabel={actionLabel ?? 'Explore AI Strategy'}
      >
        <Text style={styles.ctaText}>{actionLabel ?? 'Explore AI Strategy →'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.goldTransparent30,
    gap: 12,
    overflow: 'hidden',
    ...Shadows.lg,
  },
  glowAccent: {
    position: 'absolute',
    right: -32,
    bottom: -32,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: Colors.goldTransparent15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryLight,
  },
  aiLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiIcon: {
    fontSize: 16,
  },
  aiLabelText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profitBadge: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  profitText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.onGold,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.85)',
  },
  strategyBox: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: BorderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 4,
  },
  strategyLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gold,
  },
  strategyText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  allocationContainer: {
    gap: 8,
  },
  allocationBar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  allocationSegment: {
    height: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  ctaButton: {
    backgroundColor: Colors.gold,
    borderRadius: BorderRadius.DEFAULT,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 2,
  },
  ctaPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.onGold,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
