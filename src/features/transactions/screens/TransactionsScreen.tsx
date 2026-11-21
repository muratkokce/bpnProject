import React from 'react';

import { TabRoutes } from '@/app/navigation/routes';
import type { RootTabScreenProps } from '@/app/navigation/types';
import { MenuItem } from '@/shared/components/menu-item';
import { Screen } from '@/shared/components/screen/Screen';
import { showToast } from '@/shared/utils';

import { TransactionMenuItems } from '../constants';

import { MenuItemWrapper } from './styles';

const TransactionsScreen = ({ navigation }: RootTabScreenProps<typeof TabRoutes.Transactions>) => {
  return (
    <Screen style={{ paddingBottom: 0 }}>
      {TransactionMenuItems.map(({ title, icon: Icon, isNewMenu, routeScreen }) => (
        <MenuItemWrapper key={title}>
          <MenuItem
            icon={<Icon />}
            isNewMenu={isNewMenu}
            onPress={() => {
              if (routeScreen) {
                navigation.navigate(routeScreen);
              } else {
                showToast({ message: 'Bu işlem henüz kullanılamıyor.', type: 'info', title });
              }
            }}
            title={title}
          />
        </MenuItemWrapper>
      ))}
    </Screen>
  );
};

export default TransactionsScreen;
