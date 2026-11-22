import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FAMILY_ONBOARDING_COMPLETED_KEY } from '@/storage';

import { KliqFamilyRoutes } from '../routes';
import { FamilyStackParamList } from '../types';

export const useFamilyInitialRoute = () => {
  const [initialRoute, setInitialRoute] = useState<keyof FamilyStackParamList | null>(null);

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(FAMILY_ONBOARDING_COMPLETED_KEY)
      .then((completed) => {
        if (active) {
          setInitialRoute(
            completed === 'true'
              ? KliqFamilyRoutes.KliqFamilyListScreen
              : KliqFamilyRoutes.KliqFamilyOnboardingScreen
          );
        }
      })
      .catch(() => {
        if (active) {
          setInitialRoute(KliqFamilyRoutes.KliqFamilyOnboardingScreen);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return initialRoute;
};
