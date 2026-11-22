import {
  CardStatus,
  CardType,
  ChildStatus,
  type AvailableChild,
  type Child,
} from '@/features/family/types/children.types';

const randomDigits = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

export const createRegisteredChild = (matched: AvailableChild): Child => {
  const balance = Math.floor(Math.random() * 5000);

  return {
    id: matched.id,
    fullName: matched.fullName,
    maskedIdentityNumber: matched.maskedIdentityNumber,
    birthDate: matched.birthDate,
    age: matched.age,
    avatarUrl: matched.avatarUrl,
    status: ChildStatus.AWAITING_APPROVAL,
    addedAt: matched.addedAt ?? new Date().toISOString(),
    account: matched.account ?? {
      accountNumber: `${randomDigits(4)}-${randomDigits(7)}`,
      iban: `TR${randomDigits(24)}`,
      branchName: 'Merkez Şube',
      currency: 'TRY',
      balance,
      formattedBalance: `${balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL`,
      availableBalance: balance,
      blockedAmount: 0,
      card: {
        cardId: `crd_${randomDigits(8)}`,
        maskedCardNumber: `5400 **** **** ${randomDigits(4)}`,
        cardType: CardType.PREPAID_YOUTH,
        cardStatus: CardStatus.ACTIVE,
        dailyLimit: 500,
      },
    },
  };
};
