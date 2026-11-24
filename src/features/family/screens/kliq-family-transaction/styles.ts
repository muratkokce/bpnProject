import styled from 'styled-components/native';

export const FilterContainer = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    gap: normalizeSize(16),
    marginBottom: normalizeSize(24),
  })}
`;

export const DateRow = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flexDirection: 'row',
    gap: normalizeSize(13),
  })}
`;

export const DateField = styled.View`
  flex: 1;
`;
