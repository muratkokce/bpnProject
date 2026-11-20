import styled from 'styled-components/native';

export const TabBarContainer = styled.View`
  ${({ theme: { normalizeSize, colors, insets } }) => ({
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    paddingHorizontal: normalizeSize(16),
    paddingBottom: insets.bottom,
    borderTopLeftRadius: normalizeSize(12),
    borderTopRightRadius: normalizeSize(12),
    justifyContent: 'space-between',
  })}
`;

export const TabBarContent = styled.Pressable`
  ${({ theme: { normalizeSize } }) => ({
    padding: normalizeSize(12),
    alignItems: 'center',
  })}
`;
