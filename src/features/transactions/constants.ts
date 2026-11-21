import { RootRoutes } from '@/app/navigation/routes';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg';
import ArrowUpIcon from '@/assets/icons/arrow-up.svg';
import AddMoneyIcon from '@/assets/icons/transactions/add-money.svg';
import FamilyIcon from '@/assets/icons/transactions/family.svg';
import FaqIcon from '@/assets/icons/transactions/faq.svg';
import FastIcon from '@/assets/icons/transactions/fast.svg';
import PaymentIcon from '@/assets/icons/transactions/payment.svg';
import WesternUnionIcon from '@/assets/icons/transactions/western-union.svg';

import type { TransactionMenuItemType } from './types';

export const TransactionMenuItems: TransactionMenuItemType[] = [
  {
    title: 'Wester Unıion',
    isNewMenu: true,
    icon: WesternUnionIcon,
  },
  {
    title: 'FAST İşlemleri',
    isNewMenu: true,
    icon: FastIcon,
  },
  {
    title: 'Kliq Ailem',
    isNewMenu: true,
    icon: FamilyIcon,
    routeScreen: RootRoutes.Family,
  },
  {
    title: 'Para Yükle',
    icon: AddMoneyIcon,
  },
  {
    title: 'Para Gönder',
    icon: ArrowUpIcon,
  },
  {
    title: 'Para İste',
    icon: ArrowDownIcon,
  },
  {
    title: 'Ödeme Yap',
    icon: PaymentIcon,
  },
  {
    title: 'Sıkça Sorulan Sorular',
    icon: FaqIcon,
  },
];
