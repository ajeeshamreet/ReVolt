import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function FacilityPin({ isSelected }) {
  const width = isSelected ? theme.marker.pinWidthSelected : theme.marker.pinWidth;
  const height = isSelected ? theme.marker.pinHeightSelected : theme.marker.pinHeight;
  const iconSize = isSelected ? theme.marker.pinIconSelected : theme.marker.pinIcon;

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height} viewBox="0 0 32 40">
        <Path
          d="M16 2 C8.8 2 3 7.8 3 15 C3 23.5 14.5 36.8 15.4 37.8 C15.7 38.1 16.3 38.1 16.6 37.8 C17.5 36.8 29 23.5 29 15 C29 7.8 23.2 2 16 2 Z"
          fill={theme.colors.green}
          stroke={isSelected ? theme.colors.white : theme.colors.black}
          strokeWidth={isSelected ? theme.borderWidth.card : theme.borderWidth.thin}
        />
      </Svg>
      <View style={[styles.iconWrapper, { top: isSelected ? theme.spacing.sm : theme.spacing.xs }]}>
        <MaterialCommunityIcons
          name="recycle"
          size={iconSize}
          color={theme.colors.white}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  iconWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
