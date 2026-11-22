import React from 'react';

import { FlatList } from 'react-native';

import type { Transaction } from '@/features/family/types/transaction.types';

import TransactionListItem from './TransactionListItem';

interface TransactionListProps {
  transactions: Transaction[];
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEndReached,
  onEndReachedThreshold = 0.5,
}) => {
  const renderItem = ({ item }: { item: Transaction }) => (
    <TransactionListItem transaction={item} />
  );

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  );
};

export default TransactionList;
