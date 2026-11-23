import { useQuery } from '@tanstack/react-query';

import { useChildrenStore } from '@/core/store/childrenStore';
import { familyMemberTransactionService } from '../../services/familyMemberTransactionService';
import type { FamilyMemberTransactionsResponse } from '../../types/transaction.types';

export const useFamilyMemberTransaction = () => {
  const { setLoading, setError } = useChildrenStore();

  return useQuery({
    queryKey: ['familyMemberTransaction'],
    queryFn: async () => {
      setLoading(true);
      try {
        return await familyMemberTransactionService.fetchTransactions();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
  });
};
