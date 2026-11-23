import { useMemo } from 'react';

import { Transaction } from '@/features/family/types/transaction.types';

export const useTransactionDetails = (transaction: Transaction) => {
  return useMemo(
    () => [
      { label: 'Kategori', value: transaction.category },
      { label: 'Durum', value: transaction.status },
      { label: 'Tarih', value: transaction.formattedDate },
      { label: 'Kanal', value: transaction.channel },
      { label: 'Not', value: transaction.approvalNote },
      { label: 'TufooterComponenttar', value: transaction.formattedAmount },
      { label: 'Tutar', value: transaction.formattedAmount },
    ],
    [
      transaction.category,
      transaction.status,
      transaction.formattedDate,
      transaction.channel,
      transaction.approvalNote,
      transaction.formattedAmount,
    ]
  );
};
