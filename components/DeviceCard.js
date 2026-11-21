import { Pressable, Text, StyleSheet } from 'react-native';
import DeviceIcon from './DeviceIcon';
import { theme } from '../theme';

export default function DeviceCard({ device, isSelected, onSelect }) {
  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: device.color },
        isSelected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <DeviceIcon id={device.id} size={36} />
      <Text style={styles.name} numberOfLines={2}>
        {device.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '30.5%',
    aspectRatio: 0.86,
    borderRadius: theme.radii.card,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selected: {
    borderWidth: theme.borderWidth.thick,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  name: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    lineHeight: theme.lineHeight.xs,
    color: theme.colors.black,
    textAlign: 'center',
  },
});
