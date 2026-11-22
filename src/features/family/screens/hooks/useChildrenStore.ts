import { useCallback, useEffect } from 'react';

import { useChildrenStore } from '@/core/store/childrenStore';

import { childrenService } from '../../services/childrenService';

export const useChildrenData = ({ autoFetch = true }: { autoFetch?: boolean } = {}) => {
  const { data, isLoading, error, setData, setLoading, setError } = useChildrenStore();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const childrenData = await childrenService.fetchChildren();
      setData(childrenData);
      return childrenData;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setData, setLoading, setError]);

  useEffect(() => {
    if (autoFetch) {
      fetchData().catch(() => undefined);
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
};
