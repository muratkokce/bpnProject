import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import EmptyIcon from '@/assets/icons/info/empty.svg';
import { useTheme } from '@/assets/theme';
import { InfoCard } from '@/shared/components/info-card';
import { Screen } from '@/shared/components/screen';

import { useFamilyLimitAuthority } from '../hooks/useFamilyLimitAuthority';

import { LimitAuthorityList } from './components/limit-authority-list';
import { DetailContainer } from './styles';

const KliqFamilyLimitAuthorityScreen = ({
  route,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyLimitAuthorityScreen>) => {
  const { child } = route.params;
  const { normalizeSize } = useTheme();
  const insets = useSafeAreaInsets();

  const { data, isLoading } = useFamilyLimitAuthority();

  const limitAuthority = data?.permissionsByChild[child.id];
  const tabs = limitAuthority?.tabs || [];

  return (
    <Screen isScreenLoading={isLoading}>
      <DetailContainer insetBottom={insets.bottom}>
        {tabs.length > 0 ? (
          <LimitAuthorityList items={tabs} />
        ) : (
          <InfoCard
            description="Bu çocuk için limit ve yetki işlemi bulunmuyor."
            icon={<EmptyIcon height={normalizeSize(128)} width={normalizeSize(187)} />}
            text="İşlem Bulunamadı"
          />
        )}
      </DetailContainer>
    </Screen>
  );
};

export default KliqFamilyLimitAuthorityScreen;
