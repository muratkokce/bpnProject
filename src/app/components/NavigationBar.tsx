import React from 'react';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootRoutes, TabRoutes } from '@/app/navigation/routes';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import HomeIcon from '@/assets/icons/home.svg';
import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';

import {
  BackButton,
  HomeButton,
  NavigationBarContainer,
  NavigationBarContent,
  TitleContainer,
} from './styles';

type NavigationBarProps = {
  title: string;
  navigation: NativeStackNavigationProp<any>;
  showHomeIcon?: boolean;
};

export const NavigationBar = ({ title, navigation, showHomeIcon = false }: NavigationBarProps) => {
  const { normalizeSize } = useTheme();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const navigateToAccountsTab = () => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: RootRoutes.MainTabs, params: { screen: TabRoutes.Accounts } }],
    });
  };

  return (
    <NavigationBarContainer>
      <NavigationBarContent>
        {navigation.canGoBack() && (
          <BackButton
            accessibilityLabel="Geri"
            accessibilityRole="button"
            hitSlop={10}
            onPress={handleBack}
          >
            <ArrowLeftIcon height={normalizeSize(24)} width={normalizeSize(24)} />
          </BackButton>
        )}
        <TitleContainer marginLeft={navigation.canGoBack() ? 16 : 40}>
          <Text numberOfLines={1} textAlign="center" variant="title20Bold">
            {title}
          </Text>
        </TitleContainer>
        {showHomeIcon && (
          <HomeButton
            accessibilityLabel="Ana Sayfa"
            accessibilityRole="button"
            hitSlop={10}
            onPress={navigateToAccountsTab}
          >
            <HomeIcon height={normalizeSize(24)} width={normalizeSize(24)} />
          </HomeButton>
        )}
      </NavigationBarContent>
    </NavigationBarContainer>
  );
};
