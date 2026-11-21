import React from 'react';

import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';

import { MainTabHeaderContainer, MainTabHeaderContent } from './styles';

type MainTabHeaderProps = {
  title: string;
};

export const MainTabHeader = ({ title }: MainTabHeaderProps) => {
  const { colors } = useTheme();

  return (
    <MainTabHeaderContainer>
      <MainTabHeaderContent>
        <Text
          color={colors.background.white}
          numberOfLines={1}
          textAlign="center"
          variant="titleLarge"
        >
          {title}
        </Text>
      </MainTabHeaderContent>
    </MainTabHeaderContainer>
  );
};
