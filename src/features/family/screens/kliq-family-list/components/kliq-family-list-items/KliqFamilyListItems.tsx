import React from 'react';

import { ScrollView } from 'react-native';
import { SvgUri } from 'react-native-svg';

import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import KliqMiniIcon from '@/assets/icons/kliq-mini.svg';
import { useTheme } from '@/assets/theme';
import { ChildStatus } from '@/features/family/screens/kliq-family-list/constants';
import type { Child } from '@/features/family/types/children.types';
import { Text } from '@/shared/components/text';
import { getNameInitials } from '@/shared/utils';

import {
  ListItemContainer,
  ItemCard,
  ChildInfoContainer,
  AvatarContainer,
  ChildDetailsContainer,
  EmptyStateContainer,
  AvatarStatusContainer,
} from './styles';

interface KliqFamilyListItemsProps {
  children: Child[];
}

export const KliqFamilyListItems: React.FC<KliqFamilyListItemsProps> = ({ children }) => {
  const { colors, normalizeSize } = useTheme();

  if (!children.length) {
    return (
      <EmptyStateContainer>
        <Text variant="bodyMedium">Henüz çocuk eklenmemiş</Text>
      </EmptyStateContainer>
    );
  }

  return (
    <ScrollView scrollEnabled={false}>
      <ListItemContainer>
        {children.map((child) => (
          <ItemCard key={child.id}>
            <ChildInfoContainer>
              <AvatarContainer>
                {child.avatarUrl ? (
                  <SvgUri
                    height={normalizeSize(40)}
                    uri={child.avatarUrl}
                    width={normalizeSize(40)}
                  />
                ) : (
                  <Text color={colors.text.white} variant="bodyBold">
                    {getNameInitials(child.fullName)}
                  </Text>
                )}
                {child.status === ChildStatus.ACTIVE && (
                  <AvatarStatusContainer>
                    <KliqMiniIcon height={normalizeSize(7)} width={normalizeSize(6)} />
                  </AvatarStatusContainer>
                )}
              </AvatarContainer>

              <ChildDetailsContainer>
                <Text numberOfLines={1} variant="bodyBold">
                  {child.fullName}
                </Text>
                <Text variant="captionSmall">{child.account?.formattedBalance || '0,00 TL'}</Text>
              </ChildDetailsContainer>
            </ChildInfoContainer>

            <ArrowRightIcon
              color={colors.secondary}
              height={normalizeSize(24)}
              width={normalizeSize(24)}
            />
          </ItemCard>
        ))}
      </ListItemContainer>
    </ScrollView>
  );
};
