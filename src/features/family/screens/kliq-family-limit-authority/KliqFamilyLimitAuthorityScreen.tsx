import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import EmptyIcon from '@/assets/icons/info/empty.svg';
import { useTheme } from '@/assets/theme';
import { useFamilyLimitAuthorityStore } from '@/core/store';
import { InfoCard } from '@/shared/components/info-card';
import { Screen } from '@/shared/components/screen';
import { Tabs, TabsItem } from '@/shared/components/tabs';

import { useFamilyLimitAuthority } from '../hooks/useFamilyLimitAuthority';

import { AccountPermissions, CardPermissions } from './components';
import { DetailContainer } from './styles';

const KliqFamilyLimitAuthorityScreen = ({
  route,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyLimitAuthorityScreen>) => {
  const { child } = route.params;
  const { normalizeSize } = useTheme();
  const insets = useSafeAreaInsets();

  const { data: storeData, isLoading } = useFamilyLimitAuthorityStore();
  useFamilyLimitAuthority({ autoFetch: !storeData });

  const limitAuthority = storeData?.permissionsByChild[child.id];
  const tabs = limitAuthority?.tabs || [];

  const accountTab = tabs.find((tab) => tab.tabId === 'ACCOUNT_PERMISSIONS');
  const cardTab = tabs.find((tab) => tab.tabId === 'CARD_PERMISSIONS');

  const tabItems: TabsItem[] = [
    {
      tabId: 'account-permissions',
      title: accountTab?.tabTitle ?? 'Hesap Yetkileri',
      content: <AccountPermissions childId={child.id} tab={accountTab} />,
    },
    {
      tabId: 'card-permissions',
      title: cardTab?.tabTitle ?? 'Kart Yetkileri',
      content: <CardPermissions childId={child.id} tab={cardTab} />,
    },
  ];

  return (
    <Screen isScreenLoading={isLoading}>
      <DetailContainer insetBottom={insets.bottom}>
        {tabs.length > 0 ? (
          <Tabs items={tabItems} />
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
