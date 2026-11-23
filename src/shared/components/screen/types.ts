import { ViewProps } from 'react-native';

import { ButtonProps } from '../button/types';

export interface ScreenProps extends Omit<ViewProps, 'children'> {
  children: React.ReactNode;
  isScreenLoading?: boolean;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  footerComponent?: React.ReactNode;
  scrollable?: boolean;
  loadingIndicatorColor?: string;
  buttonContainerStyle?: ViewProps['style'];
  showBottomGradient?: boolean;
  contentContainerStyle?: ViewProps['style'];
}

export interface ScreenFooterIconsProps {
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
}
