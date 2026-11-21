import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function Sticker({
  label,
  children,
  color = theme.colors.yellow,
  rotate = theme.rotation.slightNeg,
  style,
  textStyle,
}) {
  return (
    <View style={[styles.sticker, { backgroundColor: color, transform: [{ rotate }] }, style]}>
      <Text style={[styles.text, textStyle]}>{label || children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sticker: {
    borderRadius: theme.radii.pill,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    lineHeight: theme.lineHeight.xs,
    color: theme.colors.black,
    textTransform: 'uppercase',
  },
});
