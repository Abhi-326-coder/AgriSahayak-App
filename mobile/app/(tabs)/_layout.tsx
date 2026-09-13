import React from 'react';
import { Tabs } from 'expo-router';
import { Text, Platform, View } from 'react-native';
import { Colors } from '../../src/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryDark,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.cardBackground,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20 }}>🌾</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
          tabBarLabel: 'Marketplace',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20 }}>🏪</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'AI Advisor',
          tabBarLabel: 'Assistant',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? Colors.accentGold : Colors.primaryLight,
                borderRadius: 20,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text style={{ fontSize: 18 }}>🎙️</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20 }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}
