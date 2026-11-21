import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function FacilityPickerRow({ facility, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      onPress={() => onSelect(facility)}
    >
      <View style={styles.iconCircle}>
        <Ionicons name="location-sharp" size={16} color={theme.colors.black} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{facility.name}</Text>
        <Text style={styles.itemAddress} numberOfLines={1}>{facility.address}</Text>
      </View>
      {facility.km != null && (
        <View style={styles.distPill}>
          <Text style={styles.distText}>{facility.km} km</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    borderRadius: 20,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  itemPressed: { backgroundColor: theme.colors.yellow },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: { flex: 1, gap: 2 },
  itemName: { fontFamily: theme.fonts.bold, fontSize: theme.fontSize.sm, color: theme.colors.black },
  itemAddress: { fontFamily: theme.fonts.body, fontSize: theme.fontSize.xs, color: theme.colors.greyDark },
  distPill: {
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    backgroundColor: theme.colors.white,
  },
  distText: { fontFamily: theme.fonts.bold, fontSize: theme.fontSize.xs, color: theme.colors.black },
});
