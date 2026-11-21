import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import Sticker from './Sticker';
import Blob from './Blob';
import { theme } from '../theme';

function getLevelBadge(points) {
  if (points >= 1500) return { name: 'Tree', emoji: '🌳', color: theme.colors.yellow };
  if (points >= 500) return { name: 'Sprout', emoji: '🌿', color: theme.colors.mint };
  return { name: 'Seedling', emoji: '🌱', color: theme.colors.yellow };
}

export default function WalletHeroCard({ points, count }) {
  const level = getLevelBadge(points);

  return (
    <Card color={theme.colors.green} style={styles.card}>
      <View style={styles.blobAnchor}>
        <Blob color={theme.colors.white} size={theme.blobSize.md} />
      </View>

      <View style={styles.topRow}>
        <Sticker
          label={`Level: ${level.name} ${level.emoji}`}
          color={level.color}
          rotate={theme.rotation.slightNeg}
        />
      </View>

      <View style={styles.pointsBlock}>
        <Text style={styles.pointsLabel}>TOTAL ECO-POINTS</Text>
        <Text style={styles.pointsNumber}>{points}</Text>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>
          Recycled so far: <Text style={styles.footerHighlight}>{count} {count === 1 ? 'device' : 'devices'}</Text>
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  blobAnchor: {
    position: 'absolute',
    top: -theme.spacing.lg,
    right: -theme.spacing.lg,
    opacity: 0.15,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsBlock: {
    gap: theme.spacing.xs,
  },
  pointsLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.mint,
    letterSpacing: 0.5,
  },
  pointsNumber: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.hero,
    lineHeight: theme.lineHeight.hero,
    color: theme.colors.white,
  },
  footerRow: {
    borderTopWidth: theme.borderWidth.thin,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
    paddingTop: theme.spacing.md,
  },
  footerText: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
  },
  footerHighlight: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.yellow,
  },
});
