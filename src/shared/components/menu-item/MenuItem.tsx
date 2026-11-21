import React from 'react';

import ArrowRight from '../../../assets/icons/arrow-right.svg';
import { Text } from '../text';

import { MenuItemContainer, MenuItemContent, NewBadge } from './styles';
import type { MenuItemProps } from './types';

const MenuItem = ({ icon, title, onPress, isNewMenu = false }: MenuItemProps) => (
  <MenuItemContainer accessibilityRole="button" onPress={onPress}>
    {icon}
    <MenuItemContent>
      <Text style={{ flexShrink: 1 }} variant="bodyMedium">
        {title}
      </Text>
    </MenuItemContent>
    {isNewMenu && (
      <NewBadge>
        <Text color="text.primary" variant="captionSmallBoldCenter">
          Yeni
        </Text>
      </NewBadge>
    )}
    <ArrowRight />
  </MenuItemContainer>
);

export default MenuItem;
