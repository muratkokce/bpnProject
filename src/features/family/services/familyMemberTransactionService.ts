import { globalAxios } from '@/core/api/globalAxios';
import { API_ENDPOINTS } from '@/core/constants';
import type { FamilyMemberTransactionsResponse } from '@/features/family/types/transaction.types';

export const familyMemberTransactionService = {
  async fetchTransactions(): Promise<FamilyMemberTransactionsResponse> {
    try {
      const { data } = await globalAxios.get<FamilyMemberTransactionsResponse>(
        API_ENDPOINTS.FAMILY_MEMBER_TRANSACTION,
      );

      if (!data) {
        throw new Error('Invalid response from family member transaction API');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch family member transaction data');
    }
  },
};
