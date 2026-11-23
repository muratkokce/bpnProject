import { useQuery } from '@tanstack/react-query';

import { globalAxios } from '@/core/api/globalAxios';
import { API_ENDPOINTS } from '@/core/constants';
import { useChildrenStore } from '@/core/store/childrenStore';

import { SliderItem } from '../kliq-family-onboarding/components/slider';

export const useKliqFamilyOnboarding = () => {
  const { setError } = useChildrenStore();

  return useQuery({
    queryKey: ['kliqFamilyOnboarding'],
    queryFn: async () => {
      try {
        const { data } = await globalAxios.get<{ slides: SliderItem[] }>(
          API_ENDPOINTS.FAMILY_ONBOARDING
        );

        if (!Array.isArray(data?.slides) || data.slides.length === 0) {
          throw new Error('Onboarding slides are unavailable');
        }

        return data.slides;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Request failed');
        setError(error);
        throw error;
      }
    },
  });
};
