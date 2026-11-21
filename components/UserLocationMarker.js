import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { theme } from '../theme';

export default function UserLocationMarker({ coords }) {
  if (!coords) return null;

  return (
    <Marker coordinate={coords} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={styles.ring}>
        <View style={styles.dot} />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  ring: {
    width: theme.marker.userRing,
    height: theme.marker.userRing,
    borderRadius: theme.marker.userRing / 2,
    backgroundColor: theme.colors.white,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.greyMedium,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  dot: {
    width: theme.marker.userDot,
    height: theme.marker.userDot,
    borderRadius: theme.marker.userDot / 2,
    backgroundColor: theme.colors.black,
  },
});
