import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { KliqFamilyRoutes } from './routes';
import type { Child } from '@/features/family/types/children.types';

export type FamilyStackParamList = {
  [KliqFamilyRoutes.KliqFamilyOnboardingScreen]: undefined;
  [KliqFamilyRoutes.KliqFamilyListScreen]: undefined;
  [KliqFamilyRoutes.AddKliqFamilyMemberScreen]: undefined;
  [KliqFamilyRoutes.KliqFamilyListDetailScreen]: { child: Child };
};

export type FamilyScreenProps<Screen extends keyof FamilyStackParamList> = NativeStackScreenProps<
  FamilyStackParamList,
  Screen
>;

