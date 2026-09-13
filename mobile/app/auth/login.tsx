import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { Button } from '../../src/components/ui/Button';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius } from '../../src/constants/spacing';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('9876543210');

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Farmer Login</Text>
        <Text style={styles.subtitle}>Enter your registered mobile number</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number (+91)</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Button
          title="Send OTP & Login"
          variant="primary"
          onPress={() => router.replace('/(tabs)')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
