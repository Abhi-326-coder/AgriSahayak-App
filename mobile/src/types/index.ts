/**
 * AgriSahayak — Shared TypeScript Types
 */

// ------------------------------------
// Farmer
// ------------------------------------
export interface Farmer {
  id: string;
  name: string;
  phone: string;
  location: string;
  total_acres: number;
  primary_crop: string;
  language: 'en' | 'kn' | 'hi' | 'te' | 'ta' | 'mr';
  created_at: string;
}

export interface FarmerCreate {
  name: string;
  phone: string;
  location: string;
  total_acres: number;
  primary_crop: string;
  language: string;
}

// ------------------------------------
// Marketplace / Buyer
// ------------------------------------
export interface Buyer {
  id: number;
  name: string;
  type: 'Food Processor' | 'Wholesale Buyer' | 'Retail Chain' | 'Cooperative';
  crop: string;
  price: number;
  distance: number;
  match_score: number;
  verified: boolean;
  location: string;
  min_quantity: number;
  max_quantity: number;
  payment_terms: string;
  description: string;
}

export interface MatchedBuyer extends Buyer {
  match_reasons: string[];
  estimated_revenue: number;
}

export interface MatchRequest {
  crop: string;
  quantity: number;
  quality: 'Excellent' | 'Good' | 'Fair';
  location: string;
}

export interface MatchResponse {
  crop: string;
  quantity: number;
  quality: string;
  location: string;
  total_matches: number;
  buyers: MatchedBuyer[];
}

// ------------------------------------
// Voice / AI
// ------------------------------------
export interface VoiceProcessRequest {
  text: string;
  language?: string;
  farmer_id?: string;
}

export interface VoiceProcessResponse {
  intent: VoiceIntent;
  crop: string | null;
  quantity: number | null;
  location: string | null;
  language: string;
  confidence: number;
  next_action: NextAction;
  message: string;
  suggested_queries: string[];
}

export type VoiceIntent =
  | 'SELL_PRODUCE'
  | 'CROP_DIAGNOSIS'
  | 'WEATHER_QUERY'
  | 'GOVERNMENT_SCHEMES'
  | 'FINANCE_QUERY'
  | 'STORAGE_QUERY'
  | 'GENERAL_QUERY';

export type NextAction =
  | 'MARKETPLACE'
  | 'CROP_ANALYSIS'
  | 'WEATHER'
  | 'GOVERNMENT_BENEFITS'
  | 'SMART_STORAGE'
  | 'DASHBOARD';

// ------------------------------------
// Government Schemes
// ------------------------------------
export interface GovernmentScheme {
  id: string;
  name: string;
  local_name: string;
  ministry: string;
  benefit_amount: string | null;
  eligibility: string[];
  documents_required: string[];
  application_url: string | null;
  status: 'active' | 'upcoming' | 'closed';
}

// ------------------------------------
// Crops
// ------------------------------------
export interface Crop {
  id: string;
  name: string;
  local_name: string;
  season: string;
  avg_yield_kg_per_acre: number;
  avg_market_price: number;
  common_diseases: string[];
}

// ------------------------------------
// API Response Wrappers
// ------------------------------------
export interface ApiError {
  error: string;
  message: string;
}

export type Language = 'en' | 'kn' | 'hi' | 'te' | 'ta' | 'mr';

// ------------------------------------
// UI State
// ------------------------------------
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface QuickAction {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  route: string;
  bgColor: string;
  iconColor: string;
}

// ------------------------------------
// Mock Farmer Profile (local state)
// ------------------------------------
export const MOCK_FARMER: Farmer = {
  id: 'farmer-001',
  name: 'Ravi Kumar',
  phone: '+91-9876543210',
  location: 'Bengaluru Rural, Karnataka',
  total_acres: 3.0,
  primary_crop: 'Tomato',
  language: 'kn',
  created_at: '2024-01-15T10:00:00',
};
