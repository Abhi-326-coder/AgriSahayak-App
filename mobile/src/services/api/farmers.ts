/**
 * Farmers API Service
 * ====================
 * All farmer profile-related API calls.
 */

import { apiClient } from './client';
import { Farmer, FarmerCreate } from '../../types';

export const farmersService = {
  /**
   * Get all farmers.
   * Backend: GET /api/v1/farmers
   */
  getFarmers: async (): Promise<Farmer[]> => {
    return apiClient.get<Farmer[]>('/farmers');
  },

  /**
   * Get a specific farmer.
   * Backend: GET /api/v1/farmers/:id
   */
  getFarmer: async (farmerId: string): Promise<Farmer> => {
    return apiClient.get<Farmer>(`/farmers/${farmerId}`);
  },

  /**
   * Register a new farmer.
   * Backend: POST /api/v1/farmers
   */
  createFarmer: async (farmer: FarmerCreate): Promise<Farmer> => {
    return apiClient.post<Farmer>('/farmers', farmer);
  },

  /**
   * Update farmer profile.
   * Backend: PATCH /api/v1/farmers/:id
   */
  updateFarmer: async (farmerId: string, updates: Partial<FarmerCreate>): Promise<Farmer> => {
    return apiClient.patch<Farmer>(`/farmers/${farmerId}`, updates);
  },
};
