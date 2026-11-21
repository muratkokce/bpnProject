import { useEffect, useState } from 'react';

import { globalAxios } from '@/core/api/globalAxios';

import { SliderItem } from '../components/slider';

export const useKliqFamilyOnboarding = (attempt: number) => {
  const [data, setData] = useState<SliderItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setError(null);
    setIsLoading(true);

    globalAxios
      .get<{ slides: SliderItem[] }>('c/5ac4-7b2b-4fd6-8fa3', {
        signal: controller.signal,
      })
      .then(({ data: response }) => {
        if (!Array.isArray(response?.slides) || response.slides.length === 0) {
          throw new Error('Onboarding slides are unavailable');
        }
        if (!controller.signal.aborted) {
          setData(response.slides);
        }
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError : new Error('Request failed'));
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [attempt]);

  return { data, error, isLoading };
};
