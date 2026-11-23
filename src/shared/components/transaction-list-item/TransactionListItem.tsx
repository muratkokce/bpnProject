import React from 'react';

import { useNavigation } from '@react-navigation/native';
import type { ViewProps } from 'react-native';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import ExpenseIcon from '@/assets/icons/expense.svg';
import IncomeIcon from '@/assets/icons/income.svg';
import { useTheme } from '@/assets/theme';
import type { Transaction } from '@/features/family/types/transaction.types';

import { Text } from '../text';

import { Container, ContentContainer, IconCircle, LeftContent, RightContent } from './styles';

interface TransactionListItemProps {
  transaction: Transaction;
  isVisibleRightContent?: boolean;
  style?: ViewProps['style'];
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
  isVisibleRightContent = true,
  style,
}) => {
  const { colors, normalizeSize } = useTheme();
  const navigation =
    useNavigation<
      FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyTransactionScreen>['navigation']
    >();
  const isExpense = transaction.type === 'EXPENSE';
  const typeLabel = isExpense ? 'Giden Para' : 'Gelen Para';
  const IconComponent = isExpense ? ExpenseIcon : IncomeIcon;

  const handlePress = () => {
    navigation.navigate(KliqFamilyRoutes.KliqFamilyTransactionDetailScreen as any, { transaction });
  };

  return (
    <Container onPress={handlePress} style={style}>
      <IconCircle>
        <IconComponent height={normalizeSize(24)} width={normalizeSize(24)} />
      </IconCircle>
      <ContentContainer>
        <LeftContent>
          <Text color={colors.text.graySecondary} numberOfLines={1} variant="captionRegular">
            {typeLabel}
          </Text>
          <Text numberOfLines={2}>{transaction.title}</Text>
        </LeftContent>
        {isVisibleRightContent && (
          <RightContent>
            <Text color={colors.text.graySecondary} numberOfLines={1} variant="captionSmall">
              {transaction.formattedDate}
            </Text>
            <Text
              color={isExpense ? colors.error : colors.text.primary}
              numberOfLines={1}
              variant="bodyMedium"
            >
              {transaction.formattedAmount}
            </Text>
          </RightContent>
        )}
      </ContentContainer>
    </Container>
  );
};

export default TransactionListItem;
