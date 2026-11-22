import styled from 'styled-components/native';

import { Text, TEXT_VARIANTS } from '@/shared/components/text';

export const getPhoneTextStyle = (normalizeSize: (size: number) => number, color: string) => ({
  color,
  fontFamily: 'Urbanist',
  fontSize: normalizeSize(TEXT_VARIANTS.bodyMedium.fontSize),
  fontWeight: TEXT_VARIANTS.bodyMedium.fontWeight,
  letterSpacing: TEXT_VARIANTS.bodyMedium.letterSpacing,
});

export const InputRow = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalizeSize(8),
  })}
`;

export const CountryButton = styled.Pressable`
  ${({ theme: { normalizeSize }, disabled }) => ({
    width: normalizeSize(112),
    opacity: disabled ? 0.6 : 1,
  })}
`;

export const PhoneField = styled.View`
  flex: 1;
  min-width: 0;
`;

export const ModalContainer = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    flex: 1,
    justifyContent: 'center',
    padding: normalizeSize(24),
    backgroundColor: colors.opacity.overlay30,
  })}
`;

export const ModalContent = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    backgroundColor: colors.background.white,
    borderRadius: normalizeSize(12),
    padding: normalizeSize(24),
  })}
`;

export const ModalTitle = styled(Text).attrs({ variant: 'titleSmall' })`
  ${({ theme: { normalizeSize } }) => ({
    marginBottom: normalizeSize(16),
  })}
`;

export const CountryOption = styled.Pressable`
  ${({ theme: { normalizeSize } }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalizeSize(8),
  })}
`;

export const CountryOptionLabel = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalizeSize(8),
    flex: 1,
    minWidth: 0,
  })}
`;
