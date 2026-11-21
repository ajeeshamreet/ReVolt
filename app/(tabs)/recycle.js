import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export default function RecycleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recycle</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xxl,
    lineHeight: theme.lineHeight.xxl,
    color: theme.colors.text,
  },
});
