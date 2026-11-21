import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Sticker from './Sticker';
import Button from './Button';
import Blob from './Blob';
import { theme } from '../theme';

export default function WalletEmptyState() {
  return (
    <View style={styles.card}>
      <View style={styles.blobAnchor}>
        <Blob color={theme.colors.pink} size={theme.blobSize.md} />
      </View>
      <Sticker
        label="NO LOGS YET"
        color={theme.colors.yellow}
        rotate={theme.rotation.slightNeg}
      />
      <Text style={styles.title}>Your drop-off log is empty</Text>
      <Text style={styles.body}>
        Calculate points on the Recycle tab, confirm a facility drop-off, and start earning rewards.
      </Text>
      <Button
        title="Recycle a device"
        onPress={() => router.navigate('/recycle')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.card,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
    overflow: 'hidden',
    position: 'relative',
    marginTop: theme.spacing.sm,
  },
  blobAnchor: {
    position: 'absolute',
    top: -theme.spacing.lg,
    right: -theme.spacing.lg,
    opacity: 0.5,
  },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.xl,
    lineHeight: theme.lineHeight.xl,
    color: theme.colors.black,
  },
  body: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.greyDark,
  },
  button: {
    marginTop: theme.spacing.xs,
  },
});
