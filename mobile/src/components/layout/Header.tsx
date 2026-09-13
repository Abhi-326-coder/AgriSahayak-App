import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  rightComponent,
  style,
}) => {
  const router = useRouter();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {showBack && (
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={8}
          >
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightComponent && <View style={styles.right}>{rightComponent}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: Colors.onPrimary,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...Typography.headlineSm,
    color: Colors.onPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 1,
  },
  right: {
    marginLeft: 'auto',
  },
});
