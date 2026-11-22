import React from 'react';

import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { useTheme } from '@/assets/theme';

import { ButtonGradient } from '../styles';

const ButtonBackgroundGradient = () => {
  const { colors } = useTheme();

  return (
    <ButtonGradient pointerEvents="none">
      <Svg height="100%" width="100%">
        <Defs>
          <LinearGradient id="buttonBackgroundGradient" x1="0" x2="0" y1="0" y2="1">
            <Stop offset="7.08%" stopColor={colors.background.purple} stopOpacity={0} />
            <Stop offset="26.64%" stopColor={colors.background.purple} stopOpacity={0.642071} />
            <Stop offset="65.76%" stopColor={colors.background.purple} stopOpacity={1} />
          </LinearGradient>
        </Defs>
        <Rect fill="url(#buttonBackgroundGradient)" height="100%" width="100%" />
      </Svg>
    </ButtonGradient>
  );
};

export { ButtonBackgroundGradient };
