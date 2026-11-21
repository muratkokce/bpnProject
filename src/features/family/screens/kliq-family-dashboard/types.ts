import type { ComponentType } from 'react';

import type { SvgProps } from 'react-native-svg';

export interface KliqFamilyDashboardItemType {
  title: string;
  description: string;
  icon: ComponentType<SvgProps>;
  docIcon?: ComponentType<SvgProps>;
}
