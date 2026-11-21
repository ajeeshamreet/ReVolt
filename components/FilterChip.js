import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function FilterChip({ label, isSelected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        isSelected ? styles.selectedChip : styles.unselectedChip,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, isSelected ? styles.selectedText : styles.unselectedText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: theme.controls.chipHeight,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselectedChip: {
    backgroundColor: theme.colors.white,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.black,
  },
  selectedChip: {
    backgroundColor: theme.colors.black,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.black,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    lineHeight: theme.lineHeight.xs,
    textTransform: 'capitalize',
  },
  unselectedText: {
    color: theme.colors.black,
  },
  selectedText: {
    color: theme.colors.white,
  },
});
