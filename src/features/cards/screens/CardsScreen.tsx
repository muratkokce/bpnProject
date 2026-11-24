import React from 'react';

import { TabRoutes } from '@/app/navigation/routes';
import { RootTabScreenProps } from '@/app/navigation/types';
import { Text } from '@/shared/components/text';

import { CardsContainer } from './styles';

const CardsScreen = ({}: RootTabScreenProps<typeof TabRoutes.Cards>) => {
  return (
    <CardsContainer>
      <Text variant="bodyBold">Kartlarım</Text>
      <Text variant="bodyMedium">Kredi ve banka kartlarınız burada görüntülenecek</Text>
    </CardsContainer>
  );
};

export default CardsScreen;
