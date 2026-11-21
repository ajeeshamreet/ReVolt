import { Marker } from 'react-native-maps';
import FacilityPin from './FacilityPin';

export default function FacilityMarker({ facility, isSelected, onSelect }) {
  return (
    <Marker
      coordinate={{ latitude: facility.lat, longitude: facility.lng }}
      anchor={{ x: 0.5, y: 1 }}
      onPress={onSelect}
    >
      <FacilityPin isSelected={isSelected} />
    </Marker>
  );
}
