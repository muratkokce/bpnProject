import styled from 'styled-components/native';

export const ModalOverlay = styled.View<{ isVisible: boolean }>`
  ${({ theme: { colors, normalizeSize }, isVisible }) => ({
    alignItems: 'center',
    backgroundColor: colors.opacity.overlay60,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? 'auto' : 'none',
    padding: normalizeSize(16),
  })}
`;

export const ModalContainer = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    backgroundColor: colors.background.white,
    borderRadius: normalizeSize(16),
    paddingTop: normalizeSize(40),
    paddingBottom: normalizeSize(32),
    paddingHorizontal: normalizeSize(32),
    width: '100%',
    alignItems: 'center',
  })}
`;

export const IconContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    marginBottom: normalizeSize(24),
    width: '100%',
    alignItems: 'center',
  })}
`;

export const ContentContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    width: '100%',
    alignItems: 'center',
    marginBottom: normalizeSize(24),
  })}
`;

export const ButtonsContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    width: '100%',
    gap: normalizeSize(24),
    paddingHorizontal: normalizeSize(22.5),
  })}
`;
