import { ViewProps } from 'react-native';

import { ButtonProps } from '../button/types';

export interface ScreenProps extends Omit<ViewProps, 'children'> {
  children: React.ReactNode;
  isScreenLoading?: boolean;
  primaryButton?: ButtonProps;
  footerComponent?: React.ReactNode;
  scrollable?: boolean;
  loadingIndicatorColor?: string;
  buttonContainerStyle?: ViewProps['style'];
  showBottomGradient?: boolean;
  contentContainerStyle?: ViewProps['style'];
}
