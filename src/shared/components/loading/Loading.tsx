import { ActivityIndicator } from 'react-native';

import { useTheme } from '@/assets/theme';
import { useLoadingStore } from '@/core/store';

import { LoadingContainer } from './styles';

export function Loading() {
  const { colors } = useTheme();
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <LoadingContainer>
      <ActivityIndicator color={colors.primary500} size="large" />
    </LoadingContainer>
  );
}
