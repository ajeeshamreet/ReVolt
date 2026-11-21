const toRad = (value) => (value * Math.PI) / 180;

export const toRegion = (lat, lng, delta = 0.1) => ({
  latitude: lat,
  longitude: lng,
  latitudeDelta: delta,
  longitudeDelta: delta,
});

export function haversineDistance(coord1, coord2) {
  if (!coord1 || !coord2) return null;

  const lat1 = coord1.latitude ?? coord1.lat;
  const lon1 = coord1.longitude ?? coord1.lng;
  const lat2 = coord2.latitude ?? coord2.lat;
  const lon2 = coord2.longitude ?? coord2.lng;

  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return null;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function withDistance(facilities, coords) {
  if (!Array.isArray(facilities)) return [];
  if (!coords) return facilities.map((facility) => ({ ...facility, km: null }));

  return facilities
    .map((facility) => ({
      ...facility,
      km: haversineDistance(coords, { latitude: facility.lat, longitude: facility.lng }),
    }))
    .sort((a, b) => (a.km ?? Infinity) - (b.km ?? Infinity));
}
