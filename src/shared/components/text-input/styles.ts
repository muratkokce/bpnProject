import { TextInput as PaperTextInput } from 'react-native-paper';
import styled from 'styled-components/native';

import { Text } from '@/shared/components/text';

export const StyledTextInput = styled(PaperTextInput).attrs(
  ({
    theme: { colors, normalizeSize },
    contentStyle,
    outlineStyle,
    outlineColor,
    activeOutlineColor,
    placeholderTextColor,
    textColor,
    disabled,
  }) => ({
    activeOutlineColor: activeOutlineColor ?? colors.border,
    contentStyle: [{ paddingHorizontal: normalizeSize(16) }, contentStyle],
    outlineColor: outlineColor ?? colors.border,
    outlineStyle: [
      { borderRadius: normalizeSize(12), borderWidth: normalizeSize(1) },
      outlineStyle,
    ],
    placeholderTextColor: placeholderTextColor ?? colors.text.secondary,
    textColor: textColor ?? (disabled ? undefined : colors.text.primary),
  })
)`
  ${({ theme: { colors } }) => ({ backgroundColor: colors.background.white })}
`;

export const ErrorText = styled(Text)`
  ${({ theme: { normalizeSize } }) => ({
    marginVertical: normalizeSize(4),
  })}
`;
