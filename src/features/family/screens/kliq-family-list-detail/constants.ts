import { KliqFamilyRoutes } from '@/app/navigation/family-navigation/routes';

import { KliqFamilyDetailMenuItemsType } from './types';

export const KliqFamilyAccountAndCardSettingsMenuItems: KliqFamilyDetailMenuItemsType[] = [
  {
    title: 'Hesap Hareketleri',
  },
  {
    title: 'Limit ve Yetki İşlemleri',
    routeScreen: KliqFamilyRoutes.AddKliqFamilyMemberScreen,
  },
  {
    title: 'Fiziki Kart Kayıp / Çalıntı / İptal',
  },
  {
    title: 'Sanal Kart İptal',
  },
];

export const KliqFamilyFinancialSettingsMenuItems: KliqFamilyDetailMenuItemsType[] = [
  {
    title: 'Hemen Para Gönder',
  },
];
