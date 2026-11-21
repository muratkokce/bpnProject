import styled from 'styled-components/native';

export const MenuItemWrapper = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flex: 1,
    marginBottom: normalizeSize(8),
  })}
`;
