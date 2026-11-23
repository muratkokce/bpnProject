import React from 'react';

import { Text } from '../text';

import { ButtonContainer } from './styles';
import { ButtonProps } from './types';

const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      text,
      disabled = false,
      textColor,
      textVariant = 'titleSmall',
      paddingVertical = 17,
      borderRadius = 12,
      borderColor,
      textProps,
      variant = 'primary',
      ...props
    },
    ref
  ) => {
    return (
      <ButtonContainer
        borderColor={borderColor}
        borderRadius={borderRadius}
        disabled={disabled}
        paddingVertical={paddingVertical}
        ref={ref}
        variant={variant}
        {...props}
      >
        <Text color={textColor} textAlign="center" variant={textVariant} {...textProps}>
          {text}
        </Text>
      </ButtonContainer>
    );
  }
);

export default Button;
