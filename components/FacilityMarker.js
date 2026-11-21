import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import EWasteIcon from './EWasteIcon';
import { theme } from '../theme';

export default function FacilityMarker({ facility, isSelected, onSelect }) {
  return (
    <Marker
      coordinate={{ latitude: facility.lat, longitude: facility.lng }}
      onPress={onSelect}
    >
      <View style={[styles.marker, isSelected ? styles.selected : styles.unselected]}>
        <EWasteIcon
          size={isSelected ? theme.marker.facilityIconSelected : theme.marker.facilityIcon}
          color={theme.colors.green}
        />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    backgroundColor: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unselected: {
    width: theme.marker.facilitySize,
    height: theme.marker.facilitySize,
    borderRadius: theme.marker.facilitySize / 2,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.white,
  },
  selected: {
    width: theme.marker.facilitySizeSelected,
    height: theme.marker.facilitySizeSelected,
    borderRadius: theme.marker.facilitySizeSelected / 2,
    borderWidth: theme.borderWidth.thick,
    borderColor: theme.colors.white,
  },
});
