import styled from 'styled-components/native';

export const Container = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    backgroundColor: colors.background.white,
    borderRadius: normalizeSize(16),
    paddingHorizontal: normalizeSize(12),
    paddingVertical: normalizeSize(16),
    marginBottom: normalizeSize(8),
    flexDirection: 'row',
    alignItems: 'center',
  })}
`;

export const IconCircle = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    width: normalizeSize(48),
    height: normalizeSize(48),
    borderRadius: normalizeSize(24),
    backgroundColor: colors.opacity.blue08,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalizeSize(8),
  })}
`;

export const ContentContainer = styled.View`
  ${() => ({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  })}
`;

export const LeftContent = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flex: 1,
    gap: normalizeSize(4),
  })}
`;

export const RightContent = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    alignItems: 'flex-end',
    maxWidth: '50%',
    marginLeft: normalizeSize(12),
    gap: normalizeSize(4),
  })}
`;
