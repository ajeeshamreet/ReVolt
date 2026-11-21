import { useEffect, useRef } from 'react';
import { Modal, View, Text, Animated, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import Sticker from './Sticker';
import Button from './Button';
import Blob from './Blob';
import { theme } from '../theme';

export default function SuccessModal({ visible, data, onClose, onViewWallet }) {
  const scale = useRef(new Animated.Value(0.4)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          tension: 70,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scale.setValue(0.4);
      opacity.setValue(0);
    }
  }, [visible]);

  if (!visible || !data) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
          <View style={styles.blobAnchor}>
            <Blob color={theme.colors.mint} size={theme.blobSize.md} />
          </View>
          <Sticker
            label="DROPPED OFF! ✨"
            color={theme.colors.yellow}
            rotate={theme.rotation.slightNeg}
          />
          <Text style={styles.title}>+{data.points} Eco-Points</Text>
          <Text style={styles.body}>
            {data.device} logged at {data.facility}. Great job keeping toxic metals out of landfills!
          </Text>
          <View style={styles.buttonRow}>
            <Button title="View in Wallet" onPress={onViewWallet} style={styles.btn} />
            <Button title="Done" variant="ghost" onPress={onClose} style={styles.btn} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.lilac,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    borderRadius: theme.radii.card,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
    maxWidth: 380,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  blobAnchor: {
    position: 'absolute',
    top: -theme.spacing.lg,
    right: -theme.spacing.lg,
  },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.xxl,
    lineHeight: theme.lineHeight.xxl,
    color: theme.colors.black,
  },
  body: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.black,
  },
  buttonRow: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  btn: { width: '100%' },
});
