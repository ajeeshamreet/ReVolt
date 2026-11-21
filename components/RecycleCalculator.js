import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Card from './Card';
import Sticker from './Sticker';
import Button from './Button';
import FilterChip from './FilterChip';
import { pointsFor } from '../lib/credits';
import { theme } from '../theme';

export default function RecycleCalculator({
  device,
  condition,
  onConditionChange,
  onNavigateMap,
}) {
  const targetPoints = pointsFor(device, condition);
  const [displayPoints, setDisplayPoints] = useState(targetPoints);
  const animValue = useRef(new Animated.Value(targetPoints)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: targetPoints,
      duration: 500,
      useNativeDriver: false,
    }).start();

    const listener = animValue.addListener(({ value }) => {
      setDisplayPoints(Math.round(value));
    });

    return () => animValue.removeListener(listener);
  }, [targetPoints]);

  return (
    <Card color={theme.colors.white} style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>DEVICE CONDITION</Text>
        <View style={styles.chips}>
          <FilterChip
            label="Working"
            isSelected={condition === 'working'}
            onPress={() => onConditionChange('working')}
          />
          <FilterChip
            label="Damaged"
            isSelected={condition === 'damaged'}
            onPress={() => onConditionChange('damaged')}
          />
        </View>
      </View>

      <View style={styles.pointsBlock}>
        <Text style={styles.pointsNumber}>+{displayPoints}</Text>
        <Text style={styles.pointsLabel}>REWARD ECO-POINTS</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>METALS RECOVERED</Text>
        <View style={styles.stickersRow}>
          <Sticker label={`${device.gold}g Gold`} color={theme.colors.yellow} />
          <Sticker label={`${device.silver}g Silver`} color={theme.colors.lilac} />
          <Sticker label={`${device.copper}g Copper`} color={theme.colors.orange} />
        </View>
      </View>

      <Button title="Find a drop-off point" onPress={onNavigateMap} />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { gap: theme.spacing.lg, padding: theme.spacing.xl },
  section: { gap: theme.spacing.xs },
  label: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.greyDark,
    letterSpacing: 0.5,
  },
  chips: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.xs },
  pointsBlock: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.greyLight,
    borderRadius: theme.radii.card,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
  },
  pointsNumber: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.hero,
    lineHeight: theme.lineHeight.hero,
    color: theme.colors.black,
  },
  pointsLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
  },
  stickersRow: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm, marginTop: theme.spacing.xs },
});
