import { ViewProps } from 'react-native';

export interface InfoCardProps extends Omit<ViewProps, 'children'> {
  icon: React.ReactNode;
  text: string;
  description: string;
  textColor?: string;
  descriptionColor?: string;
  backgroundColor?: string;
}
