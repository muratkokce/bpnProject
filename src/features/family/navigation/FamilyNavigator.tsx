import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationBar } from '@/app/components/NavigationBar';
import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyStackParamList } from '@/app/navigation/family-navigation/types';

import AddKliqFamilyMemberScreen from '../screens/add-kliq-family-member/AddKliqFamilyMemberScreen';
import KliqFamilyListScreen from '../screens/kliq-family-list/KliqFamilyListScreen';
import KliqFamilyOnboardingScreen from '../screens/kliq-family-onboarding/KliqFamilyOnboardingScreen';

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
        component={KliqFamilyOnboardingScreen}
        name={KliqFamilyRoutes.KliqFamilyOnboardingScreen}
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
