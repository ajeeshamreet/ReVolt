import Svg, { Path, Rect, G, Line } from 'react-native-svg';
import { theme } from '../theme';

export default function EWasteIcon({
  size = theme.marker.facilityIcon,
  color = theme.colors.green,
  style,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {/* Circuit Board sticking out */}
      <G transform="rotate(12 12 7)">
        <Rect
          x="8.5"
          y="1.5"
          width="7"
          height="8.5"
          rx="1"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
        />
        <Rect x="10.5" y="4" width="3" height="3" rx="0.5" fill={color} />
        <Line x1="10" y1="2.5" x2="10" y2="4" stroke={color} strokeWidth="0.8" />
        <Line x1="14" y1="2.5" x2="14" y2="4" stroke={color} strokeWidth="0.8" />
        <Line x1="9" y1="5.5" x2="10.5" y2="5.5" stroke={color} strokeWidth="0.8" />
        <Line x1="13.5" y1="5.5" x2="15" y2="5.5" stroke={color} strokeWidth="0.8" />
      </G>

      {/* Bin Rim */}
      <Rect
        x="3.5"
        y="10"
        width="17"
        height="2.2"
        rx="1.1"
        stroke={color}
        strokeWidth="1.4"
        fill={theme.colors.black}
      />

      {/* Bin Body */}
      <Path
        d="M5.5 12.2 L6.8 20.8 C7 21.8 7.8 22.5 8.8 22.5 L15.2 22.5 C16.2 22.5 17 21.8 17.2 20.8 L18.5 12.2"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Recycle Symbol on Bin Front */}
      {/* Top arrow */}
      <Path
        d="M10.8 15.2 H13.2 M13.2 15.2 L12.4 14.2 M13.2 15.2 L12.4 16.2"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right arrow */}
      <Path
        d="M13.8 16.8 L12.6 18.8 M12.6 18.8 L12.4 17.6 M12.6 18.8 L13.6 18.8"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left arrow */}
      <Path
        d="M10.2 16.8 L11.4 18.8 M10.2 16.8 L11.2 16.8 M10.2 16.8 L10.4 17.8"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
