import styled from 'styled-components/native';

export const ToggleContainer = styled.Pressable`
  ${({ theme: { normalizeSize } }) => ({
    width: normalizeSize(44),
    height: normalizeSize(24),
    borderRadius: normalizeSize(22),
    justifyContent: 'center',
  })}
`;

export const ToggleTrack = styled.View<{ isEnabled: boolean }>`
  ${({ theme: { normalizeSize, colors }, isEnabled }) => ({
    flex: 1,
    borderRadius: normalizeSize(14),
    backgroundColor: isEnabled ? colors.primary500 : colors.border,
    justifyContent: 'center',
    padding: normalizeSize(2),
  })}
`;

export const ToggleThumb = styled.View<{ isEnabled: boolean }>`
  ${({ theme: { normalizeSize, colors }, isEnabled }) => ({
    width: normalizeSize(20),
    height: normalizeSize(20),
    borderRadius: normalizeSize(10),
    backgroundColor: colors.background.white,
    alignSelf: isEnabled ? 'flex-end' : 'flex-start',
  })}
`;
