import React from 'react';

import { useTheme } from '@/assets/theme';

import { TEXT_VARIANTS } from './constants';
import { StyledText } from './styles';
import type { TextProps, TextVariant } from './types';

const Text = React.forwardRef<any, TextProps>(
  (
    {
      children,
      variant = 'bodyBold',
      color,
      fontSize,
      fontWeight,
      textAlign = 'auto',
      lineHeight,
      letterSpacing,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();
    const variantStyles = TEXT_VARIANTS[variant];

    return (
      <StyledText
        color={color ?? colors.text.primary}
        fontSize={fontSize ?? variantStyles?.fontSize ?? 14}
        fontWeight={fontWeight ?? variantStyles?.fontWeight ?? 'normal'}
        letterSpacing={letterSpacing ?? variantStyles?.letterSpacing}
        // lineHeight={lineHeight ?? variantStyles?.lineHeight}
        ref={ref}
        textAlign={textAlign}
        {...props}
      >
        {children}
      </StyledText>
    );
  }
);

export { Text, TEXT_VARIANTS };
export type { TextProps, TextVariant };
