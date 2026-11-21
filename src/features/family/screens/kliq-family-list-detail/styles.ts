import styled from 'styled-components/native';

export const InfoCardContainer = styled.View`
  ${({ theme: { normalizeSize, colors } }) => ({
    borderRadius: normalizeSize(8),
    backgroundColor: colors.background.white,
    padding: normalizeSize(12),
    alignItems: 'center',
  })}
`;

export const InfoCardContentContainer = styled.View`
  ${({ theme: { normalizeSize, colors } }) => ({
    width: '100%',
    borderRadius: normalizeSize(8),
    backgroundColor: colors.opacity.green08,
    padding: normalizeSize(12),
    alignItems: 'center',
    flexDirection: 'row',
  })}
`;
export const AccountCard = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flex: 1,
    gap: normalizeSize(2),
  })}
`;
