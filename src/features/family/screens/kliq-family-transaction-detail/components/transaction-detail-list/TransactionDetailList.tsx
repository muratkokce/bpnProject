import React from 'react';

import { Text } from '@/shared/components/text';

import { InfoRow, InfoLeftLabelContainer, InfoRightLabelContainer } from '../../styles';

interface TransactionDetail {
  label: string;
  value: string | undefined;
}

interface TransactionDetailListProps {
  details: TransactionDetail[];
}

export const TransactionDetailList: React.FC<TransactionDetailListProps> = ({ details }) => {
  const visibleDetails = details.filter(({ value }) => !!value);

  return (
    <>
      {visibleDetails.map(({ label, value }, index) => {
        const isLast = index === visibleDetails.length - 1;

        return (
          <InfoRow isLast={isLast} key={label}>
            <InfoLeftLabelContainer>
              <Text variant={isLast ? 'captionRegular' : 'captionSmall'}>{label}</Text>
              <Text variant={isLast ? 'captionRegular' : 'captionSmall'}>:</Text>
            </InfoLeftLabelContainer>
            <InfoRightLabelContainer>
              <Text numberOfLines={1} variant={isLast ? 'titleMedium' : 'captionSemiBold'}>
                {value}
              </Text>
            </InfoRightLabelContainer>
          </InfoRow>
        );
      })}
    </>
  );
};
