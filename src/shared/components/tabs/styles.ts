import styled from 'styled-components/native';

export const TabsContainer = styled.View`
  flex: 1;
`;

export const TabBarContainer = styled.View`
  ${({ theme: { normalizeSize, colors } }) => ({
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.primary500,
    borderRadius: normalizeSize(16),
    padding: normalizeSize(4),
  })}
`;

export const TabButton = styled.Pressable`
  flex: 1;
`;

export const TabItemContent = styled.View<{ selected: boolean }>`
  ${({ theme: { normalizeSize, colors }, selected }) => ({
    borderRadius: normalizeSize(12),
    backgroundColor: selected ? colors.background.white : colors.transparent,
    paddingVertical: normalizeSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  })}
`;

export const PagerScrollView = styled.ScrollView`
  ${({ theme: { normalizeSize } }) => ({
    marginTop: normalizeSize(24),
  })}
`;

export const PageContainer = styled.View<{ width: number }>`
  width: ${({ width }) => width}px;
`;

export const FooterContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    marginTop: 'auto',
    paddingTop: normalizeSize(12),
  })}
`;
