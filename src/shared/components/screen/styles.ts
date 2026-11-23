import styled from 'styled-components/native';

export const ScreenContainer = styled.View<{ insetTop: number; insetBottom: number }>`
  ${({ theme: { normalizeSize, colors }, insetBottom }) => ({
    flex: 1,
    paddingHorizontal: normalizeSize(24),
    paddingBottom: insetBottom,
    backgroundColor: colors.background.purple,
  })}
`;

export const ScreenContent = styled.View<{ hasButton: boolean; insetBottom: number }>`
  ${({ theme: { normalizeSize }, hasButton, insetBottom }) => ({
    flexGrow: 1,
    paddingBottom: hasButton ? insetBottom + normalizeSize(55) : insetBottom,
  })}
`;

export const ScreenScrollView = styled.ScrollView`
  ${({ theme: { normalizeSize } }) => ({
    flex: 1,
    paddingTop: normalizeSize(16),
  })}
`;

export const ButtonContainer = styled.View<{ insetBottom: number }>`
  ${({ theme: { normalizeSize, colors }, insetBottom }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: normalizeSize(24),
    paddingBottom: insetBottom + normalizeSize(16),
    backgroundColor: colors.background.purple,
    gap: normalizeSize(12),
  })}
`;

export const FooterIconsContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalizeSize(12),
  })}
`;

export const ButtonGradient = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    position: 'absolute',
    top: -normalizeSize(42),
    left: 0,
    right: 0,
    height: normalizeSize(42),
  })}
`;
