import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountsScreen from '@/features/accounts/screens/AccountsScreen';
import CardsScreen from '@/features/cards/screens/CardsScreen';
import TransactionsScreen from '@/features/transactions/screens/TransactionsScreen';
import { TabBar } from '@/shared/components/tab-bar';

import { MainTabHeader } from '../components/MainTabHeader';

import { FamilyNavigator } from './family-navigation/FamilyNavigator';
import { RootRoutes, TabRoutes } from './routes';
import { RootStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ options, route }) => (
          <MainTabHeader
            title={
              typeof options.headerTitle === 'string'
                ? options.headerTitle
                : options.title ?? route.name
            }
          />
        ),
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        component={AccountsScreen}
        name={TabRoutes.Accounts}
        options={{ title: 'Hesaplarım' }}
      />
      <Tab.Screen component={CardsScreen} name={TabRoutes.Cards} options={{ title: 'Kartlarım' }} />
      <Tab.Screen
        component={TransactionsScreen}
        name={TabRoutes.Transactions}
        options={{ title: 'İşlemler' }}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={MainTabs} name={RootRoutes.MainTabs} />
      <Stack.Screen component={FamilyNavigator} name={RootRoutes.Family} />
    </Stack.Navigator>
  );
};
