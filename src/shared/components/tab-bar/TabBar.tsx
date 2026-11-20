import React from 'react';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SvgProps } from 'react-native-svg';

import { TabRoutes } from '@/app/navigation/routes';
import AccountsIcon from '@/assets/icons/accounts.svg';
import CardsIcon from '@/assets/icons/cards.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';


import { TabBarContainer, TabBarContent } from './styles';

const tabs: Record<string, { label: string; Icon: React.ComponentType<SvgProps> }> = {
  [TabRoutes.Accounts]: { label: 'Hesaplarım', Icon: AccountsIcon },
  [TabRoutes.Cards]: { label: 'Kartlarım', Icon: CardsIcon },
  [TabRoutes.Transactions]: { label: 'İşlemler', Icon: MenuIcon },
};

export const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { normalizeSize, colors } = useTheme();

  return (
    <TabBarContainer>
      {state.routes.map((route, index) => {
        const tab = tabs[route.name];
        if (!tab) return null;

        const focused = state.index === index;
        const color = focused ? colors.primary500 : colors.inactive;
        const Icon = tab.Icon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TabBarContent
            accessibilityLabel={tab.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            key={route.key}
            onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
            onPress={onPress}
          >
            <Icon color={color} height={normalizeSize(24)} width={normalizeSize(24)} />
            <Text style={{ color, fontSize: normalizeSize(12), marginTop: normalizeSize(4) }}>
              {tab.label}
            </Text>
          </TabBarContent>
        );
      })}
    </TabBarContainer>
  );
};
