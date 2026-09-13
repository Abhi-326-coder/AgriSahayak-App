import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Farmer } from '../../types';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

interface FarmerGreetingProps {
  farmer: Farmer;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export const FarmerGreeting: React.FC<FarmerGreetingProps> = ({ farmer }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Active cluster badge */}
        <View style={styles.clusterBadge}>
          <View style={styles.clusterDot} />
          <Text style={styles.clusterText}>Devenahalli Cluster Active</Text>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>
          {getGreeting()}, {farmer.name.split(' ')[0]} 👋
        </Text>

        {/* Farm info */}
        <Text style={styles.farmInfo}>
          {farmer.location.split(',')[0]} · {farmer.total_acres} Acres · 🍅{' '}
          {farmer.primary_crop}
        </Text>
      </View>

      {/* Farmer Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarEmoji}>👨‍🌾</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadowPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  clusterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.successLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: 2,
  },
  clusterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  clusterText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'PlusJakartaSans-Bold',
    lineHeight: 26,
  },
  farmInfo: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    lineHeight: 18,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.goldTransparent30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
});
