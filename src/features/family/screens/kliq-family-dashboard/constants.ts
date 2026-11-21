import FirstBanner from '@/assets/icons/family-dashboard/first.svg';
import SecondBanner from '@/assets/icons/family-dashboard/second.svg';
import ShieldTickIcon from '@/assets/icons/shield-tick.svg';
import FamilyIcon from '@/assets/icons/transactions/family.svg';

import type { KliqFamilyDashboardItemType } from './types';

export const KliqFamilyDashboardItems: KliqFamilyDashboardItemType[] = [
  {
    title: 'Çocuğunun Kliq Yolculuğu Başlasın',
    description:
      'Harçlığını yönetmeyi, para biriktirmeyi ve sorumlu harcama yapabilmeyi güvenli şekilde öğrenmesine yardımcı ol.',
    icon: FirstBanner,
    docIcon: FamilyIcon,
  },
  {
    title: 'Kontrol Sende, Deneyim Çocuğunda',
    description:
      'Çocuğun harcama yaparken sen de hesabını kolayca yönet ve güvenle harcama yapabildiğini takip et.',
    icon: SecondBanner,
    docIcon: ShieldTickIcon,
  },
];
