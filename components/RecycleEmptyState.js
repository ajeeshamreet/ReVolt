import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import Sticker from './Sticker';
import { theme } from '../theme';

export default function RecycleEmptyState() {
  return (
    <Card color={theme.colors.white} style={styles.container}>
      <View style={styles.header}>
        <Sticker label="STEP 1" color={theme.colors.yellow} rotate={theme.rotation.slightNeg} />
        <View style={styles.iconCircle}>
          <Ionicons name="arrow-up" size={theme.iconSize.sm} color={theme.colors.black} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Select a device to begin</Text>
        <Text style={styles.subtitle}>
          Choose any electronic item above to calculate recovered precious metals, estimate eco-points, and find drop-off depots.
        </Text>
      </View>
      <View style={styles.chipsRow}>
        <View style={styles.hintPill}>
          <Text style={styles.hintText}>✨ Metal Recovery</Text>
        </View>
        <View style={styles.hintPill}>
          <Text style={styles.hintText}>🌱 Eco-Points</Text>
        </View>
        <View style={styles.hintPill}>
          <Text style={styles.hintText}>📍 Near Depots</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { padding: theme.spacing.xl, gap: theme.spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.greyLight,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { gap: theme.spacing.xs },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.lg,
    lineHeight: theme.lineHeight.lg,
    color: theme.colors.black,
  },
  subtitle: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.greyDark,
  },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm, marginTop: theme.spacing.xs },
  hintPill: {
    backgroundColor: theme.colors.greyLight,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  hintText: { fontFamily: theme.fonts.bold, fontSize: theme.fontSize.xs, color: theme.colors.black },
});
