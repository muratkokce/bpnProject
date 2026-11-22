import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { Child } from '@/features/family/types/children.types';

import { KliqFamilyRoutes } from './routes';

export type FamilyStackParamList = {
  [KliqFamilyRoutes.KliqFamilyOnboardingScreen]: undefined;
  [KliqFamilyRoutes.KliqFamilyListScreen]: undefined;
  [KliqFamilyRoutes.AddKliqFamilyMemberScreen]: undefined;
  [KliqFamilyRoutes.KliqFamilyListDetailScreen]: { child: Child };
  [KliqFamilyRoutes.KliqFamilyMemberTransactionScreen]: undefined;
};

export type FamilyScreenProps<Screen extends keyof FamilyStackParamList> = NativeStackScreenProps<
  FamilyStackParamList,
  Screen
>;
