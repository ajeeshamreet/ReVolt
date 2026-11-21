import { View, TextInput, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import FilterChip from './FilterChip';
import LocationBanner from './LocationBanner';
import { theme } from '../theme';

const DEFAULT_CHIPS = ['Open now', 'phones', 'laptops', 'batteries', 'appliances', 'tv', 'cables'];

export default function MapSearchBar({
  search,
  onSearchChange,
  chips = DEFAULT_CHIPS,
  selectedChips,
  onToggleChip,
  locationStatus,
  onUseCityCentre,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { top: insets.top + theme.spacing.sm }]}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={theme.iconSize.sm} color={theme.colors.black} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Search facilities or areas..."
          placeholderTextColor={theme.colors.greyDark}
          style={styles.input}
          autoCorrect={false}
        />
        {Boolean(search) && (
          <Pressable onPress={() => onSearchChange('')} hitSlop={theme.spacing.sm}>
            <Ionicons name="close-circle" size={theme.iconSize.sm} color={theme.colors.greyDark} />
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
      >
        {chips.map((chip) => (
          <FilterChip
            key={chip}
            label={chip}
            isSelected={selectedChips.includes(chip)}
            onPress={() => onToggleChip(chip)}
          />
        ))}
      </ScrollView>

      <LocationBanner status={locationStatus} onUseCityCentre={onUseCityCentre} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: theme.spacing.none,
    right: theme.spacing.none,
    zIndex: 10,
    gap: theme.spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.controls.searchHeight,
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radii.pill,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.greyMedium,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSize.sm,
    color: theme.colors.black,
  },
  chipsScroll: {
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.xs,
  },
});
