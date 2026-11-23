import styled from 'styled-components/native';

export const InfoCardContainer = styled.View<{
  backgroundColor?: string;
}>`
  ${({ theme: { normalizeSize, colors }, backgroundColor }) => ({
    paddingHorizontal: normalizeSize(48),
    paddingVertical: normalizeSize(55),
    backgroundColor: backgroundColor || colors.background.white,
    borderRadius: normalizeSize(16),
    justifyContent: 'center',
    alignItems: 'center',
  })}
`;

export const IconWrapper = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    marginBottom: normalizeSize(12),
    justifyContent: 'center',
    alignItems: 'center',
  })}
`;

export const ContentWrapper = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalizeSize(8),
  })}
`;
