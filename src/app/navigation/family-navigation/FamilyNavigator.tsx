import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationBar } from '@/app/components/NavigationBar';
import AddKliqFamilyMemberScreen from '@/features/family/screens/add-kliq-family-member/AddKliqFamilyMemberScreen';
import KliqFamilyListScreen from '@/features/family/screens/kliq-family-list/KliqFamilyListScreen';
import KliqFamilyListDetailScreen from '@/features/family/screens/kliq-family-list-detail/KliqFamilyListDetailScreen';
import KliqFamilyOnboardingScreen from '@/features/family/screens/kliq-family-onboarding/KliqFamilyOnboardingScreen';

import { useFamilyInitialRoute } from './hooks/useFamilyInitialRoute';
import { KliqFamilyRoutes } from './routes';
import { FamilyStackParamList } from './types';
const Stack = createNativeStackNavigator<FamilyStackParamList>();

export const FamilyNavigator = () => {
  const initialRoute = useFamilyInitialRoute();

  if (!initialRoute) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
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
      <Stack.Screen
        component={KliqFamilyListDetailScreen}
        name={KliqFamilyRoutes.KliqFamilyListDetailScreen}
        options={({ route }) => ({
          title: route.params?.child?.fullName || 'Çocuk Detayı',
        })}
      />
    </Stack.Navigator>
  );
};
