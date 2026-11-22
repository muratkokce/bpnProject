import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from 'react-native';

import { RootRoutes, TabRoutes } from '@/app/navigation/routes';
import { RootTabScreenProps } from '@/app/navigation/types';
import { Text } from '@/shared/components/text';
import { showToast } from '@/shared/utils';
import { FAMILY_ONBOARDING_COMPLETED_KEY } from '@/storage';

import { AccountsContainer, Description, Title } from './styles';

const AccountsScreen = ({ navigation }: RootTabScreenProps<typeof TabRoutes.Accounts>) => {
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
      <Title>Hesaplarım</Title>
      <Description>Banka hesaplarınız burada görüntülenecek</Description>
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate(RootRoutes.Family)}
        style={{ marginTop: 24, padding: 12 }}
      >
        <Text>Kliq Ailem</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={clearFamilyOnboarding}
        style={{ marginTop: 12, padding: 12 }}
      >
        <Text>Belleği Temizle</Text>
      </Pressable>
    </AccountsContainer>
  );
};

export default AccountsScreen;
