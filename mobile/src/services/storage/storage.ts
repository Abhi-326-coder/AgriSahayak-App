/**
 * AsyncStorage wrapper for AgriSahayak.
 * Provides typed get/set/remove operations.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  FARMER_ID: '@agrisahayak/farmer_id',
  LANGUAGE: '@agrisahayak/language',
  ONBOARDING_COMPLETE: '@agrisahayak/onboarding_complete',
  CACHED_BUYERS: '@agrisahayak/cached_buyers',
  LAST_SYNC: '@agrisahayak/last_sync',
} as const;

export const storage = {
  keys: STORAGE_KEYS,

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },

  // Typed helpers
  getFarmerId: () => storage.get<string>(STORAGE_KEYS.FARMER_ID),
  setFarmerId: (id: string) => storage.set(STORAGE_KEYS.FARMER_ID, id),

  getLanguage: () => storage.get<string>(STORAGE_KEYS.LANGUAGE),
  setLanguage: (lang: string) => storage.set(STORAGE_KEYS.LANGUAGE, lang),

  isOnboardingComplete: () => storage.get<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE),
  setOnboardingComplete: () => storage.set(STORAGE_KEYS.ONBOARDING_COMPLETE, true),
};
