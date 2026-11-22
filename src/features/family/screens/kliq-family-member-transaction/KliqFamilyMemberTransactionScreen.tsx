import { View } from 'react-native';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import { Screen } from '@/shared/components/screen';
import { TransactionList } from '@/shared/components/transaction-list-item';

import { useFamilyMemberTransaction } from '../hooks/useFamilyMemberTransaction';

const KliqFamilyMemberTransactionScreen = ({
  navigation,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyMemberTransactionScreen>) => {
  const { data, isLoading, error } = useFamilyMemberTransaction();

  const transactions =
    data?.transactionsByChild[Object.keys(data?.transactionsByChild || {})[0]]?.items || [];

  return (
    <Screen showBottomGradient isScreenLoading={isLoading}>
      {transactions.length > 0 ? (
        <TransactionList transactions={transactions} />
      ) : (
        <View>{/* Empty state component */}</View>
      )}
    </Screen>
  );
};

export default KliqFamilyMemberTransactionScreen;
