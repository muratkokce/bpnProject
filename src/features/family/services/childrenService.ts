import { globalAxios } from '@/core/api/globalAxios';
import { API_ENDPOINTS } from '@/core/constants';
import type { ChildrenData } from '@/features/family/types/children.types';

export const childrenService = {
  async fetchChildren(): Promise<ChildrenData> {
    try {
      const { data } = await globalAxios.get<ChildrenData>(API_ENDPOINTS.CHILDREN);

      if (!data) {
        throw new Error('Invalid response from children API');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch children data');
    }
  },
};
