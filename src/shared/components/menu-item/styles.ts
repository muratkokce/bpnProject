import styled from 'styled-components/native';

export const MenuItemContainer = styled.Pressable`
  ${({ theme: { colors, normalizeSize } }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalizeSize(16),
    backgroundColor: colors.background.white,
    borderRadius: normalizeSize(12),
  })}
`;

export const MenuItemContent = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalizeSize(8),
  })}
`;

export const NewBadge = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    backgroundColor: colors.background.yellow,
    borderRadius: normalizeSize(4),
    marginRight: normalizeSize(12),
    paddingHorizontal: normalizeSize(4),
    paddingVertical: normalizeSize(2),
  })}
`;
