import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isOpenNow } from '../lib/isOpenNow';
import { theme } from '../theme';

export default function FacilityRow({ facility, isSelected, onPress }) {
  const isOpen = isOpenNow(facility.hours);
  const isNearlyFull = Boolean(facility.nearlyFull || facility.status === 'nearly_full');

  const statusLabel = !isOpen ? 'Closed' : isNearlyFull ? 'Nearly full' : 'Open now';
  const statusColor = !isOpen
    ? theme.colors.statusClosed
    : isNearlyFull
    ? theme.colors.statusNearlyFull
    : theme.colors.statusOpen;

  const kmText = facility.km != null ? `${facility.km} km · ` : '';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        isSelected && styles.selectedRow,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {facility.name}
        </Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={styles.status}>{kmText}{statusLabel}</Text>
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={theme.iconSize.sm}
        color={theme.colors.black}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    borderBottomWidth: theme.borderWidth.thin,
    borderBottomColor: theme.colors.greyMedium,
  },
  selectedRow: { backgroundColor: theme.colors.greyLight },
  pressed: { opacity: 0.7 },
  textContainer: { flex: 1, paddingRight: theme.spacing.md },
  name: { fontFamily: theme.fonts.bold, fontSize: theme.fontSize.md, lineHeight: theme.lineHeight.md, color: theme.colors.black },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: theme.spacing.xs },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  status: { fontFamily: theme.fonts.body, fontSize: theme.fontSize.sm, color: theme.colors.textSecondary },
});
