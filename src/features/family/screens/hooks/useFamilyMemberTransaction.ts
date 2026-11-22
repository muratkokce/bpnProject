import { useCallback, useEffect, useState } from 'react';

import { familyMemberTransactionService } from '../../services/familyMemberTransactionService';
import type { FamilyMemberTransactionsResponse } from '../../types/transaction.types';

export const useFamilyMemberTransaction = () => {
  const [data, setData] = useState<FamilyMemberTransactionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const transactionData = await familyMemberTransactionService.fetchTransactions();
      setData(transactionData);
      return transactionData;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData().catch(() => undefined);
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
