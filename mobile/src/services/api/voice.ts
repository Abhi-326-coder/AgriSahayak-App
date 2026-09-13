/**
 * Voice API Service
 * ==================
 * All voice/AI processing API calls.
 *
 * Future: This will connect to real STT/LLM/TTS pipeline.
 */

import { apiClient } from './client';
import { VoiceProcessRequest, VoiceProcessResponse } from '../../types';

export const voiceService = {
  /**
   * Process voice/text input and get structured AI intent.
   * Backend: POST /api/v1/voice/process
   *
   * Phase 1: Rule-based mock
   * Phase 4+: Real LLM + LangGraph agent
   */
  processInput: async (request: VoiceProcessRequest): Promise<VoiceProcessResponse> => {
    return apiClient.post<VoiceProcessResponse>('/voice/process', request);
  },

  /**
   * Get supported languages for voice input.
   * Backend: GET /api/v1/voice/languages
   */
  getSupportedLanguages: async () => {
    return apiClient.get('/voice/languages');
  },
};
