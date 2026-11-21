import { useState, useMemo } from 'react';
import { Modal, View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Sticker from './Sticker';
import Button from './Button';
import FacilityPickerRow from './FacilityPickerRow';
import facilities from '../data/facilities.json';
import { useUserLocation } from '../lib/useUserLocation';
import { withDistance } from '../lib/geo';
import { theme } from '../theme';

export default function FacilityPickerModal({ visible, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const { coords } = useUserLocation();

  const sorted = useMemo(() => withDistance(facilities, coords), [coords]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((f) => f.name.toLowerCase().includes(q) || f.address.toLowerCase().includes(q));
  }, [sorted, query]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Sticker label="SELECT DEPOT" color={theme.colors.yellow} rotate={theme.rotation.slightNeg} />
            <Text style={styles.title}>Pick Drop-off Facility</Text>
            <Text style={styles.subtitle}>Choose where you are dropping off your device.</Text>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={theme.iconSize.sm} color={theme.colors.black} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name or area"
              placeholderTextColor={theme.colors.greyDark}
              style={styles.searchInput}
              autoCorrect={false}
            />
            {Boolean(query) && (
              <Pressable onPress={() => setQuery('')} hitSlop={theme.spacing.sm}>
                <Ionicons name="close-circle" size={theme.iconSize.sm} color={theme.colors.greyDark} />
              </Pressable>
            )}
          </View>

          <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            {filtered.map((facility) => (
              <FacilityPickerRow
                key={facility.id}
                facility={facility}
                onSelect={onSelect}
              />
            ))}
          </ScrollView>

          <Button title="Cancel" variant="ghost" onPress={onClose} style={styles.cancelBtn} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.radii.card,
    borderTopRightRadius: theme.radii.card,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    padding: theme.spacing.xl,
    maxHeight: '82%',
    gap: theme.spacing.md,
  },
  handle: { width: 44, height: 4, borderRadius: 2, backgroundColor: theme.colors.greyMedium, alignSelf: 'center', marginBottom: -theme.spacing.xs },
  header: { gap: theme.spacing.xs },
  title: { fontFamily: theme.fonts.heading, fontSize: theme.fontSize.xl, lineHeight: theme.lineHeight.xl, color: theme.colors.black },
  subtitle: { fontFamily: theme.fonts.body, fontSize: theme.fontSize.sm, color: theme.colors.greyDark },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.controls.searchHeight,
    backgroundColor: theme.colors.greyLight,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.pill,
    borderWidth: theme.borderWidth.card,
    borderColor: theme.colors.black,
    gap: theme.spacing.sm,
  },
  searchInput: { flex: 1, fontFamily: theme.fonts.body, fontSize: theme.fontSize.sm, color: theme.colors.black },
  list: { maxHeight: 300 },
  listContent: { gap: theme.spacing.sm, paddingVertical: theme.spacing.xs },
  cancelBtn: { marginTop: theme.spacing.xs },
});
