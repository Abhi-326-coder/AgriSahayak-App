/**
 * Marketplace Feature Hooks
 * ===========================
 * React Query hooks for marketplace data.
 * Manages loading, error, caching automatically.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketplaceService } from '../../../services/api/marketplace';
import { MatchRequest } from '../../../types';

// Cache keys
export const MARKETPLACE_KEYS = {
  buyers: (crop?: string) => ['marketplace', 'buyers', crop] as const,
  buyer: (id: number) => ['marketplace', 'buyer', id] as const,
};

/**
 * Hook to fetch all buyers.
 * Caches for 5 minutes — mandi prices don't change every second.
 */
export const useBuyers = (crop?: string) => {
  return useQuery({
    queryKey: MARKETPLACE_KEYS.buyers(crop),
    queryFn: () => marketplaceService.getBuyers(crop),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to fetch a specific buyer.
 */
export const useBuyer = (buyerId: number) => {
  return useQuery({
    queryKey: MARKETPLACE_KEYS.buyer(buyerId),
    queryFn: () => marketplaceService.getBuyer(buyerId),
    enabled: !!buyerId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to match buyers to farmer's produce.
 * Returns a mutation (not auto-fetched, triggered on demand).
 */
export const useMatchBuyers = () => {
  return useMutation({
    mutationFn: (request: MatchRequest) => marketplaceService.matchBuyers(request),
  });
};
