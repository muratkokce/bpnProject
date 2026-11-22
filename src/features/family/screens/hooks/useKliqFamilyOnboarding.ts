import { useEffect, useState } from 'react';

import { globalAxios } from '@/core/api/globalAxios';
import { API_ENDPOINTS } from '@/core/constants';

import { SliderItem } from '../kliq-family-onboarding/components/slider';

export const useKliqFamilyOnboarding = (attempt: number) => {
  const [data, setData] = useState<SliderItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    globalAxios
      .get<{ slides: SliderItem[] }>(API_ENDPOINTS.FAMILY_ONBOARDING, {
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
