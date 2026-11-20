import React from 'react';

import { Pressable } from 'react-native';

import { RootRoutes, TabRoutes } from '@/app/navigation/routes';
import { RootTabScreenProps } from '@/app/navigation/types';
import { Text } from '@/shared/components/text';

import { AccountsContainer, Description, Title } from './styles';

const AccountsScreen = ({ navigation }: RootTabScreenProps<typeof TabRoutes.Accounts>) => {
  return (
    <AccountsContainer>
      <Title>Hesaplarım</Title>
      <Description>Banka hesaplarınız burada görüntülenecek</Description>
      <Pressable accessibilityRole="button" onPress={() => navigation.navigate(RootRoutes.Family)} style={{ marginTop: 24, padding: 12 }}>
        <Text>Kliq Ailem</Text>
      </Pressable>
    </AccountsContainer>
  );
};

export default AccountsScreen;
