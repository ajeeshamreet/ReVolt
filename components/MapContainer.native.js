import { useState, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { theme } from '../theme';
import { useUserLocation, CITY_CENTER_COORDS } from '../lib/useUserLocation';
import { mapStyle } from '../lib/mapStyle';
import facilitiesData from '../data/facilities.json';
import FacilityMarker from './FacilityMarker';
import UserLocationMarker from './UserLocationMarker';

export default function MapContainer() {
  const mapRef = useRef(null);
  const { coords } = useUserLocation();
  const [selectedId, setSelectedId] = useState(null);

  const initialRegion = useMemo(() => {
    const target = coords || CITY_CENTER_COORDS;
    return {
      latitude: target.latitude,
      longitude: target.longitude,
      latitudeDelta: theme.map.latitudeDelta,
      longitudeDelta: theme.map.longitudeDelta,
    };
  }, [coords]);

  useEffect(() => {
    if (coords && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: theme.map.latitudeDelta,
          longitudeDelta: theme.map.longitudeDelta,
        },
        500
      );
    }
  }, [coords]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        customMapStyle={Platform.OS === 'android' ? mapStyle : undefined}
        mapType={Platform.OS === 'ios' ? 'mutedStandard' : 'standard'}
        showsUserLocation={false}
        showsMyLocationButton={false}
        initialRegion={initialRegion}
      >
        <UserLocationMarker coords={coords} />
        {facilitiesData.map((facility) => (
          <FacilityMarker
            key={facility.id}
            facility={facility}
            isSelected={selectedId === facility.id}
            onSelect={() => {
              setSelectedId(facility.id);
              mapRef.current?.animateToRegion(
                {
                  latitude: facility.lat,
                  longitude: facility.lng,
                  latitudeDelta: theme.map.latitudeDelta,
                  longitudeDelta: theme.map.longitudeDelta,
                },
                400
              );
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
