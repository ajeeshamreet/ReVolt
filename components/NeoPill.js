import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function NeoPill({ title = 'Home', onPress, style }) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.shadow} />
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.front, pressed && styles.pressed]}
      >
        <Text style={styles.text}>{title}</Text>
        <Ionicons name="arrow-forward" size={theme.iconSize.sm} color={theme.colors.black} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignSelf: 'flex-end',
  },
  shadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.black,
    borderRadius: theme.radii.pill,
  },
  front: {
    backgroundColor: theme.colors.white,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  pressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  text: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.black,
  },
});

