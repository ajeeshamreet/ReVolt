import { Linking, Platform } from 'react-native';

export function openDirections(facility) {
  if (!facility || facility.lat == null || facility.lng == null) return;

  const lat = facility.lat;
  const lng = facility.lng;
  const label = encodeURIComponent(facility.name || 'Drop-off Facility');

  const scheme = Platform.select({
    ios: `maps:0,0?q=${label}@${lat},${lng}`,
    android: `google.navigation:q=${lat},${lng}`,
    default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
  });

  Linking.openURL(scheme).catch(() => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
  });
}
