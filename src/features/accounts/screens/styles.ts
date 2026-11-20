import styled from 'styled-components/native';

export const AccountsContainer = styled.View`
  ${({ theme: { colors } }) => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.purple,
  })}
`;

export const Title = styled.Text`
  ${() => ({
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  })}
`;
export const Description = styled.Text`
  ${() => ({
    fontSize: 16,
    color: '#666',
  })}
`;
