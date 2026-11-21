import React from 'react';

import { useTheme } from '@/assets/theme';

import { Text } from '../text';

import { ContentWrapper, IconWrapper, InfoCardContainer } from './styles';
import { InfoCardProps } from './types';

const InfoCard = React.forwardRef<any, InfoCardProps>(
  ({ icon, text, description, textColor, descriptionColor, backgroundColor, ...props }, ref) => {
    const { colors } = useTheme();

    return (
      <InfoCardContainer backgroundColor={backgroundColor} ref={ref} {...props}>
        <IconWrapper>{icon}</IconWrapper>
        <ContentWrapper>
          <Text color={textColor ?? colors.text.primary} textAlign="center" variant="titleSmall">
            {text}
          </Text>
          <Text
            color={descriptionColor ?? colors.text.secondary}
            textAlign="center"
            variant="captionRegular"
          >
            {description}
          </Text>
        </ContentWrapper>
      </InfoCardContainer>
    );
  }
);

export default InfoCard;
