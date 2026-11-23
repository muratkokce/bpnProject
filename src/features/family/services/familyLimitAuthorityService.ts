import { globalAxios } from '@/core/api/globalAxios';
import { API_ENDPOINTS } from '@/core/constants';
import type { FamilyLimitAuthorityResponse } from '@/features/family/types/limitAuthority.types';

export const familyLimitAuthorityService = {
  async fetchLimitAuthority(): Promise<FamilyLimitAuthorityResponse> {
    try {
      const { data } = await globalAxios.get<FamilyLimitAuthorityResponse>(
        API_ENDPOINTS.FAMILY_LIMIT_AUTHORITY,
      );

      if (!data) {
        throw new Error('Invalid response from family limit authority API');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch family limit authority data');
    }
  },
};
