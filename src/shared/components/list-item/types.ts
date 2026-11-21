import type { ReactNode } from 'react';

import type { PressableProps } from 'react-native';

export interface ListItemProps {
  icon?: ReactNode;
  title: string;
  onPress: NonNullable<PressableProps['onPress']>;
  style?: PressableProps['style'];
}
