/**
 * Farmer Global Store — Zustand
 * ==============================
 * Lightweight global state for the currently logged-in farmer.
 * Only use for client state that must persist across screens.
 * Server state (API data) belongs in React Query.
 */

import { create } from 'zustand';
import { Farmer, Language, MOCK_FARMER } from '../types';
import { storage } from '../services/storage/storage';

interface FarmerStore {
  farmer: Farmer | null;
  language: Language;
  isOnboarded: boolean;

  // Actions
  setFarmer: (farmer: Farmer) => void;
  setLanguage: (language: Language) => void;
  setOnboarded: (value: boolean) => void;
  clearFarmer: () => void;
  initializeFromStorage: () => Promise<void>;
}

export const useFarmerStore = create<FarmerStore>((set) => ({
  // Phase 1: Pre-populated with mock farmer for demo
  farmer: MOCK_FARMER,
  language: 'kn',
  isOnboarded: true,

  setFarmer: (farmer) => {
    set({ farmer });
    storage.setFarmerId(farmer.id);
  },

  setLanguage: (language) => {
    set({ language });
    storage.setLanguage(language);
  },

  setOnboarded: (value) => {
    set({ isOnboarded: value });
    if (value) storage.setOnboardingComplete();
  },

  clearFarmer: () => {
    set({ farmer: null, isOnboarded: false });
  },

  initializeFromStorage: async () => {
    const farmerId = await storage.getFarmerId();
    const language = await storage.getLanguage();
    const onboarded = await storage.isOnboardingComplete();

    if (language) {
      set({ language: language as Language });
    }
    if (onboarded !== null) {
      set({ isOnboarded: onboarded });
    }
    // Note: Full farmer data will be fetched via React Query
  },
}));
