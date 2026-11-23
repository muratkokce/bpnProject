import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import FastLogo from '@/assets/icons/fast.svg';
import KliqLogo from '@/assets/icons/kliq-logo.svg';
import { useTheme } from '@/assets/theme';
import { Screen, ScreenFooterIcons } from '@/shared/components/screen';
import { TransactionListItem } from '@/shared/components/transaction-list-item';

import { TransactionDetailList, useTransactionDetails } from './components/transaction-detail-list';
import { DetailContainer } from './styles';

const KliqFamilyTransactionDetailScreen = ({
  route,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyTransactionDetailScreen>) => {
  const { transaction } = route.params;
  const { colors, normalizeSize } = useTheme();
  const insets = useSafeAreaInsets();
  const transactionDetails = useTransactionDetails(transaction);

  const handleShowReceipt = () => {
    // TODO: Implement show receipt functionality
  };

  const handleRepeat = () => {
    // TODO: Implement repeat transaction functionality
  };

  return (
    <Screen
      footerComponent={
        <ScreenFooterIcons
          leftIcon={<KliqLogo height={normalizeSize(21)} width={normalizeSize(62)} />}
          rightIcon={<FastLogo height={normalizeSize(35)} width={normalizeSize(48)} />}
        />
      }
      primaryButton={{
        onPress: handleShowReceipt,
        text: 'Dekont Görüntüle',
      }}
      secondaryButton={{
        onPress: handleRepeat,
        text: 'Tekrarla',
      }}
    >
      <DetailContainer insetBottom={insets.bottom}>
        <TransactionListItem
          isVisibleRightContent={false}
          style={{ backgroundColor: colors.opacity.red08, marginBottom: normalizeSize(12) }}
          transaction={transaction}
        />

        <TransactionDetailList details={transactionDetails} />
      </DetailContainer>
    </Screen>
  );
};

export default KliqFamilyTransactionDetailScreen;
