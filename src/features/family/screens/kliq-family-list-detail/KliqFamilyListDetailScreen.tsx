import React from 'react';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { useTheme } from '@/assets/theme';
import ListItem from '@/shared/components/list-item/ListItem';
import { Screen } from '@/shared/components/screen/Screen';
import { Text } from '@/shared/components/text';
import { showToast } from '@/shared/utils';
import { formatIban } from '@/shared/utils';

import FamilyAvatar from '../kliq-family-list/components/family-avatar/FamilyAvatar';

import { useKliqFamilyListDetailMenuItems } from './hooks/useKliqFamilyListDetailMenuItems';
import { InfoCardContainer, InfoCardContentContainer, AccountCard } from './styles';

const KliqFamilyListDetailScreen = ({
  navigation,
  route,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyListDetailScreen>) => {
  const { child } = route.params;
  const { normalizeSize, colors } = useTheme();
  const { accountAndCardMenuItems, financialSettingsMenuItems } = useKliqFamilyListDetailMenuItems(
    child,
    navigation
  );

  const showUnavailableAlert = (title: string) => () =>
    showToast({ message: 'Bu işlem henüz kullanılamıyor.', type: 'info', title });

  return (
    <Screen
      primaryButton={{
        text: 'Hesabı Kapat',
        onPress: showUnavailableAlert('Hesabı Kapat'),
        variant: 'secondary',
        textColor: colors.error,
      }}
      style={{ paddingBottom: 0 }}
    >
      <InfoCardContainer>
        <InfoCardContentContainer>
          <FamilyAvatar child={child} style={{ marginRight: normalizeSize(8) }} />
          <AccountCard>
            <Text>{formatIban(child.account?.iban ?? '')}</Text>
            <Text>Bakiye: {child.account?.formattedBalance}</Text>
          </AccountCard>
        </InfoCardContentContainer>
      </InfoCardContainer>
      <ListItem children={accountAndCardMenuItems} listTitle="Hesap ve Kart Ayarları" />
      <ListItem children={financialSettingsMenuItems} listTitle="Finansal Ayarlar" />
    </Screen>
  );
};

export default KliqFamilyListDetailScreen;
