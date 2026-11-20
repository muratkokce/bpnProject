import styled from 'styled-components/native';

export const StyledText = styled.Text<{
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  lineHeight?: number;
  letterSpacing?: number;
}>`
  ${({
    theme: { normalizeSize },
    fontSize = 14,
    fontWeight = 'normal',
    color,
    textAlign = 'auto',
    lineHeight,
    letterSpacing,
  }) => ({
    fontSize: normalizeSize(fontSize),
    fontFamily: 'Urbanist',
    fontWeight,
    color,
    textAlign: textAlign as any,
    lineHeight: lineHeight === undefined ? undefined : normalizeSize(lineHeight),
    letterSpacing,
  })}
`;