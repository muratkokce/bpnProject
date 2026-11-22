import styled from 'styled-components/native';

export const LoadingContainer = styled.View`
  ${({ theme: { colors } }) => ({
    alignItems: 'center',
    backgroundColor: colors.opacity.overlay30,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  })}
`;
