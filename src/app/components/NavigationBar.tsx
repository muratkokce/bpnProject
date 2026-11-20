import React from 'react';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';

import { BackButton, NavigationBarContainer, NavigationBarContent, TitleContainer } from './styles';

type NavigationBarProps = {
  title: string;
  onBack?: () => void;
};

export const NavigationBar = ({ title, onBack }: NavigationBarProps) => {
  const { normalizeSize } = useTheme();

  return (
    <NavigationBarContainer>
      <NavigationBarContent>
        {onBack && (
          <BackButton
            accessibilityLabel="Geri"
            accessibilityRole="button"
            hitSlop={10}
            onPress={onBack}
          >
            <ArrowLeftIcon height={normalizeSize(24)} width={normalizeSize(24)} />
          </BackButton>
        )}
        <TitleContainer marginLeft={onBack ? 16 : 40}>
          <Text numberOfLines={1} textAlign="center" variant="title20Bold">
            {title}
          </Text>
        </TitleContainer>
      </NavigationBarContent>
    </NavigationBarContainer>
  );
};
