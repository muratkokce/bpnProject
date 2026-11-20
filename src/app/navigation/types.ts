import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { FamilyStackParamList } from '@/features/family/navigation/types';

import { RootRoutes, TabRoutes } from './routes';

export type RootTabParamList = {
  [TabRoutes.Accounts]: undefined;
  [TabRoutes.Cards]: undefined;
  [TabRoutes.Transactions]: undefined;
};

export type RootStackParamList = {
  [RootRoutes.MainTabs]: NavigatorScreenParams<RootTabParamList> | undefined;
  [RootRoutes.Family]: NavigatorScreenParams<FamilyStackParamList> | undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


