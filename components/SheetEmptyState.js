import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function SheetEmptyState() {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={theme.iconSize.lg} color={theme.colors.greyDark} />
      <Text style={styles.title}>No facilities found</Text>
      <Text style={styles.subtitle}>
        Try checking your spelling or clearing some filters to see nearby locations.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.md,
    lineHeight: theme.lineHeight.md,
    color: theme.colors.black,
  },
  subtitle: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
