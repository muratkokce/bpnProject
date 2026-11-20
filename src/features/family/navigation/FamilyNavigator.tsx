import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationBar } from '@/app/components/NavigationBar';

import AddKliqFamilyMemberScreen from '../screens/add-kliq-family-member/AddKliqFamilyMemberScreen';
import KliqFamilyDashboardScreen from '../screens/kliq-family-dashboard/KliqFamilyDashboardScreen';
import KliqFamilyListScreen from '../screens/kliq-family-list/KliqFamilyListScreen';

import { KliqFamilyRoutes } from './routes';
import { FamilyStackParamList } from './types';
const Stack = createNativeStackNavigator<FamilyStackParamList>();

export const FamilyNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, options, route }) => (
          <NavigationBar
            onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
            title={
              typeof options.headerTitle === 'string'
                ? options.headerTitle
                : options.title ?? route.name
            }
          />
        ),
      }}
    >
      <Stack.Screen
        component={KliqFamilyDashboardScreen}
        name={KliqFamilyRoutes.KliqFamilyDashboardScreen}
        options={{ title: 'Kliq Ailem' }}
      />
      <Stack.Screen
        component={KliqFamilyListScreen}
        name={KliqFamilyRoutes.KliqFamilyListScreen}
        options={{ title: 'Kliq Ailem' }}
      />
      <Stack.Screen
        component={AddKliqFamilyMemberScreen}
        name={KliqFamilyRoutes.AddKliqFamilyMemberScreen}
        options={{ title: 'Aile Üyesi Ekle' }}
      />
    </Stack.Navigator>
  );
};
