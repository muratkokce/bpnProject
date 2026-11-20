import React from 'react';

import { Description, Title, TransactionsContainer } from './styles';

const TransactionsScreen = () => {
  return (
    <TransactionsContainer>
      <Title>İşlemler</Title>
      <Description>Hesap işlemleriniz burada görüntülenecek</Description>
    </TransactionsContainer>
  );
};

export default TransactionsScreen;
