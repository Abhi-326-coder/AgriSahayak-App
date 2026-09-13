import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  statusBarStyle?: 'light-content' | 'dark-content';
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  backgroundColor = Colors.background,
  safeAreaEdges = ['bottom'],
  statusBarStyle = 'dark-content',
}) => {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }, style]}
      edges={safeAreaEdges}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={Colors.primary}
        translucent={false}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
