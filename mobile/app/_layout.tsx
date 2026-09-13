import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors } from '../src/constants/colors';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" backgroundColor={Colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="crop-analysis/index" options={{ headerShown: false }} />
        <Stack.Screen name="government-benefits/index" options={{ headerShown: false }} />
        <Stack.Screen name="market-intelligence/index" options={{ headerShown: false }} />
        <Stack.Screen name="buyer/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="smart-storage/index" options={{ headerShown: false }} />
        <Stack.Screen name="weather/index" options={{ headerShown: false }} />
        <Stack.Screen name="harvest/index" options={{ headerShown: false }} />
        <Stack.Screen name="knowledge-center/index" options={{ headerShown: false }} />
        <Stack.Screen name="recommendations/index" options={{ headerShown: false }} />
        <Stack.Screen name="impact/index" options={{ headerShown: false }} />
        <Stack.Screen name="voice-ai/index" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
