import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/layout/Screen';
import { Button } from '../../src/components/ui/Button';
import { Colors } from '../../src/constants/colors';
import { Spacing, BorderRadius } from '../../src/constants/spacing';
import { useFarmerStore } from '../../src/store/farmerStore';

export default function RegisterScreen() {
  const router = useRouter();
  const { setFarmer } = useFarmerStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [acres, setAcres] = useState('3');
  const [crop, setCrop] = useState('Tomato');

  const handleRegister = () => {
    setFarmer({
      id: Date.now(),
      name: name || 'Ravi Kumar',
      phone: phone || '9876543210',
      language: 'kn',
      location: location || 'Devenahalli, Bengaluru Rural',
      district: 'Bengaluru Rural',
      state: 'Karnataka',
      total_acres: parseFloat(acres) || 3,
      primary_crop: crop || 'Tomato',
    });
    router.replace('/(tabs)');
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Farmer Registration</Text>
        <Text style={styles.subtitle}>Create your AgriSahayak profile</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Farmer Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Ravi Kumar"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 9876543210"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Village / Taluk / District</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Devenahalli, Bengaluru Rural"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Total Land (Acres)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={acres}
            onChangeText={setAcres}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Primary Crop Cultivated</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Tomato"
            value={crop}
            onChangeText={setCrop}
          />
        </View>

        <Button
          title="Complete Profile & Enter"
          variant="primary"
          onPress={handleRegister}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.xl,
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
    marginBottom: Spacing.md,
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
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
