import { useQuery } from '@tanstack/react-query';

import { useChildrenStore } from '@/core/store/childrenStore';

import { childrenService } from '../../services/childrenService';

export const useChildren = ({ autoFetch = true }: { autoFetch?: boolean } = {}) => {
  const { data: storeData, setData, setError } = useChildrenStore();

  return useQuery({
    queryKey: ['childrenData'],
    queryFn: async () => {
      try {
        const data = await childrenService.fetchChildren();
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
