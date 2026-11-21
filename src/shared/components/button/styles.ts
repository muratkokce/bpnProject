import styled from 'styled-components/native';

import { ButtonContainerProps } from './types';

export const ButtonContainer = styled.Pressable<ButtonContainerProps>`
  ${({
    theme: { normalizeSize, colors },
    disabled,
    variant,
    backgroundColor = variant === 'primary' ? colors.primary500 : colors.background.white,
    paddingVertical,
    borderRadius = 12,
  }) => ({
    width: '100%',
    paddingVertical: normalizeSize(paddingVertical || 14),
    paddingHorizontal: normalizeSize(16),
    backgroundColor: disabled ? colors.disabled : backgroundColor || colors.primary500,
    borderRadius: normalizeSize(borderRadius),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
    borderWidth: variant === 'secondary' ? 1 : 0,
    borderColor: variant === 'secondary' ? colors.error : 'transparent',
  })}
`;
