import { ViewProps } from 'react-native';

import { ButtonProps } from '../button/types';

export interface InfoModalProps extends Omit<ViewProps, 'children'> {
  visible: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
  primaryButton: Omit<ButtonProps, 'text'> & { text: string };
  secondaryButton?: Omit<ButtonProps, 'text'> & { text: string };
}
