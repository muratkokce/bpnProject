import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import EmptyFamilyIcon from '@/assets/icons/family-dashboard/empty-family.svg';
import { useTheme } from '@/assets/theme';
import { Slider } from '@/features/family/screens/kliq-family-dashboard/components/slider';
import { InfoCard } from '@/shared/components/info-card';
import { Screen } from '@/shared/components/screen';
import { Text } from '@/shared/components/text';

import { KliqFamilyDashboardItems } from './constants';

const KliqFamilyDashboardScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyDashboardScreen>) => {
  const insets = useSafeAreaInsets();

  const { normalizeSize } = useTheme();
  return (
    <Screen
      primaryButton={{
        text: 'Kliq Aileme Ekle',
        onPress: () => navigation.navigate(KliqFamilyRoutes.AddKliqFamilyMemberScreen),
      }}
      style={{ paddingBottom: insets.bottom * 2 }}
    >
      <Slider items={KliqFamilyDashboardItems} />
      <Text style={{ marginVertical: normalizeSize(16) }} variant="captionBold">
        Kliq Ailem
      </Text>

      <InfoCard
        description="Velisi/vasisi olduğun 18 yaşından küçük Kliq Ailem üyeleri burada listelenecek."
        icon={<EmptyFamilyIcon height={normalizeSize(185)} width={normalizeSize(188)} />}
        text="Henüz Aile Üyesi Eklemedin"
      />
    </Screen>
  );
};

export default KliqFamilyDashboardScreen;
