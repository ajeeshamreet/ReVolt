import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function Card({ color = theme.colors.lilac, style, children, ...rest }) {
  return (
    <View style={[styles.card, { backgroundColor: color }, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.card,
    padding: theme.spacing.xl,
    overflow: 'hidden',
  },
});
