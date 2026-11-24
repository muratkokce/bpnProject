import styled from 'styled-components/native';

export const AccountsContainer = styled.View`
  ${({ theme: { colors } }) => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.purple,
  })}
`;

export const ButtonContainer = styled.Pressable`
  ${({ theme: { normalizeSize } }) => ({
    marginTop: normalizeSize(12),
  })}
`;
