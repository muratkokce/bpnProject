import React from 'react';

import { useTheme } from '@/assets/theme';

import ArrowRight from '../../../assets/icons/arrow-right.svg';
import { Text } from '../text';

import { ListItemContainer, ListItemContent } from './styles';
import type { ListItemProps } from './types';

const ListItem = ({ children, listTitle }: ListItemProps) => {
  const { normalizeSize } = useTheme();
  const items = Array.isArray(children) ? children : children ? [children] : [];

  return (
    <>
      {listTitle && (
        <Text
          style={{ marginBottom: normalizeSize(8), marginTop: normalizeSize(24) }}
          variant="captionBold"
        >
          {listTitle}
        </Text>
      )}
      {items.map(({ icon, title, onPress }, index) => (
        <ListItemContainer
          accessibilityRole="button"
          key={index}
          onPress={onPress}
          style={{
            borderTopLeftRadius: normalizeSize(index === 0 ? 12 : 0),
            borderTopRightRadius: normalizeSize(index === 0 ? 12 : 0),
            borderBottomLeftRadius: normalizeSize(index === items.length - 1 ? 12 : 0),
            borderBottomRightRadius: normalizeSize(index === items.length - 1 ? 12 : 0),
            paddingVertical: normalizeSize(items?.length > 1 ? 8 : 16),
          }}
        >
          {icon && icon}
          <ListItemContent>
            <Text variant="bodySemiBold">{title}</Text>
          </ListItemContent>
          <ArrowRight />
        </ListItemContainer>
      ))}
    </>
  );
};

export default ListItem;
