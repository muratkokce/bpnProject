import React from 'react';

import { ScrollView } from 'react-native';

import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import { useTheme } from '@/assets/theme';
import { ChildStatus, type Child } from '@/features/family/types/children.types';
import { Text } from '@/shared/components/text';

import FamilyAvatar from '../family-avatar/FamilyAvatar';

import {
  ListItemContainer,
  ItemCard,
  ChildInfoContainer,
  ChildDetailsContainer,
  EmptyStateContainer,
  AwaitingApprovalStateContainer,
} from './styles';

interface KliqFamilyListItemsProps {
  children: Child[];
  onChildPress?: (child: Child) => void;
}

export const KliqFamilyListItems: React.FC<KliqFamilyListItemsProps> = ({
  children,
  onChildPress,
}) => {
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
          <ItemCard key={child.id} onPress={() => onChildPress?.(child)}>
            <ChildInfoContainer>
              <FamilyAvatar child={child} />
              <ChildDetailsContainer>
                <Text numberOfLines={1} variant="bodyBold">
                  {child.fullName}
                </Text>
                <Text variant="captionSmall">{child.account?.formattedBalance || '0,00 TL'}</Text>
              </ChildDetailsContainer>
            </ChildInfoContainer>
            {child.status === ChildStatus.AWAITING_APPROVAL && (
              <AwaitingApprovalStateContainer>
                <Text color={colors.text.gray} variant="captionSmallBold">
                  Onay Bekliyor
                </Text>
              </AwaitingApprovalStateContainer>
            )}
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
