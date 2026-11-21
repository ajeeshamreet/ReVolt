import { useState } from 'react';
import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function LocationBanner({ status, onUseCityCentre }) {
  const [dismissed, setDismissed] = useState(false);

  if ((status !== 'denied' && status !== 'error') || dismissed) return null;

  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <Ionicons name="location-outline" size={theme.iconSize.sm} color={theme.colors.black} />
        <Text style={styles.text} numberOfLines={2}>
          Location off • Showing City Centre
        </Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={() => Linking.openSettings()} style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
          <Text style={styles.btnText}>Settings</Text>
        </Pressable>
        <Pressable onPress={onUseCityCentre} style={({ pressed }) => [styles.ghostBtn, pressed && styles.pressed]}>
          <Text style={styles.ghostText}>Center</Text>
        </Pressable>
        <Pressable onPress={() => setDismissed(true)} hitSlop={theme.spacing.sm}>
          <Ionicons name="close" size={theme.iconSize.sm} color={theme.colors.black} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.yellow,
    borderRadius: theme.radii.lg,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  text: {
    flex: 1,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.black,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  btn: {
    backgroundColor: theme.colors.black,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radii.pill,
  },
  btnText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.white,
  },
  ghostBtn: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  ghostText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.black,
  },
  pressed: {
    opacity: 0.8,
  },
});
