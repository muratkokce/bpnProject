import React from 'react';

import { Alert } from 'react-native';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { useTheme } from '@/assets/theme';
import ListItem from '@/shared/components/list-item/ListItem';
import { Screen } from '@/shared/components/screen/Screen';
import { Text } from '@/shared/components/text';
import { formatIban } from '@/shared/utils/ibanHelpers';

import FamilyAvatar from '../kliq-family-list/components/family-avatar/FamilyAvatar';

import {
  KliqFamilyAccountAndCardSettingsMenuItems,
  KliqFamilyFinancialSettingsMenuItems,
} from './constants';
import { InfoCardContainer, InfoCardContentContainer, AccountCard } from './styles';

const KliqFamilyListDetailScreen = ({
  navigation,
  route,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyListDetailScreen>) => {
  const { child } = route.params;
  const { normalizeSize } = useTheme();

  return (
    <Screen style={{ paddingBottom: 0 }}>
      <InfoCardContainer>
        <InfoCardContentContainer>
          <FamilyAvatar child={child} style={{ marginRight: normalizeSize(8) }} />
          <AccountCard>
            <Text>{formatIban(child.account?.iban ?? '')}</Text>
            <Text>Bakiye: {child.account?.formattedBalance}</Text>
          </AccountCard>
        </InfoCardContentContainer>
      </InfoCardContainer>

      <Text style={{ marginBottom: normalizeSize(8), marginTop: normalizeSize(24) }}>
        Hesap ve Kart Ayarları
      </Text>
      {KliqFamilyAccountAndCardSettingsMenuItems.map(({ title, routeScreen }, index) => (
        <ListItem
          key={title}
          onPress={() => {
            if (routeScreen) {
              navigation.navigate(routeScreen as any);
            } else {
              Alert.alert(title, 'Bu işlem henüz kullanılamıyor.');
            }
          }}
          style={{
            borderTopLeftRadius: normalizeSize(index === 0 ? 12 : 0),
            borderTopRightRadius: normalizeSize(index === 0 ? 12 : 0),
            borderBottomLeftRadius: normalizeSize(
              index === KliqFamilyAccountAndCardSettingsMenuItems.length - 1 ? 12 : 0
            ),
            borderBottomRightRadius: normalizeSize(
              index === KliqFamilyAccountAndCardSettingsMenuItems.length - 1 ? 12 : 0
            ),
          }}
          title={title}
        />
      ))}

      <Text style={{ marginBottom: normalizeSize(8), marginTop: normalizeSize(24) }}>
        Finansal Ayarlar
      </Text>
      {KliqFamilyFinancialSettingsMenuItems.map(({ title, routeScreen }) => (
        <ListItem
          key={title}
          onPress={() => {
            if (routeScreen) {
              navigation.navigate(routeScreen as any);
            } else {
              Alert.alert(title, 'Bu işlem henüz kullanılamıyor.');
            }
          }}
          title={title}
        />
      ))}
    </Screen>
  );
};

export default KliqFamilyListDetailScreen;
