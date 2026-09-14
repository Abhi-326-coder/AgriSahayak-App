import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
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
  
  // Keep original hooks for the text input and mock responses
  const {
    isProcessing,
    response,
    submitTextQuery,
    reset,
  } = useVoiceAssistant();

  const handleSendText = () => {
    if (inputText.trim()) {
      submitTextQuery(inputText.trim(), farmer?.language || 'kn');
      setInputText('');
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    submitTextQuery(prompt, farmer?.language || 'kn');
  };

  // Get the base URL for the webview
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
  const baseUrl = apiUrl.replace('/api/v1', '');
  const webViewUrl = `${baseUrl}/static/index.html`;

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
        {/* Live API WebView Component Replacing the old Voice Hero */}
        <View style={styles.liveVoiceContainer}>
          {Platform.OS === 'web' ? (
            <iframe
              src={webViewUrl}
              style={{ flex: 1, width: '100%', height: '100%', border: 'none' }}
              allow="camera; microphone"
            />
          ) : (
            <WebView 
              source={{ uri: webViewUrl }} 
              style={{ flex: 1, backgroundColor: 'transparent' }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
            />
          )}
        </View>

        {/* Structured AI Response Result (from text queries) */}
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
  liveVoiceContainer: {
    height: 400, // Fixed height for the embedded WebView
    width: '100%',
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadows.md,
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
