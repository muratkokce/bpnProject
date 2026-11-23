import { useQuery } from '@tanstack/react-query';

import { familyLimitAuthorityService } from '@/features/family/services/familyLimitAuthorityService';

export const useFamilyLimitAuthority = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['familyLimitAuthority'],
    queryFn: async () => {
      return await familyLimitAuthorityService.fetchLimitAuthority();
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
