import React from 'react';

import { FooterIconsContainer } from '../styles';
import { ScreenFooterIconsProps } from '../types';

const ScreenFooterIcons = ({ leftIcon, rightIcon }: ScreenFooterIconsProps) => (
  <FooterIconsContainer>
    {leftIcon}
    {rightIcon}
  </FooterIconsContainer>
);

export { ScreenFooterIcons };
