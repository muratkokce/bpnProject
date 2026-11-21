import styled from 'styled-components/native';

import { Text } from '@/shared/components/text';

export const Title = styled(Text)`
  ${({ theme: { normalizeSize } }) => ({
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: normalizeSize(16),
  })}
`;

export const MenuItemWrapper = styled.View`
  ${({ theme: { normalizeSize } }) => ({
    flex: 1,
    marginBottom: normalizeSize(8),
  })}
`;
