import { useEffect } from 'react';

import { useChildrenStore } from '@/core/store/childrenStore';

import { childrenService } from '../../services/childrenService';

export const useChildrenData = () => {
  const { data, isLoading, error, setData, setLoading, setError } = useChildrenStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const childrenData = await childrenService.fetchChildren();
        setData(childrenData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData, setLoading, setError]);

  return {
    data,
    isLoading,
    error,
  };
};
