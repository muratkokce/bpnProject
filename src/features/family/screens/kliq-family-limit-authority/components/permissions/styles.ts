import styled from 'styled-components/native';

export const PermissionsContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flex: 1,
    gap: normalizeSize(8),
  })}
`;

export const PermissionsContentContainer = styled.View`
  ${({ theme: { normalizeSize, colors } }) => ({
    backgroundColor: colors.background.white,
    borderRadius: normalizeSize(16),
    paddingHorizontal: normalizeSize(16),
    paddingVertical: normalizeSize(4),
    gap: normalizeSize(12),
  })}
`;

export const MasterToggleRow = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flexDirection: 'row',
    gap: normalizeSize(12),
    paddingVertical: normalizeSize(12),
    borderRadius: normalizeSize(8),
  })}
`;

export const ContentColumn = styled.View`
  ${() => ({
    flex: 1,
  })}
`;

export const PermissionItemContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    marginVertical: normalizeSize(4),
  })}
`;

export const PermissionRow = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flexDirection: 'row',
    gap: normalizeSize(12),
    paddingVertical: normalizeSize(6),
    borderRadius: normalizeSize(8),
  })}
`;
