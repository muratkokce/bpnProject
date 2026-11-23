import styled from 'styled-components/native';

export const MainTabHeaderContainer = styled.View`
  ${({ theme: { colors, insets } }) => ({
    backgroundColor: colors.background.secondary,
    paddingTop: insets.top,
  })}
`;

export const MainTabHeaderContent = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    padding: normalizeSize(16),
    justifyContent: 'center',
    alignItems: 'center',
  })}
`;

export const NavigationBarContainer = styled.View`
  ${({ theme: { colors, insets } }) => ({
    backgroundColor: colors.background.purple,
    paddingTop: insets.top,
  })}
`;

export const NavigationBarContent = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    height: normalizeSize(60),
    paddingHorizontal: normalizeSize(16),
    flexDirection: 'row',
    alignItems: 'center',
  })}
`;

export const BackButton = styled.Pressable`
  ${({ theme: { normalizeSize } }) => ({
    width: normalizeSize(24),
    height: normalizeSize(24),
  })}
`;

export const HomeButton = styled.Pressable`
  ${({ theme: { normalizeSize } }) => ({
    width: normalizeSize(24),
    height: normalizeSize(24),
  })}
`;

export const TitleContainer = styled.View<{ marginLeft: number }>`
  ${({ theme: { normalizeSize }, marginLeft }) => ({
    flex: 1,
    marginRight: normalizeSize(40),
    marginLeft: normalizeSize(marginLeft),
  })}
`;
