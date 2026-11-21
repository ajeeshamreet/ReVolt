import { View, Text, StyleSheet } from 'react-native';
import Sticker from './Sticker';
import { theme } from '../theme';

const PASTEL_PALETTE = [
  theme.colors.mint,
  theme.colors.lilac,
  theme.colors.yellow,
  theme.colors.pink,
  theme.colors.blue,
  theme.colors.orange,
];

export default function WalletHistoryRow({ item, index }) {
  const rowColor = PASTEL_PALETTE[index % PASTEL_PALETTE.length];

  return (
    <View style={[styles.row, { backgroundColor: rowColor }]}>
      <View style={styles.leftCol}>
        <Text style={styles.deviceTitle}>{item.device}</Text>
        <Text style={styles.metaText}>
          {item.facility} • {item.date}
        </Text>
      </View>
      <Sticker
        label={`+${item.points} pts`}
        color={theme.colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    gap: theme.spacing.md,
  },
  leftCol: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  deviceTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
  },
  metaText: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.xs,
    color: theme.colors.greyDark,
  },
});
