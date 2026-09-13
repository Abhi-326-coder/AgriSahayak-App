/**
 * Marketplace API Service
 * ========================
 * All marketplace-related API calls.
 * Screen → useMarketplace() hook → marketplaceService → apiClient → Backend
 */

import { apiClient } from './client';
import { Buyer, MatchRequest, MatchResponse } from '../../types';

export const marketplaceService = {
  /**
   * Get all available buyers.
   * Backend: GET /api/v1/marketplace/buyers
   */
  getBuyers: async (crop?: string): Promise<Buyer[]> => {
    const params = crop ? `?crop=${encodeURIComponent(crop)}` : '';
    return apiClient.get<Buyer[]>(`/marketplace/buyers${params}`);
  },

  /**
   * Get a specific buyer by ID.
   * Backend: GET /api/v1/marketplace/buyers/:id
   */
  getBuyer: async (buyerId: number): Promise<Buyer> => {
    return apiClient.get<Buyer>(`/marketplace/buyers/${buyerId}`);
  },

  /**
   * Match buyers to farmer's produce using deterministic algorithm.
   * Backend: POST /api/v1/marketplace/match
   */
  matchBuyers: async (request: MatchRequest): Promise<MatchResponse> => {
    return apiClient.post<MatchResponse>('/marketplace/match', request);
  },
};
