import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { BuyerCard } from '../../src/components/shared/BuyerCard';
import { Loading } from '../../src/components/ui/Loading';
import { Button } from '../../src/components/ui/Button';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';
import { useBuyers, useMatchBuyers } from '../../src/features/marketplace/hooks/useMarketplace';

const FILTERS = ['All Crops', 'Tomato', 'Capsicum', 'Onion', 'Highest Price', 'Nearest'];

export default function MarketplaceScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All Crops');
  const [isMatching, setIsMatching] = useState(false);
  const [quantity, setQuantity] = useState('2000');

  const { data: buyers, isLoading, isError, error, refetch } = useBuyers();
  const matchMutation = useMatchBuyers();

  const handleRunMatch = () => {
    matchMutation.mutate(
      {
        crop: 'Tomato',
        quantity: parseFloat(quantity) || 2000,
        quality: 'Good',
        location: 'Bengaluru Rural',
      },
      {
        onSuccess: () => {
          setIsMatching(false);
        },
      }
    );
  };

  const displayedBuyers = matchMutation.data?.buyers || buyers || [];

  return (
    <Screen style={styles.screen}>
      <Header
        title="Smart Marketplace"
        subtitle="Verified buyers & AI price matching"
        rightAction={
          <Pressable
            style={styles.matchTriggerBtn}
            onPress={() => setIsMatching(!isMatching)}
          >
            <Text style={styles.matchTriggerText}>⚡ Match</Text>
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={Colors.primaryDark}
          />
        }
      >
        {/* Instant AI Matching Drawer / Section */}
        {isMatching && (
          <View style={styles.matchBox}>
            <Text style={styles.matchBoxTitle}>⚡ Run Deterministic Match</Text>
            <Text style={styles.matchBoxSubtitle}>
              Match your harvest against active verified buyers
            </Text>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Crop</Text>
                <View style={styles.staticInput}>
                  <Text style={styles.staticInputText}>🍅 Tomato</Text>
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Quantity (kg)</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>
            </View>

            <View style={styles.matchActions}>
              <Button
                title={matchMutation.isPending ? 'Scoring...' : 'Find Best Matches'}
                variant="primary"
                onPress={handleRunMatch}
                disabled={matchMutation.isPending}
              />
              <Button
                title="Cancel"
                variant="ghost"
                onPress={() => setIsMatching(false)}
              />
            </View>
          </View>
        )}

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              style={[
                styles.filterPill,
                selectedFilter === f && styles.filterPillActive,
              ]}
              onPress={() => setSelectedFilter(f)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  selectedFilter === f && styles.filterPillTextActive,
                ]}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Live APMC Benchmark Bar */}
        <View style={styles.apmcBar}>
          <Text style={styles.apmcLabel}>Kolar Mandi Benchmark:</Text>
          <Text style={styles.apmcValue}>₹2,850 - ₹3,200 / Qtl</Text>
          <Text style={styles.apmcTrend}>▲ +8.2%</Text>
        </View>

        {/* LOADING STATE */}
        {isLoading && (
          <View style={styles.centerContainer}>
            <Loading message="Fetching verified buyers..." />
          </View>
        )}

        {/* ERROR STATE */}
        {isError && !isLoading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Could not load marketplace</Text>
            <Text style={styles.errorSubtitle}>
              {error?.message || 'Check backend connection or local network IP'}
            </Text>
            <Button title="Retry" variant="outline" onPress={() => refetch()} />
          </View>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !isError && displayedBuyers.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>No Buyers Available</Text>
            <Text style={styles.emptySubtitle}>
              No verified buyers are currently accepting offers for this filter.
            </Text>
          </View>
        )}

        {/* SUCCESS / DATA LIST */}
        {!isLoading &&
          !isError &&
          displayedBuyers.map((buyer) => (
            <BuyerCard
              key={buyer.id}
              buyer={buyer}
              onPressContact={() =>
                router.push({
                  pathname: '/buyer/[id]',
                  params: { id: buyer.id.toString() },
                } as any)
              }
            />
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
  matchTriggerBtn: {
    backgroundColor: Colors.accentGold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  matchTriggerText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  matchBox: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.accentGold,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  matchBoxTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  matchBoxSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  staticInput: {
    backgroundColor: Colors.surface,
    padding: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  staticInputText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: Colors.surface,
    padding: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  matchActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  filterScroll: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  filterPillText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  filterPillTextActive: {
    color: Colors.textInverse,
    fontWeight: '700',
  },
  apmcBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    gap: 6,
  },
  apmcLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  apmcValue: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  apmcTrend: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2E7D32',
  },
  centerContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  errorIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C62828',
    marginBottom: 4,
  },
  errorSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginTop: 4,
  },
});
