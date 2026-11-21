import styled from 'styled-components/native';

export const SliderContainer = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    backgroundColor: colors.background.white,
    paddingVertical: normalizeSize(24),
    borderRadius: normalizeSize(16),
  })}
`;

export const SliderPage = styled.View<{ $width: number }>`
  ${({ $width, theme: { normalizeSize } }) => ({
    width: $width,
    alignItems: 'center',
    paddingHorizontal: normalizeSize(12),
  })}
`;

export const Pagination = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalizeSize(32),
    gap: normalizeSize(8),
  })}
`;

export const DotButton = styled.Pressable<{ $active: boolean }>`
  ${({ theme: { colors, normalizeSize }, $active }) => ({
    padding: normalizeSize(8),
    backgroundColor: $active ? colors.secondary : colors.background.white,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: normalizeSize(2),
    borderColor: colors.secondary,
    borderRadius: normalizeSize(100),
  })}
`;

export const InfoContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    marginTop: normalizeSize(32),
    gap: normalizeSize(12),
  })}
`;

export const Badge = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    backgroundColor: colors.primary500,
    borderRadius: normalizeSize(20),
    paddingHorizontal: normalizeSize(12),
    paddingVertical: normalizeSize(4),
    alignSelf: 'flex-start',
  })}
`;

export const HighlightBox = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    backgroundColor: colors.background.yellow,
    borderRadius: normalizeSize(12),
    padding: normalizeSize(12),
  })}
`;
