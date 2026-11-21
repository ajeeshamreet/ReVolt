import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function MapContainer() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="map-outline" size={theme.iconSize.lg} color={theme.colors.black} />
        <Text style={styles.title}>Map View (Mobile)</Text>
        <Text style={styles.subtitle}>
          Interactive Google and Apple maps are native mobile features running in Expo Go on
          your Android or iOS device.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.card,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.xxxl,
    maxWidth: 420,
    gap: theme.spacing.md,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xl,
    lineHeight: theme.lineHeight.xl,
    color: theme.colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
