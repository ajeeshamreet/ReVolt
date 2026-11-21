import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Card from './Card';
import Sticker from './Sticker';
import Blob from './Blob';
import { theme } from '../theme';

export default function HazardCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Card color={item.color} style={styles.card}>
        <View style={styles.blobAnchor}>
          <Blob color={theme.colors.white} size={theme.blobSize.md} />
        </View>

        <Sticker label={item.minutes} color={theme.colors.white} />

        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.image}
            contentFit="contain"
            transition={200}
          />
        </View>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.footer}>
          <Text style={styles.caption} numberOfLines={2}>
            {item.imageCaption}
          </Text>
          <Text style={styles.actionPrompt}>Read guide & impact →</Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
  },
  blobAnchor: {
    position: 'absolute',
    top: -theme.spacing.lg,
    right: -theme.spacing.lg,
  },
  imageContainer: {
    width: '100%',
    height: theme.image.cardHeight,
    borderRadius: theme.radii.lg,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    padding: theme.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.xl,
    lineHeight: theme.lineHeight.xl,
    color: theme.colors.black,
  },
  footer: {
    gap: theme.spacing.xs,
  },
  caption: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.xs,
    lineHeight: theme.lineHeight.xs,
    color: theme.colors.textSecondary,
  },
  actionPrompt: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.black,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
