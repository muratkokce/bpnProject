import React from 'react';

import EmptyIcon from '@/assets/icons/info/empty.svg';
import { useTheme } from '@/assets/theme';
import { InfoCard } from '@/shared/components/info-card';
import { Screen } from '@/shared/components/screen';
import { TransactionList } from '@/shared/components/transaction-list-item';

import { useFamilyMemberTransaction } from '../hooks/useFamilyMemberTransaction';

const KliqFamilyTransactionScreen = (): React.JSX.Element => {
  const { normalizeSize } = useTheme();
  const { data, isLoading } = useFamilyMemberTransaction();

  const transactions =
    data?.transactionsByChild[Object.keys(data?.transactionsByChild || {})[0]]?.items || [];

  return (
    <Screen showBottomGradient isScreenLoading={isLoading}>
      {transactions.length > 0 ? (
        <TransactionList transactions={transactions} />
      ) : (
        <InfoCard
          description="Seçilen tarih ve işlem türüne ait işlemin bulunmuyor." //filtre yoksa metni değiştir
          icon={<EmptyIcon height={normalizeSize(128)} width={normalizeSize(187)} />}
          text="İşlem Bulunamadı"
        />
      )}
    </Screen>
  );
};

export default KliqFamilyTransactionScreen;
