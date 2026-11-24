import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TabRoutes } from '@/app/navigation/routes';
import { RootTabScreenProps } from '@/app/navigation/types';
import { Text } from '@/shared/components/text';
import { showToast } from '@/shared/utils';
import { FAMILY_ONBOARDING_COMPLETED_KEY } from '@/storage';

import { AccountsContainer, ButtonContainer } from './styles';

const AccountsScreen = ({}: RootTabScreenProps<typeof TabRoutes.Accounts>) => {
  const clearFamilyOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(FAMILY_ONBOARDING_COMPLETED_KEY);
      showToast({ message: 'Kliq Ailem belleği temizlendi.', type: 'success' });
    } catch {
      showToast({ message: 'Bellek temizlenemedi. Lütfen tekrar dene.', type: 'error' });
    }
  };

  return (
    <AccountsContainer>
      <Text variant="bodyBold">Hesaplarım</Text>
      <Text variant="bodyMedium">Banka hesaplarınız burada görüntülenecek</Text>
      <ButtonContainer accessibilityRole="button" onPress={clearFamilyOnboarding}>
        <Text>Belleği Temizle</Text>
      </ButtonContainer>
    </AccountsContainer>
  );
};

export default AccountsScreen;
