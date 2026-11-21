import { Modal, ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Sticker from './Sticker';
import Button from './Button';
import Blob from './Blob';
import { theme } from '../theme';

function SectionBlock({ label, text, isAction }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={[styles.card, isAction && styles.actionCard]}>
        <Text style={isAction ? styles.actionText : styles.bodyText}>{text}</Text>
      </View>
    </View>
  );
}

export default function HazardDetailModal({ hazard, visible, onClose }) {
  if (!hazard) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={[styles.container, { backgroundColor: hazard.color }]}>
        <View style={styles.blobAnchor}>
          <Blob color={theme.colors.white} size={theme.blobSize.lg} />
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Sticker label={hazard.minutes} color={theme.colors.white} />
          <Text style={styles.title}>{hazard.title}</Text>

          <View style={styles.imageCard}>
            <Image
              source={hazard.image}
              style={styles.image}
              contentFit="contain"
              transition={200}
            />
            <Text style={styles.imageCaption}>{hazard.imageCaption}</Text>
          </View>

          <SectionBlock label="WHERE IT IS FOUND" text={hazard.foundIn} />
          <SectionBlock label="HEALTH RISKS" text={hazard.healthEffect} />
          <SectionBlock label="ENVIRONMENTAL IMPACT" text={hazard.environmentEffect} />
          <SectionBlock label="WHAT TO DO" text={hazard.whatToDo} isAction />
          <Button title="Close" onPress={onClose} style={styles.closeBtn} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  blobAnchor: { position: 'absolute', top: -theme.spacing.lg, right: -theme.spacing.xl, opacity: 0.7 },
  scroll: { padding: theme.spacing.xl, gap: theme.spacing.lg, paddingBottom: theme.spacing.huge },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.xxl,
    lineHeight: theme.lineHeight.xxl,
    color: theme.colors.black,
  },
  imageCard: {
    backgroundColor: theme.colors.white,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  image: {
    width: '100%',
    height: theme.image.modalHeight,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.white,
  },
  imageCaption: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    lineHeight: theme.lineHeight.xs,
    color: theme.colors.black,
  },
  section: { gap: theme.spacing.xs },
  sectionLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.black,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.card,
    padding: theme.spacing.lg,
  },
  actionCard: { backgroundColor: theme.colors.black },
  bodyText: { fontFamily: theme.fonts.body, fontSize: theme.fontSize.sm, color: theme.colors.black },
  actionText: { fontFamily: theme.fonts.bold, fontSize: theme.fontSize.sm, color: theme.colors.white },
  closeBtn: { marginTop: theme.spacing.md },
});
