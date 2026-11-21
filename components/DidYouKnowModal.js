import { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sticker from './Sticker';
import Button from './Button';
import Blob from './Blob';
import { theme } from '../theme';

const STORAGE_KEY = '@revolt_did_you_know_shown';

export default function DidYouKnowModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const shown = await AsyncStorage.getItem(STORAGE_KEY);
        if (!shown) {
          setVisible(true);
        }
      } catch (err) {
        // Silently proceed
      }
    }
    checkFirstLaunch();
  }, []);

  const handleDismiss = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
    } catch (err) {
      // Silently proceed
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.blobAnchor}>
            <Blob color={theme.colors.pink} size={theme.blobSize.md} />
          </View>
          <Sticker
            label="DID YOU KNOW?"
            color={theme.colors.yellow}
            rotate={theme.rotation.slightNeg}
          />
          <Text style={styles.title}>Phones Are Gold Mines</Text>
          <Text style={styles.body}>
            One metric ton of retired smartphones contains up to 100x more gold and 50x more silver
            than one ton of virgin ore, while protecting water tables from toxic leaching.
          </Text>
          <Button title="Got it" onPress={handleDismiss} style={styles.button} />
        </View>
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
    fontSize: theme.fontSize.xl,
    lineHeight: theme.lineHeight.xl,
    color: theme.colors.black,
  },
  body: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.black,
  },
  button: {
    marginTop: theme.spacing.xs,
  },
});
