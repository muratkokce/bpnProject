import styled from 'styled-components/native';

export const CardsContainer = styled.View`
  ${({ theme: { colors } }) => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.purple,
  })}
`;
