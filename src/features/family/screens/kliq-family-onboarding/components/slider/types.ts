import type { ComponentType } from 'react';

import { SvgProps } from 'react-native-svg';

export interface SliderItem {
  id: string;
  step: number;
  badgeText: string;
  title: string;
  description: string;
  illustrationKey: string;
  image: string;
  icon?: ComponentType<SvgProps>;
  highlightBox: {
    icon: string;
    text: string;
  };
  ctaText: string;
  docIcon?: ComponentType<SvgProps>;
}

export interface SliderProps {
  items: SliderItem[];
  initialWidth: number;
  onSlideChange?: (index: number) => void;
  onWidthChange?: (width: number) => void;
}
