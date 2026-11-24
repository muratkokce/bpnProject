import styled from 'styled-components/native';

export const ModalOverlay = styled.Pressable`
  ${({ theme: { colors } }) => ({
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
  })}
`;

export const PickerContainer = styled.View`
  ${({ theme: { colors } }) => ({
    backgroundColor: colors.background.green,
  })}
`;

export const PickerHeader = styled.View`
  ${({ theme: { colors, normalizeSize } }) => ({
    alignItems: 'center',
    backgroundColor: colors.background.green50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: normalizeSize(16),
    paddingTop: normalizeSize(8),
    paddingBottom: normalizeSize(16),
  })}
`;

export const DoneButton = styled.Pressable`
  ${() => ({})}
`;

export const DatePickerWrapper = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    height: normalizeSize(216),
    justifyContent: 'center',
    alignItems: 'center',
  })}
`;
