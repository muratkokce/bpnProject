import React from 'react';

import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';
import { FamilyScreenProps } from '@/app/navigation/family-navigation/types';
import EmptyIcon from '@/assets/icons/info/empty.svg';
import { useTheme } from '@/assets/theme';
import { DatePicker } from '@/shared/components/date-picker';
import { InfoCard } from '@/shared/components/info-card';
import { Screen } from '@/shared/components/screen';
import { SelectPicker } from '@/shared/components/select-picker';
import { TransactionList } from '@/shared/components/transaction-list-item';

import { useFamilyMemberTransaction } from '../hooks/useFamilyMemberTransaction';

import { DateField, DateRow, FilterContainer } from './styles';

interface AppliedFilter {
  type?: string;
  startDate?: Date;
  endDate?: Date;
}

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const endOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999).getTime();

const addMonths = (date: Date, months: number) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const KliqFamilyTransactionScreen = ({
  route,
}: FamilyScreenProps<typeof KliqFamilyRoutes.KliqFamilyTransactionScreen>) => {
  const { child } = route.params;

  const { normalizeSize } = useTheme();
  const { data, isLoading } = useFamilyMemberTransaction();

  const [selectedFilter, setSelectedFilter] = React.useState<string>();
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [appliedFilter, setAppliedFilter] = React.useState<AppliedFilter>();

  const selectedChild = data?.transactionsByChild[child.id];
  const filterTabs = selectedChild?.filterTabs || [];
  const transactions = selectedChild?.items || [];

  const hasFilterSelection = !!(selectedFilter || startDate || endDate);
  const isFilterApplied = !!appliedFilter;

  const handleClearFilter = () => {
    setSelectedFilter(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    setAppliedFilter(undefined);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (!appliedFilter) {
      return true;
    }

    if (
      appliedFilter.type &&
      appliedFilter.type !== 'ALL' &&
      transaction.type !== appliedFilter.type
    ) {
      return false;
    }

    if (appliedFilter.startDate || appliedFilter.endDate) {
      const transactionTime = new Date(transaction.date).getTime();

      if (appliedFilter.startDate && transactionTime < startOfDay(appliedFilter.startDate)) {
        return false;
      }

      const endTime = appliedFilter.endDate ? endOfDay(appliedFilter.endDate) : Date.now();
      if (transactionTime > endTime) {
        return false;
      }
    }

    return true;
  });

  return (
    <Screen
      showBottomGradient
      isScreenLoading={isLoading}
      primaryButton={
        isFilterApplied
          ? { onPress: handleClearFilter, text: 'Temizle' }
          : hasFilterSelection
          ? {
              onPress: () => setAppliedFilter({ endDate, startDate, type: selectedFilter }),
              text: 'Listele',
            }
          : undefined
      }
    >
      <FilterContainer>
        <SelectPicker
          disabled={isFilterApplied}
          label="İşlem Tipi"
          onSelect={setSelectedFilter}
          options={filterTabs.map(({ key, label }) => ({ label, value: key }))}
          value={selectedFilter}
        />
        <DateRow>
          <DateField>
            <DatePicker
              disabled={isFilterApplied}
              label="Başlangıç Tarihi"
              maximumDate={endDate}
              minimumDate={endDate ? addMonths(endDate, -3) : undefined}
              onSelect={setStartDate}
              value={startDate}
            />
          </DateField>
          <DateField>
            <DatePicker
              disabled={isFilterApplied}
              label="Bitiş Tarihi"
              maximumDate={startDate ? addMonths(startDate, 3) : undefined}
              minimumDate={startDate}
              onSelect={setEndDate}
              value={endDate}
            />
          </DateField>
        </DateRow>
      </FilterContainer>
      {filteredTransactions.length > 0 ? (
        <TransactionList transactions={filteredTransactions} />
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
