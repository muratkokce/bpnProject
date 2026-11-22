import type { ComponentType } from 'react';

import type { SvgProps } from 'react-native-svg';

import type { RootRoutes } from '@/app/navigation/routes';

export interface TransactionMenuItemType {
  title: string;
  icon: ComponentType<SvgProps>;
  isNewMenu?: boolean;
  routeScreen?: typeof RootRoutes.Family;
  onPress?: () => void;
}
