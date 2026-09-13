import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { Header } from '../../src/components/layout/Header';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius, Shadows } from '../../src/constants/spacing';
import { useVoiceAssistant } from '../../src/features/voice-ai/hooks/useVoiceAssistant';
import { useFarmerStore } from '../../src/store/farmerStore';

const SAMPLE_PROMPTS = [
  'I have 2000 kg tomatoes. Where should I sell?',
  'ನನ್ನ ಟೊಮ್ಯಾಟೊ ಬೆಳೆಗೆ ಯಾವ ಕೀಟನಾಶಕ ಬಳಸಬೇಕು?',
  'PM Kisan 17th installment release date?',
  'What is Kolar mandi tomato rate today?',
];

export default function VoiceAdvisorScreen() {
  const router = useRouter();
  const { farmer } = useFarmerStore();
  const [inputText, setInputText] = useState('');
  const {
    isRecording,
    isProcessing,
    queryText,
    response,
    error,
    startRecording,
    stopRecording,
    submitTextQuery,
    reset,
  } = useVoiceAssistant();

  const handleMicPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSendText = () => {
    if (inputText.trim()) {
      submitTextQuery(inputText.trim(), farmer?.language || 'kn');
      setInputText('');
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    submitTextQuery(prompt, farmer?.language || 'kn');
  };

  return (
    <Screen style={styles.screen}>
      <Header
        title="AI Voice Advisor"
        subtitle="ಧ್ವನಿ ಕೃಷಿ ಸಲಹೆಗಾರ · Multilingual Voice AI"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Voice Interaction Zone */}
        <View style={styles.voiceHero}>
          <Text style={styles.heroInstruction}>
            {isRecording
              ? '🎙️ Listening to your voice... Speak now'
              : isProcessing
              ? '🤖 AgriSahayak AI is analyzing your query...'
              : 'Tap microphone and speak in Kannada, Hindi or English'}
          </Text>

          {/* Large Accessible Microphone Button */}
          <Pressable
            style={[
              styles.micButton,
              isRecording && styles.micButtonRecording,
              isProcessing && styles.micButtonProcessing,
            ]}
            onPress={handleMicPress}
            disabled={isProcessing}
          >
            <Text style={styles.micEmoji}>{isRecording ? '⏹️' : '🎙️'}</Text>
          </Pressable>

          <Text style={styles.micStatus}>
            {isRecording
              ? 'Tap to Stop & Process'
              : isProcessing
              ? 'Connecting to AI Agent...'
              : 'Tap to Speak'}
          </Text>

          {/* Audio Waveform visualization */}
          <View style={styles.waveformContainer}>
            {[40, 65, 90, 45, 80, 100, 70, 50, 85, 40].map((h, i) => (
              <View
                key={i}
                style={[
                  styles.waveformBar,
                  {
                    height: isRecording ? Math.max(12, (h * Math.random()) | 0) : 10,
                    backgroundColor: isRecording
                      ? Colors.accentGold
                      : isProcessing
                      ? Colors.primaryLight
                      : Colors.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Structured AI Response Result */}
        {response && (
          <View style={styles.responseCard}>
            <View style={styles.responseHeader}>
              <Badge label="AI ADVICE READY" variant="success" size="sm" />
              <Text style={styles.langIndicator}>
                Language: {response.language.toUpperCase()}
              </Text>
            </View>

            <Text style={styles.intentTitle}>
              Intent: {response.intent.replace('_', ' ')}
            </Text>

            {response.crop && (
              <Text style={styles.responseDetail}>
                🌾 Target Crop: <Text style={styles.bold}>{response.crop}</Text>
              </Text>
            )}

            {response.quantity && (
              <Text style={styles.responseDetail}>
                📦 Quantity Identified:{' '}
                <Text style={styles.bold}>{response.quantity} kg</Text>
              </Text>
            )}

            {response.message && (
              <View style={styles.adviceBox}>
                <Text style={styles.adviceText}>{response.message}</Text>
              </View>
            )}

            {/* Action buttons based on next_action */}
            <View style={styles.actionRow}>
              {response.next_action === 'MARKETPLACE' && (
                <Button
                  title="Open Best Buyer Matches →"
                  variant="primary"
                  onPress={() => router.push('/(tabs)/marketplace')}
                />
              )}
              {response.next_action === 'GOVERNMENT_BENEFITS' && (
                <Button
                  title="View Eligible Benefits →"
                  variant="primary"
                  onPress={() => router.push('/government-benefits' as any)}
                />
              )}
              {response.next_action === 'CROP_ANALYSIS' && (
                <Button
                  title="Open Disease Diagnosis →"
                  variant="primary"
                  onPress={() => router.push('/crop-analysis' as any)}
                />
              )}
              <Button title="Ask Another Question" variant="ghost" onPress={reset} />
            </View>
          </View>
        )}

        {/* Text Fallback Input */}
        <View style={styles.textInputBox}>
          <Text style={styles.inputHeading}>Or type your question below</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Tomato price in Kolar or blight spray"
              placeholderTextColor={Colors.textMuted}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendText}
            />
            <Button
              title="Ask"
              variant="primary"
              size="sm"
              onPress={handleSendText}
              disabled={!inputText.trim() || isProcessing}
            />
          </View>
        </View>

        {/* Quick Voice Suggestions */}
        <Text style={styles.suggestionsHeading}>Frequently Asked by Farmers</Text>
        {SAMPLE_PROMPTS.map((prompt, idx) => (
          <Pressable
            key={idx}
            style={styles.promptCard}
            onPress={() => handleQuickPrompt(prompt)}
          >
            <Text style={styles.promptIcon}>💬</Text>
            <Text style={styles.promptText}>{prompt}</Text>
          </Pressable>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
  },
  voiceHero: {
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  heroInstruction: {
    fontSize: 14,
    color: Colors.textInverse,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 20,
    opacity: 0.9,
  },
  micButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.accentGold,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
    elevation: 8,
  },
  micButtonRecording: {
    backgroundColor: '#E53935',
    transform: [{ scale: 1.08 }],
  },
  micButtonProcessing: {
    backgroundColor: Colors.primaryLight,
  },
  micEmoji: {
    fontSize: 44,
  },
  micStatus: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textInverse,
    marginTop: Spacing.md,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 32,
    marginTop: Spacing.md,
  },
  waveformBar: {
    width: 4,
    borderRadius: 2,
  },
  responseCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  langIndicator: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  intentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  responseDetail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  bold: {
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  adviceBox: {
    backgroundColor: '#F1F8E9',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
  },
  adviceText: {
    fontSize: 13,
    color: Colors.primaryDark,
    lineHeight: 18,
  },
  actionRow: {
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  textInputBox: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  inputHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  suggestionsHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    marginTop: Spacing.xs,
  },
  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xs,
    gap: Spacing.sm,
  },
  promptIcon: {
    fontSize: 16,
  },
  promptText: {
    fontSize: 13,
    color: Colors.textPrimary,
    flex: 1,
  },
});
