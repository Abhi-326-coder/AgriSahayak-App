/**
 * Voice AI Feature Hooks
 */

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { voiceService } from '../../../services/api/voice';
import { VoiceProcessRequest, VoiceProcessResponse } from '../../../types';

export const useVoiceAssistant = () => {
  const [lastResponse, setLastResponse] = useState<VoiceProcessResponse | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [queryText, setQueryText] = useState('');

  const mutation = useMutation({
    mutationFn: (request: VoiceProcessRequest) => voiceService.processInput(request),
    onSuccess: (data) => {
      setLastResponse(data);
    },
  });

  const processText = (text: string, language: string = 'en') => {
    setQueryText(text);
    return mutation.mutate({ text, language });
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    processText('I have 2000 kg tomatoes. Where should I sell?', 'kn');
  };

  const submitTextQuery = (text: string, language: string = 'en') => {
    return processText(text, language);
  };

  return {
    isRecording,
    queryText,
    startRecording,
    stopRecording,
    submitTextQuery,
    processText,
    isProcessing: mutation.isPending,
    response: lastResponse,
    error: mutation.error,
    reset: () => {
      mutation.reset();
      setLastResponse(null);
      setQueryText('');
      setIsRecording(false);
    },
  };
};
