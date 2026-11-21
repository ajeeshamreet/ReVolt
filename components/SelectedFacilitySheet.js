import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Sticker from './Sticker';
import Button from './Button';
import { isOpenNow } from '../lib/isOpenNow';
import { openDirections } from '../lib/directions';
import { theme } from '../theme';

export default function SelectedFacilitySheet({ facility, onBack }) {
  if (!facility) return null;
  const isOpen = isOpenNow(facility.hours);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          {facility.km != null && (
            <Sticker label={`${facility.km} km away`} color={theme.colors.mint} />
          )}
          <Sticker
            label={isOpen ? 'Open now' : 'Closed'}
            color={isOpen ? theme.colors.yellow : theme.colors.greyMedium}
          />
          {facility.authorised && (
            <Sticker label="Authorised ✓" color={theme.colors.lilac} />
          )}
        </View>
        <Text style={styles.name}>{facility.name}</Text>
      </View>

      <View style={styles.detailsBlock}>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={theme.iconSize.sm} color={theme.colors.black} />
          <Text style={styles.infoText}>{facility.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={theme.iconSize.sm} color={theme.colors.black} />
          <Text style={styles.infoText}>Hours: {facility.hours}</Text>
        </View>
      </View>

      <View style={styles.acceptsBlock}>
        <Text style={styles.acceptsLabel}>ACCEPTS</Text>
        <View style={styles.chipsRow}>
          {facility.accepts?.map((item) => (
            <Sticker key={item} label={item} color={theme.colors.white} />
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Start Journey ➔"
          onPress={() => openDirections(facility)}
        />
        <Button
          title="Back to all drop-offs"
          variant="ghost"
          onPress={onBack}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  header: { gap: theme.spacing.xs },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.xs },
  name: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSize.xl,
    lineHeight: theme.lineHeight.xl,
    color: theme.colors.black,
    marginTop: theme.spacing.xs,
  },
  detailsBlock: {
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs },
  infoText: {
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    color: theme.colors.greyDark,
    flex: 1,
  },
  acceptsBlock: { gap: theme.spacing.xs },
  acceptsLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.greyDark,
    letterSpacing: 0.5,
  },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.xs },
  actions: { gap: theme.spacing.xs, marginTop: theme.spacing.xs },
});
