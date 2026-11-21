import type { ReactNode } from 'react';

import type { PressableProps } from 'react-native';

export interface ListItemChildren {
  icon?: ReactNode;
  title: string;
  onPress: NonNullable<PressableProps['onPress']>;
}

export interface ListItemProps {
  children?: ListItemChildren | ListItemChildren[];
  listTitle?: string;
}
