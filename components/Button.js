import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function Button({
  title,
  children,
  onPress,
  variant = 'solid',
  style,
  textStyle,
}) {
  const isGhost = variant === 'ghost';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isGhost ? styles.ghost : styles.solid,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, isGhost ? styles.textGhost : styles.textSolid, textStyle]}>
        {title || children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.radii.pill,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: theme.colors.black,
  },
  ghost: {
    backgroundColor: theme.colors.transparent,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.md,
    lineHeight: theme.lineHeight.md,
  },
  textSolid: {
    color: theme.colors.white,
  },
  textGhost: {
    color: theme.colors.black,
  },
});
