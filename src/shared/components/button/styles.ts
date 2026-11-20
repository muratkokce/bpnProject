import styled from 'styled-components/native';

export const ButtonContainer = styled.Pressable<{
  disabled?: boolean;
  backgroundColor?: string;
  paddingVertical?: number;
  borderRadius: number;
}>`
  ${({
    theme: { normalizeSize, colors },
    disabled,
    backgroundColor,
    paddingVertical,
    borderRadius,
  }) => ({
    width: '100%',
    paddingVertical: normalizeSize(paddingVertical || 14),
    paddingHorizontal: normalizeSize(16),
    backgroundColor: disabled ? colors.disabled : backgroundColor || colors.primary500,
    borderRadius: normalizeSize(borderRadius),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
  })}
`;
