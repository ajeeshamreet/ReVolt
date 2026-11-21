import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';

export default function DeviceIcon({ id, size = 38 }) {
  const c = { stroke: '#000000', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

  switch (id) {
    case 'smartphone':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="8" y="2" width="16" height="28" rx="4" fill="#FFFFFF" {...c} />
          <Line x1="13" y1="5" x2="19" y2="5" {...c} strokeWidth={1.5} />
          <Line x1="14" y1="26" x2="18" y2="26" {...c} strokeWidth={1.5} />
        </Svg>
      );
    case 'feature_phone':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="8" y="2" width="16" height="28" rx="4" fill="#FFFFFF" {...c} />
          <Rect x="11" y="5" width="10" height="8" rx="1.5" fill="#FFFFFF" {...c} strokeWidth={1.5} />
          <Circle cx="12" cy="17" r="1" fill="#000" /><Circle cx="16" cy="17" r="1" fill="#000" /><Circle cx="20" cy="17" r="1" fill="#000" />
          <Circle cx="12" cy="21" r="1" fill="#000" /><Circle cx="16" cy="21" r="1" fill="#000" /><Circle cx="20" cy="21" r="1" fill="#000" />
          <Circle cx="12" cy="25" r="1" fill="#000" /><Circle cx="16" cy="25" r="1" fill="#000" /><Circle cx="20" cy="25" r="1" fill="#000" />
        </Svg>
      );
    case 'laptop':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="6" y="5" width="20" height="15" rx="2" fill="#FFFFFF" {...c} />
          <Line x1="2" y1="24" x2="30" y2="24" {...c} strokeWidth={2.5} />
          <Rect x="13" y="24" width="6" height="1.5" rx="0.5" fill="#000" />
        </Svg>
      );
    case 'tablet':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="3" y="6" width="26" height="20" rx="3" fill="#FFFFFF" {...c} />
          <Rect x="6.5" y="9" width="19" height="14" rx="1.5" fill="#FFFFFF" {...c} strokeWidth={1.5} />
          <Circle cx="5" cy="16" r="0.8" fill="#000" />
        </Svg>
      );
    case 'tv':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="4" y="4" width="24" height="17" rx="2" fill="#FFFFFF" {...c} />
          <Rect x="7" y="7" width="18" height="11" rx="1" fill="#FFFFFF" {...c} strokeWidth={1.5} />
          <Line x1="16" y1="21" x2="16" y2="25" {...c} /><Line x1="11" y1="25" x2="21" y2="25" {...c} />
        </Svg>
      );
    case 'charger':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="8" y="9" width="16" height="13" rx="3" fill="#FFFFFF" {...c} />
          <Line x1="12" y1="4" x2="12" y2="9" {...c} strokeWidth={2.5} /><Line x1="20" y1="4" x2="20" y2="9" {...c} strokeWidth={2.5} />
          <Path d="M16 22 V26 C16 29 23 27 23 30" fill="none" {...c} />
        </Svg>
      );
    case 'earbuds':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Path d="M9 5 C6.8 5 5 6.8 5 9 C5 11 6.5 12.5 8.5 12.8 V24 C8.5 25.1 9.4 26 10.5 26 C11.6 26 12.5 25.1 12.5 24 V9 C12.5 6.8 11.2 5 9 5 Z" fill="#FFFFFF" {...c} />
          <Path d="M23 5 C20.8 5 19 6.8 19 9 C19 11 20.5 12.5 22.5 12.8 V24 C22.5 25.1 23.4 26 24.5 26 C25.6 26 26.5 25.1 26.5 24 V9 C26.5 6.8 25.2 5 23 5 Z" fill="#FFFFFF" {...c} />
        </Svg>
      );
    case 'powerbank':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="8" y="4" width="16" height="24" rx="4" fill="#FFFFFF" {...c} />
          <Path d="M16.5 9 L13 15 H16 L15 22 L20 14 H16.5 Z" fill="#000" />
        </Svg>
      );
    case 'smartwatch':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="11" y="2" width="10" height="5" rx="1" fill="#FFFFFF" {...c} /><Rect x="11" y="25" width="10" height="5" rx="1" fill="#FFFFFF" {...c} />
          <Circle cx="16" cy="16" r="9" fill="#FFFFFF" {...c} /><Path d="M16 11 V16 H19" fill="none" {...c} />
        </Svg>
      );
    case 'desktop':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="2" y="6" width="16" height="12" rx="2" fill="#FFFFFF" {...c} />
          <Line x1="10" y1="18" x2="10" y2="21" {...c} /><Line x1="7" y1="21" x2="13" y2="21" {...c} />
          <Rect x="21" y="5" width="9" height="18" rx="2" fill="#FFFFFF" {...c} />
          <Line x1="23.5" y1="8" x2="27.5" y2="8" {...c} strokeWidth={1.5} /><Circle cx="25.5" cy="18" r="1" fill="#000" />
        </Svg>
      );
    case 'console':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Path d="M6 10 C10 9 22 9 26 10 C29 11 30 17 28 23 C26.8 26.5 23 25 21 21 L19 18 H13 L11 21 C9 25 5.2 26.5 4 23 C2 17 3 11 6 10 Z" fill="#FFFFFF" {...c} />
          <Path d="M8 14 H12 M10 12 V16" fill="none" {...c} strokeWidth={1.5} />
          <Circle cx="21" cy="13" r="1" fill="#000" /><Circle cx="23" cy="15" r="1" fill="#000" />
        </Svg>
      );
    case 'microwave':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32">
          <Rect x="3" y="6" width="26" height="18" rx="3" fill="#FFFFFF" {...c} />
          <Rect x="6" y="9" width="13" height="12" rx="1.5" fill="#FFFFFF" {...c} strokeWidth={1.5} />
          <Line x1="22" y1="10" x2="25" y2="10" {...c} strokeWidth={1.5} />
          <Line x1="22" y1="13" x2="25" y2="13" {...c} strokeWidth={1.5} />
          <Line x1="22" y1="16" x2="25" y2="16" {...c} strokeWidth={1.5} />
          <Line x1="6" y1="24" x2="6" y2="26" {...c} /><Line x1="26" y1="24" x2="26" y2="26" {...c} />
        </Svg>
      );
    default:
      return null;
  }
}
