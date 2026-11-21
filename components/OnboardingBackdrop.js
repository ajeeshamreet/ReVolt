import { View, StyleSheet } from 'react-native';
import Blob from './Blob';

export default function OnboardingBackdrop({ shapeType }) {
  if (shapeType === 'circle') {
    return (
      <View style={styles.container} pointerEvents="none">
        <View style={styles.circleOuter} />
      </View>
    );
  }

  if (shapeType === 'blob') {
    return (
      <View style={styles.container} pointerEvents="none">
        <View style={styles.blobAnchor}>
          <Blob color="rgba(255, 255, 255, 0.4)" size={260} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.squircle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 320,
    height: 320,
  },
  circleOuter: {
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  blobAnchor: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  squircle: {
    width: 280,
    height: 280,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    transform: [{ rotate: '25deg' }],
  },
});

