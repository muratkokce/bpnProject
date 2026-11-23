import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { Child } from '@/features/family/types/children.types';
import type { Transaction } from '@/features/family/types/transaction.types';

import { KliqFamilyRoutes } from './routes';

export type FamilyStackParamList = {
  [KliqFamilyRoutes.KliqFamilyOnboardingScreen]: undefined;
  [KliqFamilyRoutes.KliqFamilyListScreen]: undefined;
  [KliqFamilyRoutes.AddKliqFamilyMemberScreen]: undefined;
  [KliqFamilyRoutes.KliqFamilyListDetailScreen]: { child: Child };
  [KliqFamilyRoutes.KliqFamilyTransactionScreen]: { child: Child };
  [KliqFamilyRoutes.KliqFamilyTransactionDetailScreen]: { transaction: Transaction };
};

export type FamilyScreenProps<Screen extends keyof FamilyStackParamList> = NativeStackScreenProps<
  FamilyStackParamList,
  Screen
>;

export type FamilyNavigationOptions = {
  headerShowHome?: boolean;
};
