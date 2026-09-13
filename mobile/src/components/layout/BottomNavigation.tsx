import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';

interface TabItem {
  name: string;
  route: string;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { name: 'index', route: '/(tabs)', label: 'Home', icon: '🌾' },
  { name: 'marketplace', route: '/(tabs)/marketplace', label: 'Market', icon: '🏪' },
  { name: 'assistant', route: '/(tabs)/assistant', label: 'Assistant', icon: '🎙️' },
  { name: 'profile', route: '/(tabs)/profile', label: 'Profile', icon: '👤' },
];

export const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive =
          (tab.name === 'index' && (pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/')) ||
          pathname.includes(tab.name);

        return (
          <Pressable
            key={tab.name}
            style={styles.tabButton}
            onPress={() => router.push(tab.route as any)}
          >
            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Shadows.md,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    minWidth: 64,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 3,
  },
  tabIconActive: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  tabLabelActive: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
});
