import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { KliqFamilyRoutes } from './routes';

export type FamilyStackParamList = {
  [KliqFamilyRoutes.KliqFamilyDashboardScreen]: undefined;
  [KliqFamilyRoutes.KliqFamilyListScreen]: undefined;
  [KliqFamilyRoutes.AddKliqFamilyMemberScreen]: undefined;
};

export type FamilyScreenProps<Screen extends keyof FamilyStackParamList> = NativeStackScreenProps<
  FamilyStackParamList,
  Screen
>;
