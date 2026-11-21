import React from 'react';

import ArrowRight from '../../../assets/icons/arrow-right.svg';
import { Text } from '../text';

import { ListItemContainer, ListItemContent } from './styles';
import type { ListItemProps } from './types';

const ListItem = ({ icon, title, onPress, style }: ListItemProps) => (
  <ListItemContainer accessibilityRole="button" onPress={onPress} style={style}>
    {icon && icon}
    <ListItemContent>
      <Text style={{ flexShrink: 1 }} variant="bodyMedium">
        {title}
      </Text>
    </ListItemContent>
    <ArrowRight />
  </ListItemContainer>
);

export default ListItem;
