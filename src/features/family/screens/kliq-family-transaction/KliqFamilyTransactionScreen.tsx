import React from 'react';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import EmptyIcon from '@/assets/icons/info/empty.svg';
import { useTheme } from '@/assets/theme';
import { InfoCard } from '@/shared/components/info-card';
import { Screen } from '@/shared/components/screen';
import { TransactionList } from '@/shared/components/transaction-list-item';

import { useFamilyMemberTransaction } from '../hooks/useFamilyMemberTransaction';

const KliqFamilyTransactionScreen = ({
  route,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyTransactionScreen>) => {
  const { child } = route.params;

  const { normalizeSize } = useTheme();
  const { data, isLoading } = useFamilyMemberTransaction();

  const selectedChild = data?.transactionsByChild[child.id];
  const transactions = selectedChild?.items || [];

  return (
    <Screen showBottomGradient isScreenLoading={isLoading}>
      {transactions.length > 0 ? (
        <TransactionList transactions={transactions} />
      ) : (
        <InfoCard
          description={selectedChild?.emptyState?.description ?? 'Şu anda işlem bulunmamaktadır.'} //filtre yapıldıysa metni değiştir
          icon={<EmptyIcon height={normalizeSize(128)} width={normalizeSize(187)} />}
          text={selectedChild?.emptyState?.title ?? 'İşlem Bulunamadı'}
        />
      )}
    </Screen>
  );
};

export default KliqFamilyTransactionScreen;
