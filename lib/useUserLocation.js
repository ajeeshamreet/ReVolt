import { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import * as Location from 'expo-location';

export const CITY_CENTER_COORDS = {
  latitude: 12.9716,
  longitude: 77.5946,
};

export function useUserLocation() {
  const [location, setLocation] = useState({
    coords: CITY_CENTER_COORDS,
    status: 'pending',
  });

  useEffect(() => {
    let active = true;

    async function fetchLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          if (active) setLocation({ coords: CITY_CENTER_COORDS, status: 'denied' });
          return;
        }

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (active && position?.coords) {
          setLocation({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            status: 'granted',
          });
        }
      } catch (err) {
        if (active) setLocation({ coords: CITY_CENTER_COORDS, status: 'error' });
      }
    }

    fetchLocation();

    const sub = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        fetchLocation();
      }
    });

    return () => {
      active = false;
      sub.remove();
    };
  }, []);

  return location;
}
