import type { ReactNode } from 'react';

import type { PressableProps } from 'react-native';

export interface MenuItemProps {
  icon: ReactNode;
  title: string;
  onPress: NonNullable<PressableProps['onPress']>;
  isNewMenu?: boolean;
}
