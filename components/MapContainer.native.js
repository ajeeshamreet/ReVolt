import { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { theme } from '../theme';
import { useUserLocation, CITY_CENTER_COORDS } from '../lib/useUserLocation';
import { withDistance } from '../lib/geo';
import { useFacilityFilter } from '../lib/useFacilityFilter';
import { isOpenNow } from '../lib/isOpenNow';
import facilitiesData from '../data/facilities.json';
import OpenFreeMapView from './OpenFreeMapView';
import FacilityRow from './FacilityRow';
import MapSearchBar from './MapSearchBar';
import SheetEmptyState from './SheetEmptyState';
import SelectedFacilitySheet from './SelectedFacilitySheet';

export default function MapContainer() {
  const mapRef = useRef(null);
  const sheetRef = useRef(null);
  const { category } = useLocalSearchParams();
  const { coords, status } = useUserLocation();
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedChips, setSelectedChips] = useState([]);

  useEffect(() => {
    if (category) setSelectedChips([category]);
  }, [category]);

  const snapPoints = useMemo(() => ['18%', '48%', '85%'], []);
  const sorted = useMemo(() => withDistance(facilitiesData, coords), [coords]);
  const visible = useFacilityFilter(sorted, search, selectedChips);
  const selectedFacility = useMemo(() => sorted.find((f) => f.id === selectedId), [sorted, selectedId]);
  const userPoint = coords || CITY_CENTER_COORDS;

  const mapFacilities = useMemo(() => {
    return visible.map((f) => {
      const open = isOpenNow(f.hours);
      const isNearlyFull = Boolean(f.nearlyFull || f.status === 'nearly_full');
      const st = !open ? 'closed' : isNearlyFull ? 'nearly_full' : 'open';
      return { id: f.id, name: f.name, lat: f.lat, lng: f.lng, status: st };
    });
  }, [visible]);

  const handleSelect = (facility) => {
    setSelectedId(facility.id);
    sheetRef.current?.snapToIndex(1);
  };

  const handleSelectById = (id) => {
    const facility = sorted.find((f) => f.id === id);
    if (facility) handleSelect(facility);
  };

  return (
    <View style={styles.container}>
      <MapSearchBar
        search={search}
        onSearchChange={setSearch}
        selectedChips={selectedChips}
        onToggleChip={(chip) => setSelectedChips((p) => p.includes(chip) ? p.filter((c) => c !== chip) : [...p, chip])}
        locationStatus={status}
        onUseCityCentre={() => mapRef.current?.flyTo(CITY_CENTER_COORDS.longitude, CITY_CENTER_COORDS.latitude, 12)}
      />
      <OpenFreeMapView
        ref={mapRef}
        userPoint={userPoint}
        facilities={mapFacilities}
        selectedFacility={selectedFacility}
        selectedId={selectedId}
        onSelectFacility={handleSelectById}
        onDeselect={() => {
          setSelectedId(null);
          sheetRef.current?.snapToIndex(0);
        }}
      />
      <BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints} handleIndicatorStyle={styles.handle} backgroundStyle={styles.sheetBg}>
        {selectedFacility ? (
          <SelectedFacilitySheet facility={selectedFacility} onBack={() => { setSelectedId(null); sheetRef.current?.snapToIndex(0); }} />
        ) : (
          <>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Nearby drop-off points ({visible.length})</Text>
            </View>
            <BottomSheetFlatList
              data={visible}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={SheetEmptyState}
              renderItem={({ item }) => (
                <FacilityRow facility={item} isSelected={selectedId === item.id} onPress={() => handleSelect(item)} />
              )}
            />
          </>
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%' },
  handle: { backgroundColor: theme.colors.black, width: theme.sheet.handleWidth, height: theme.sheet.handleHeight },
  sheetBg: { backgroundColor: theme.colors.white, borderTopLeftRadius: theme.radii.card, borderTopRightRadius: theme.radii.card },
  sheetHeader: { paddingHorizontal: theme.spacing.xl, paddingVertical: theme.spacing.md, borderBottomWidth: theme.borderWidth.thin, borderBottomColor: theme.colors.greyMedium },
  sheetTitle: { fontFamily: theme.fonts.bold, fontSize: theme.fontSize.lg, lineHeight: theme.lineHeight.lg, color: theme.colors.black },
});
