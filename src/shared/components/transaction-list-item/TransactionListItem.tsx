import React from 'react';

import ExpenseIcon from '@/assets/icons/expense.svg';
import IncomeIcon from '@/assets/icons/income.svg';
import { useTheme } from '@/assets/theme';
import type { Transaction } from '@/features/family/types/transaction.types';

import { Text } from '../text';

import { Container, ContentContainer, IconCircle, LeftContent, RightContent } from './styles';

interface TransactionListItemProps {
  transaction: Transaction;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction }) => {
  const { colors, normalizeSize } = useTheme();
  const isExpense = transaction.type === 'EXPENSE';
  const typeLabel = isExpense ? 'Giden Para' : 'Gelen Para';
  const IconComponent = isExpense ? ExpenseIcon : IncomeIcon;

  return (
    <Container>
      <IconCircle>
        <IconComponent height={normalizeSize(24)} width={normalizeSize(24)} />
      </IconCircle>
      <ContentContainer>
        <LeftContent>
          <Text color={colors.text.graySecondary} numberOfLines={1} variant="captionRegular">
            {typeLabel}
          </Text>
          <Text numberOfLines={1}>{transaction.title}</Text>
        </LeftContent>
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
      </ContentContainer>
    </Container>
  );
};

export default TransactionListItem;
