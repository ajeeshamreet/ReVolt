import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isOpenNow } from '../lib/isOpenNow';
import { theme } from '../theme';

export default function FacilityRow({ facility, isSelected, onPress }) {
  const isOpen = isOpenNow(facility.hours);
  const kmText = facility.km != null ? `${facility.km} km · ` : '';
  const statusText = `${kmText}${isOpen ? 'Open now' : 'Closed'}`;

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
        <Text style={styles.status}>{statusText}</Text>
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
  selectedRow: {
    backgroundColor: theme.colors.greyLight,
  },
  pressed: {
    opacity: 0.7,
  },
  textContainer: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  name: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.md,
    lineHeight: theme.lineHeight.md,
    color: theme.colors.black,
  },
  status: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});
