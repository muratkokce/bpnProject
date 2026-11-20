import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Accounts: undefined;
  Cards: undefined;
  Transactions: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
  RootTabParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
