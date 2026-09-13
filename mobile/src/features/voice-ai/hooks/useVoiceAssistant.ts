/**
 * Voice AI Feature Hooks
 */

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { voiceService } from '../../../services/api/voice';
import { VoiceProcessRequest, VoiceProcessResponse } from '../../../types';

export const useVoiceAssistant = () => {
  const [lastResponse, setLastResponse] = useState<VoiceProcessResponse | null>(null);

  const mutation = useMutation({
    mutationFn: (request: VoiceProcessRequest) => voiceService.processInput(request),
    onSuccess: (data) => {
      setLastResponse(data);
    },
  });

  const processText = (text: string, language: string = 'en') => {
    return mutation.mutate({ text, language });
  };

  return {
    processText,
    isProcessing: mutation.isPending,
    response: lastResponse,
    error: mutation.error,
    reset: () => {
      mutation.reset();
      setLastResponse(null);
    },
  };
};
