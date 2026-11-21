import React from 'react';

import { Text } from '../text';

import { ButtonContainer } from './styles';
import { ButtonProps } from './types';

const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      text,
      onPress,
      disabled = false,
      backgroundColor,
      textColor,
      textVariant = 'titleSmall',
      paddingVertical = 17,
      borderRadius = 12,
      textProps,
      ...props
    },
    ref
  ) => {
    return (
      <ButtonContainer
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        disabled={disabled}
        onPress={onPress}
        paddingVertical={paddingVertical}
        ref={ref}
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
