import styled from 'styled-components/native';

export const DetailContainer = styled.View<{ insetBottom: number }>`
  ${({ theme: { normalizeSize, colors }, insetBottom }) => ({
    padding: normalizeSize(24),
    backgroundColor: colors.background.white,
    borderRadius: normalizeSize(8),
    marginBottom: insetBottom * 5,
  })}
`;

export const InfoRow = styled.View<{ isLast?: boolean }>`
  ${({ theme: { normalizeSize }, isLast }) => ({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalizeSize(isLast ? 32 : 12),
  })}
`;

export const InfoLeftLabelContainer = styled.View`
  ${() => ({
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  })}
`;

export const InfoRightLabelContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: normalizeSize(32),
  })}
`;
