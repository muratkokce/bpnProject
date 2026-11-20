
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountsScreen from '@/features/accounts/screens/AccountsScreen';
import CardsScreen from '@/features/cards/screens/CardsScreen';
import TransactionsScreen from '@/features/transactions/screens/TransactionsScreen';
import { TabBar } from '@/shared/components/tab-bar/TabBar';

import { RootTabParamList } from './types';


const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen component={AccountsScreen} name="Accounts" options={{ title: 'Hesaplarım' }} />
      <Tab.Screen component={CardsScreen} name="Cards" options={{ title: 'Kartlarım' }} />
      <Tab.Screen
        component={TransactionsScreen}
        name="Transactions"
        options={{ title: 'İşlemler' }}
      />
    </Tab.Navigator>
  );
}
