import { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { theme } from '../theme';
import { useUserLocation, CITY_CENTER_COORDS } from '../lib/useUserLocation';
import { withDistance } from '../lib/geo';
import { useFacilityFilter } from '../lib/useFacilityFilter';
import { mapStyle } from '../lib/mapStyle';
import facilitiesData from '../data/facilities.json';
import FacilityMarker from './FacilityMarker';
import FacilityRow from './FacilityRow';
import UserLocationMarker from './UserLocationMarker';
import MapSearchBar from './MapSearchBar';
import SheetEmptyState from './SheetEmptyState';

const toRegion = (lat, lng) => ({
  latitude: lat,
  longitude: lng,
  latitudeDelta: theme.map.latitudeDelta,
  longitudeDelta: theme.map.longitudeDelta,
});

export default function MapContainer() {
  const mapRef = useRef(null);
  const sheetRef = useRef(null);
  const { coords } = useUserLocation();
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedChips, setSelectedChips] = useState([]);

  const snapPoints = useMemo(() => ['18%', '45%', '85%'], []);
  const sorted = useMemo(() => withDistance(facilitiesData, coords), [coords]);
  const visible = useFacilityFilter(sorted, search, selectedChips);
  const initialTarget = coords || CITY_CENTER_COORDS;

  const handleSelect = (facility) => {
    setSelectedId(facility.id);
    mapRef.current?.animateToRegion(toRegion(facility.lat, facility.lng), 400);
    sheetRef.current?.snapToIndex(1);
  };

  const handleToggleChip = (chip) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  useEffect(() => {
    if (coords && mapRef.current) {
      mapRef.current.animateToRegion(toRegion(coords.latitude, coords.longitude), 500);
    }
  }, [coords]);

  return (
    <View style={styles.container}>
      <MapSearchBar
        search={search}
        onSearchChange={setSearch}
        selectedChips={selectedChips}
        onToggleChip={handleToggleChip}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        customMapStyle={Platform.OS === 'android' ? mapStyle : undefined}
        mapType={Platform.OS === 'ios' ? 'mutedStandard' : 'standard'}
        showsUserLocation={false}
        showsMyLocationButton={false}
        initialRegion={toRegion(initialTarget.latitude, initialTarget.longitude)}
      >
        <UserLocationMarker coords={coords} />
        {visible.map((f) => (
          <FacilityMarker
            key={f.id}
            facility={f}
            isSelected={selectedId === f.id}
            onSelect={() => handleSelect(f)}
          />
        ))}
      </MapView>

      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.handle}
        backgroundStyle={styles.sheetBg}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Nearby drop-off points ({visible.length})</Text>
        </View>
        <BottomSheetFlatList
          data={visible}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={SheetEmptyState}
          renderItem={({ item }) => (
            <FacilityRow
              facility={item}
              isSelected={selectedId === item.id}
              onPress={() => handleSelect(item)}
            />
          )}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%' },
  map: { width: '100%', height: '100%' },
  handle: { backgroundColor: theme.colors.black, width: theme.sheet.handleWidth, height: theme.sheet.handleHeight },
  sheetBg: { backgroundColor: theme.colors.white, borderTopLeftRadius: theme.radii.card, borderTopRightRadius: theme.radii.card },
  sheetHeader: { paddingHorizontal: theme.spacing.xl, paddingVertical: theme.spacing.md, borderBottomWidth: theme.borderWidth.thin, borderBottomColor: theme.colors.greyMedium },
  sheetTitle: { fontFamily: theme.fonts.bold, fontSize: theme.fontSize.lg, lineHeight: theme.lineHeight.lg, color: theme.colors.black },
});
