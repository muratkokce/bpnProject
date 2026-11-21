import React from 'react';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { useChildrenData } from '@/features/family/screens/hooks/useChildrenStore';
import { Screen } from '@/shared/components/screen';
import { Text } from '@/shared/components/text';

import { KliqFamilyListItems } from './components/kliq-family-list-items/KliqFamilyListItems';

const KliqFamilyListScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyListScreen>) => {
  const { data, isLoading } = useChildrenData();

  const navigateToAddMember = () => navigation.navigate(KliqFamilyRoutes.AddKliqFamilyMemberScreen);

  if (isLoading) {
    return null;
  }

  const children = data?.registeredChildren || [];

  return (
    <Screen
      primaryButton={{
        text: 'Kliq Aileme Ekle',
        onPress: navigateToAddMember,
      }}
    >
      <Text variant="captionBold">Kliq Ailem</Text>
      <KliqFamilyListItems children={children} />
    </Screen>
  );
};

export default KliqFamilyListScreen;
