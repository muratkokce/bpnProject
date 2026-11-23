import styled from 'styled-components/native';

interface DetailContainerProps {
  insetBottom: number;
}

export const DetailContainer = styled.View<DetailContainerProps>`
  flex: 1;
  padding-horizontal: 16px;
  padding-bottom: ${(props) => props.insetBottom + 16}px;
`;
