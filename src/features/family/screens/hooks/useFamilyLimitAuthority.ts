import { useQuery } from '@tanstack/react-query';

import { useFamilyLimitAuthorityStore } from '@/core/store';
import { familyLimitAuthorityService } from '@/features/family/services/familyLimitAuthorityService';

export const useFamilyLimitAuthority = ({ autoFetch = true }: { autoFetch?: boolean } = {}) => {
  const { data: storeData, setData, setError } = useFamilyLimitAuthorityStore();

  return useQuery({
    queryKey: ['familyLimitAuthority'],
    queryFn: async () => {
      try {
        const data = await familyLimitAuthorityService.fetchLimitAuthority();
        setData(data);
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        throw error;
      }
    },
    enabled: autoFetch && !storeData,
  });
};
