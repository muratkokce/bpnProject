import { Dimensions, PixelRatio } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../assets/theme/colors';

const normalizeSize = (size: number): number => {
  const { width, height } = Dimensions.get('window');
  const scale = Math.min(Math.min(width, height) / 375, Math.max(width, height) / 812);

  return PixelRatio.roundToNearestPixel(size * scale);
};

type AppTheme = {
  colors: typeof colors;
  normalizeSize: typeof normalizeSize;
  insets: EdgeInsets;
};

const theme: Omit<AppTheme, 'insets'> = { colors, normalizeSize };

const useTheme = (): AppTheme => {
  const insets = useSafeAreaInsets();

  return { ...theme, insets };
};

export { colors, normalizeSize, theme, useTheme };
export type { AppTheme };
