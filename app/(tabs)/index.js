import { View, StyleSheet } from 'react-native';
import MapContainer from '../../components/MapContainer';
import { theme } from '../../theme';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
