import Svg, { Path } from 'react-native-svg';
import { theme } from '../theme';

export default function Blob({
  color = theme.colors.mint,
  size = theme.blobSize.md,
  hasBorder = true,
  style,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <Path
        d="M50 4 C62 4 65 18 76 24 C87 30 97 38 95 50 C93 62 87 70 76 76 C65 82 62 96 50 96 C38 96 35 82 24 76 C13 70 7 62 5 50 C3 38 13 30 24 24 C35 18 38 4 50 4 Z"
        fill={color}
        stroke={hasBorder ? theme.colors.black : theme.colors.transparent}
        strokeWidth={hasBorder ? theme.borderWidth.card : theme.borderWidth.none}
      />
    </Svg>
  );
}
